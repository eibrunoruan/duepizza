function formatMessage(data) {
    const totalPrice = calculateTotalPrice(data);
    const totalPriceFormatted = formatCurrency(totalPrice);
    const deliveryText = data.delivery ? "com delivery" : "sem delivery";
    return `Olá, quero uma pizza ${data.size}, sabor ${data.flavor} com borda de ${data.edge}, e uma ${data.accompaniment}, ${deliveryText}. Total: ${totalPriceFormatted}`;
}
