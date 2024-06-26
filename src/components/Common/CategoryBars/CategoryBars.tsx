import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useFetchAllCategoriesListQuery } from "@/store/wooCommerce/wooCommerceApi";
import CategoryBarsSkeleton from "./CategoryBarsSkeleton";
import styles from "./styles.module.scss";
import transformCategoryBars from "@/services/transformers/woocommerce/transformCategoryBars";
import { useMediaQuery } from "@mui/material";
import MobileCategoryBars from "./MobileCategoryBars";

export const CategoryBars = () => {
    const isMobile = useMediaQuery('(max-width: 1200px)');

    const { data = [], isLoading, isError, error } = useFetchAllCategoriesListQuery();

    if (isLoading) {
        return (<CategoryBarsSkeleton />)
    }

    const categories = data.length ? transformCategoryBars(data) : [];

    if (isMobile) {
        return (<MobileCategoryBars categories={categories} />);
    } else {
        return (
            <ul className={styles["categories-list"]}>
                {categories?.map(({ id, categoryName, imageSrc, slug }) => (
                    <li key={id} className={styles["categories-list__item"]}>
                        <Link
                            href={`/product-category/${slug}`}
                            className={styles["categories-list__link"]}
                        >
                            <Image
                                className={styles["categories-list__image"]}
                                src={`/images/categories/${slug}.svg`}
                                width={60}
                                height={60}
                                alt={categoryName}
                            />
                            <div className={styles["categories-list__name"]}>{categoryName}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        )
    }

}