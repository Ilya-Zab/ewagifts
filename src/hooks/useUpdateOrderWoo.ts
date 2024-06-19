import { useState } from "react";
import { transformCreateOrderProducts } from "@/services/transformers/woocommerce/transformCreateOrderProducts";
import { setLineItemsIds } from "@/store/reducers/CurrentOrder";
import { useAppDispatch } from "@/hooks/redux";
import { useFetchUpdateOrderMutation } from "@/store/wooCommerce/wooCommerceApi";
import { transformLineItemsId } from "@/services/transformers/woocommerce/transformLineItemsId";
import { CartItem, transformDeleteOrderProductsType } from "@/types";
import { transformDeleteOrderProducts } from "@/services/transformers/woocommerce/transformDeleteOrderProducts";

export const useUpdateOrderWoo = () =>
{
    const dispatch = useAppDispatch();
    const [fetchUpdateOrder, { data: updatedOrder }] = useFetchUpdateOrderMutation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const updateOrder = async (
        productLineIds: transformDeleteOrderProductsType,
        items: CartItem[],
        orderId: number
    ) =>
    {
        setIsLoading(true);
        setError(null);

        console.log({
            line_items: [
                ...transformDeleteOrderProducts(productLineIds),
                ...transformCreateOrderProducts(items)
            ]
        })

        const fetchUpdateOrderBody = {
            line_items: [
                ...transformDeleteOrderProducts(productLineIds),
                ...transformCreateOrderProducts(items)
            ]
        };

        try
        {
            const createOrderData = await fetchUpdateOrder({ id: orderId, ...fetchUpdateOrderBody }).unwrap();
            const lineItemsIds = transformLineItemsId(createOrderData.line_items);

            dispatch(setLineItemsIds(lineItemsIds));
        } catch (err)
        {
            if (err instanceof Error)
            {
                setError(err.message);
            } else
            {
                setError('An unknown error occurred');
            }
            console.error(err, 'Failed to update order');
        } finally
        {
            setIsLoading(false);
        }
    };

    return { updateOrder, isLoading, error, updatedOrder };
};
