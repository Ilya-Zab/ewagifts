const getCssGradientFrom = (colorHexs) => {
    const gradientParts = colorHexs.map((colorHex, index) => {
        const percent = index / (colorHexs.length - 1) * 100;
        return `${colorHex} ${percent}%`;
    });

    return `linear-gradient(90deg, ${gradientParts.join(', ')})`;
}

export const transformColors = (colorsData) => {
    return colorsData.map(colorData => {
        const colorNames = [];
        const colorHexs = [];

        const colorPairs = colorData.name.split(', ');
        colorPairs.forEach(colorPair => {
            let [colorName, colorHex] = colorPair.split(" (");
            colorHex = colorHex.slice(0, -1);

            colorNames.push(colorName);
            colorHexs.push(colorHex);
        });

        const combinedColorName = colorNames.join(', ');

        const cssColor = colorHexs.length > 1 ?
            getCssGradientFrom(colorHexs)
            : colorHexs[0];

        return {
            id: colorData.id,
            count: colorData.count,
            slug: colorData.slug,
            name: colorData.name,
            label: combinedColorName,
            cssColor
        }

    });
}