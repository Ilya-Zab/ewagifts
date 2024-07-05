import Head from "next/head";
import { CartTable } from "@/components/Shop/CartTable";
import { useAppSelector } from "@/hooks/redux";
import { useEffect, useState } from "react";
import { CartSummary } from "@/components/Shop/CartSummary";
import { Box } from "@mui/material";
import { useCreateOrderWoo } from "@/hooks/useCreateOrderWoo";
import { useUpdateOrderWoo } from "@/hooks/useUpdateOrderWoo";
import { AddCoupon } from "@/components/Shop/AddCoupon";
import { Section } from "@/components/Layouts/Section";
import { Loader } from "@/components/Layouts/Loader";
import styles from './styles.module.scss';
import Breadcrumbs from "@/components/Layouts/Breadcrumbs";
const Cart = () =>
{
    const { items } = useAppSelector(state => state.Cart);
    const { currentOrder: { orderId } } = useAppSelector(state => state.currentOrder);
    const { createOrder, createdOrder } = useCreateOrderWoo();
    const { updateOrder, isLoading: isUpdatingOrder, updatedOrder } = useUpdateOrderWoo();
    const [products, setProducts] = useState(null);
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
    ]

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
        if (createdOrder)
        {
            setTotal(createdOrder.total);
            setProducts(createdOrder.line_items);
            setIsUpdating(false);
        }
    }, [createdOrder]);

    useEffect(() =>
    {
        if (updatedOrder)
        {
            setTotal(updatedOrder.total);
            setProducts(updatedOrder.line_items);
            setIsUpdating(false);
        }
    }, [updatedOrder]);


    if (isUpdating)
    {
        return <Loader size={100} thickness={4} />
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
            </main >
        </>
    );
}

export default Cart;