import Head from "next/head";
import { useAppSelector } from "@/hooks/redux";
import { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useCreateOrderWoo } from "@/hooks/useCreateOrderWoo";
import { useUpdateOrderWoo } from "@/hooks/useUpdateOrderWoo";
// import { AddCoupon } from "@/components/Shop/AddCoupon";
import { Section } from "@/components/Layouts/Section";
import { Loader } from "@/components/Layouts/Loader";
import styles from './styles.module.scss';
import Breadcrumbs from "@/components/Layouts/Breadcrumbs";
import { CartItem, lineOrderItems } from "@/types";
import { CartSummary } from "@/components/Cart/CartSummary";
import { CartTable } from "@/components/Cart/CartTable";
import { OrderType } from "@/types/Services/woocommerce/OrderType";

const Cart = () =>
{
    const { items } = useAppSelector(state => state.Cart);
    const { currentOrder: { orderId } } = useAppSelector(state => state.currentOrder);
    const { createOrder, createdOrder, error: createError } = useCreateOrderWoo();
    const { updateOrder, updatedOrder, error: updateError, items: updatedItems } = useUpdateOrderWoo();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [products, setProducts] = useState<lineOrderItems[]>([]);
    const [currentOrder, setCurrentOrder] = useState<OrderType | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const breadLinks = [{ name: 'Koszyk', url: '/cart' }];
    useEffect(() =>
    {
        if (orderId && items)
        {
            setIsUpdating(true);
            createUpdateOrder(orderId, items);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items, orderId]);

    function createUpdateOrder(orderId: number, items: CartItem[])
    {
        if (!items || items.length < 0) return;
        if (orderId)
        {
            updateOrder(items, orderId);
            return;
        } else
        {
            createOrder(items);
            return;
        }
    }

    useEffect(() =>
    {
        if (createdOrder)
        {
            updateLocalState(createdOrder.line_items, createdOrder, false);
        }

        if (updatedItems && updatedOrder)
        {
            updateLocalState(updatedItems, updatedOrder, false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createdOrder, updatedItems, updatedOrder])


    useEffect(() =>
    {
        if (createError || updateError)
        {
            setIsUpdating(false);
            alert('Sorry, but it was server error.');
        }
    }, [createError, updateError])

    const updateLocalState = useCallback((line_items: lineOrderItems[], currentOrder: OrderType, isLoading: boolean): void =>
    {
        if (!line_items) return;
        setProducts(line_items);
        setIsUpdating(isLoading);
        setCurrentOrder(currentOrder);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createdOrder, updatedOrder, updatedItems]);

    return (
        <>
            <Head>
                <title>Shopping cart</title>
                <meta name="description" content="Shopping cart page" />
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
                            {/* <AddCoupon orderId={orderId && orderId} /> */}
                        </Box>
                        <CartSummary order={currentOrder} isLoading={isUpdating} />
                    </Box>
                </Section>
            </main>
        </>
    );
}

export default Cart;
