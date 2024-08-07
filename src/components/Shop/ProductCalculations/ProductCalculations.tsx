/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from "react";
import getCirculatedPrices, { CirculatedPriceType } from "@/Utils/getCirculatedPrices";
import ProductCirculations from "../ProductCirculations";
import ProductTotals from "../ProductTotals";
import { typeProductType, variationsProductType } from "@/types";
import { CartItem } from "@/types/Cart";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import ProductButtons from "../ProductButtons";
import { updateCart } from "@/store/reducers/CartSlice";
import getCirculatedPrice from "@/Utils/getCirculatedPrice";

interface ProductCalculations {
    product: typeProductType,
    variation?: variationsProductType | null
}

const ProductCalculations: FC<ProductCalculations> = ({ product, variation }) => {
    const [currentQuantity, setCurrentQuantity] = useState(1);
    const [targetProductObject, setTargetProductObject] = useState<typeProductType | variationsProductType | undefined>();
    const [cartMatch, setCartMatch] = useState<CartItem | undefined>();
    const dispatch = useAppDispatch();
    const { items: cartItems } = useAppSelector(state => state.Cart);
    const supplier = product?.attributes?.find(({ name }) => name === 'supplier')?.options[0].slug;

    const [total, setTotal] = useState<number | undefined>()
    const [productStock, setProductStock] = useState<number>(0);
    const [circulatedPrices, setCirculatedPrices] = useState<CirculatedPriceType[] | undefined>();
    const [circulatedPrice, setCirculatedPrice] = useState<number | undefined>()

    /* Set product object for circulations */
    useEffect(() => {
        if (variation) {
            setTargetProductObject(variation);
        } else {
            setTargetProductObject(product);
        }
    }, [variation]);

    useEffect(() => {
        /* Set product circulations */
        const productPrice = targetProductObject?.price as number || 0;
        const productCirculations = targetProductObject?.price_circulations;

        if (productCirculations) {
            setCirculatedPrices(
                getCirculatedPrices(productPrice, productCirculations)
            );
        }

        /* Set product stock */
        setProductStock(targetProductObject?.stock_quantity as number || 0);
    }, [targetProductObject]);

    useEffect(() => {
        if (circulatedPrices) {
            setCirculatedPrice(getCirculatedPrice(currentQuantity, circulatedPrices) || 0);
        }
    }, [currentQuantity, circulatedPrices]);

    /* Find and set matched cartItem */
    useEffect(() => {
        const cartMatch = cartItems.find(cartItem => {
            if (cartItem.product_id === product.id) {
                if (variation) {
                    if (variation.id === cartItem.variation_id) return true;
                } else {
                    return true;
                }
            }
        });

        if (cartMatch) {
            setCurrentQuantity(cartMatch.quantity);
        } else {
            setCurrentQuantity(1);
        }

        setCartMatch(cartMatch);
    }, [variation, cartItems]);

    useEffect(() => {
        if (circulatedPrice) {
            setTotal(circulatedPrice * currentQuantity);
        }
    }, [circulatedPrice, currentQuantity]);

    if (!circulatedPrices) return;

    const onChangeQuantity = (inputValue: number) => {
        if (inputValue < 1) setCurrentQuantity(1);
        else if (inputValue > productStock) setCurrentQuantity(productStock);
        else setCurrentQuantity(inputValue);
    }

    const handleAddToCart = () => {
        dispatch(updateCart({
            id: product.id,
            ...(variation && { variationId: variation.id }),
            ...(supplier && { supplier }),
            ...(total && { total: String(total) }),
            quantity: currentQuantity,
        }));
    }

    const isQuantitiesMatch = () => {
        if (cartMatch)
            return currentQuantity === cartMatch.quantity;
        return false;
    }

    return (
        <>
            <ProductCirculations
                stock={productStock}
                onChangeQuantity={onChangeQuantity}
                currentQuantity={currentQuantity}
                circulatedPrices={circulatedPrices}
            />
            {(Boolean(productStock) && circulatedPrice !== undefined && total !== undefined) &&
                <>
                    <ProductTotals
                        currentQuantity={currentQuantity}
                        circulatedPrice={circulatedPrice}
                        total={total}
                    />
                    <ProductButtons hasAdded={Boolean(cartMatch)} quantitiesMatch={isQuantitiesMatch()} onAdd={handleAddToCart} />
                </>
            }
        </>
    )
}

export default ProductCalculations;