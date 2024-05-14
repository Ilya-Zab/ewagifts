import { BlogItemType } from "@/types";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { RichTextComponent } from "../RichTextComponent";
import styles from './styles.module.scss';

interface BlogListProps
{
    post: BlogItemType;
}

export const BlogListItem: FC<BlogListProps> = ({ post }) =>
{
    return (
        <div key={post.id}>
            <Link href={post.slug}
                className={styles.blogItem__image}
            >
                <Image src={post.image} alt={post.title} fill style={{ objectFit: 'cover' }} />
            </Link>
            <h2 className={`sub-title ${styles.blogItem__title}`}>
                {post.title}
            </h2>
            <span className={`desc date ${styles.blogItem__date}`}>
                {post.date}
            </span>
            <RichTextComponent richText={post.excerpt} className={styles.blogItem__text} />
            <Link href={`/blog/${post.slug}`} className="desc more-link">
                More
            </Link>
        </div>
    )
}