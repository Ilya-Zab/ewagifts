import Head from "next/head";
import { CartTable } from "@/components/Shop/CartTable";
import { useAppSelector } from "@/hooks/redux";
import { useCallback, useEffect, useState } from "react";
import { CartSummary } from "@/components/Shop/CartSummary";
import { Box } from "@mui/material";
import { useCreateOrderWoo } from "@/hooks/useCreateOrderWoo";
import { useUpdateOrderWoo } from "@/hooks/useUpdateOrderWoo";
import { AddCoupon } from "@/components/Shop/AddCoupon";
import { Section } from "@/components/Layouts/Section";
import { Loader } from "@/components/Layouts/Loader";
import styles from './styles.module.scss';
import Breadcrumbs from "@/components/Layouts/Breadcrumbs";
import { cartItem } from "@/types";
import { ProductCard } from "@/components/Shop";
import { useFetchProductQuery } from "@/store/custom/customApi";

const Cart = () =>
{
    const { items } = useAppSelector(state => state.Cart);
    const { currentOrder: { orderId } } = useAppSelector(state => state.currentOrder);
    const { createOrder, createdOrder, error: createError } = useCreateOrderWoo();
    const { updateOrder, isLoading: isUpdatingOrder, updatedOrder, error: updateError, items: updatedItems } = useUpdateOrderWoo();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [products, setProducts] = useState<Record<string, any>[]>([]);
    const [total, setTotal] = useState('0');
    const [isUpdating, setIsUpdating] = useState(false);
    const breadLinks = [
        {
            name: 'Katalog',
            url: '/'
        },
        {
            name: 'Koszyk',
            url: '/cart'
        },
    ];
    const { data, isLoading } = useFetchProductQuery("46591", {});
    if (data)
    {
        console.log('Object', data);
    }

    useEffect(() =>
    {
        setIsUpdating(true);
        if (items && items.length > 0)
        {
            if (!orderId)
            {
                createOrder(items);
            } else if (!isUpdatingOrder && !isUpdating)
            {
                updateOrder(items, orderId);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items, orderId]);

    useEffect(() =>
    {
        if (updateError || items.length === 0)
        {
            setIsUpdating(false);
        }
    }, [updateError, items.length]);

    const updateLocalState = useCallback((total: string, line_items: cartItem[], isLoading: boolean): void =>
    {
        if (!line_items) return;
        setTotal(total);
        setProducts(line_items);
        setIsUpdating(isLoading);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createdOrder, updatedOrder, updatedItems]);

    useEffect(() =>
    {
        if (createdOrder)
        {
            updateLocalState(createdOrder.total, createdOrder.line_items, false);
        }
    }, [createdOrder, updateLocalState]);

    useEffect(() =>
    {
        if (updatedOrder && updatedItems)
        {
            updateLocalState(updatedOrder.total, updatedItems, false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updatedOrder, updateLocalState]);

    if (isUpdating)
    {
        return <Loader size={100} thickness={4} />;
    }

    return (
        <>
            <Head>
                <title>Shopping cart</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Section className="section" isContainer={true} isBreadcrumbs={true}>
                    <Box className={styles.Cart__top}>
                        <Breadcrumbs links={breadLinks} />
                        <h1 className="sub-title">Koszyk</h1>
                    </Box>
                    <Box className={styles.Cart__content}>
                        <Box>
                            {products && <CartTable products={products} isLoading={isUpdating} />}
                            <AddCoupon orderId={orderId && orderId} />
                        </Box>
                        <CartSummary total={total} sum={total} isLoading={isUpdating} />
                    </Box>
                </Section>
                <ProductCard product={data && data} />
            </main>
        </>
    );
}

export default Cart;
