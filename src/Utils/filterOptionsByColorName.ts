import { defaultAttributesType, variationsProductType } from "@/types";
import { transformProductSizes } from "../types/Services/transformers/transformProductSizes";

export function filterOptionsByColorName(variations: variationsProductType[], name: string): defaultAttributesType[]
{
    const filteredVariations: variationsProductType[] = [];
    const availableVariations: defaultAttributesType[] = [];
    variations.forEach(variation =>
    {
        const res = variation.attributes.filter(attr => attr.name === 'color' && attr.option === name);
        if (res.length > 0)
        {
            filteredVariations.push(variation);
            const arr = transformProductSizes(variation.attributes);
            if (arr)
            {
                availableVariations.push(arr[0]);
            }

        }
    });
    return availableVariations;
}