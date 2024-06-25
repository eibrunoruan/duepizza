function calculateTotalPrice() {
    let totalPrice = 0;

    cart.forEach(item => {
        const sizePrice = prices.size[item.size];
        const flavorPrice = prices.flavor[item.flavor];
        const edgePrice = prices.edge[item.edge];
        const accompanimentPrice = prices.accompaniment[item.accompaniment];

        const itemTotalPrice = sizePrice + flavorPrice + edgePrice + accompanimentPrice;

        totalPrice += itemTotalPrice * item.quantity;
    });

    return totalPrice;
}
