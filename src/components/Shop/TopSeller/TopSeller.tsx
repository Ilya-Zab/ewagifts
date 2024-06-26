import { Box } from "@mui/material";
import { FC } from "react";
import { TopSellerCard } from "../TopSellerCard";
import { ProductCardList } from "../ProductCardsList";

export const TopSeller: FC = () =>
{
    return (
        <>
            <Box display={'flex'} gap={'20px'} marginBottom={'20px'} sx={{
                flexDirection: 'row'
            }}>
                <TopSellerCard />
                <TopSellerCard />
            </Box>
            <ProductCardList products={[]} isLoading={false} isError={false} />
        </>
    )
}