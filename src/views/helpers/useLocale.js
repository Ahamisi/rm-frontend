export const toLocale = (number) => {
    if (number) {
        return Number(number).toLocaleString("en", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        });
    }
    return 0;
};