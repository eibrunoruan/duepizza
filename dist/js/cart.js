let cart = [];

function addToCart() {
    const size = document.getElementById('size').value;
    const flavor = document.getElementById('flavor').value;
    const edge = document.getElementById('edge').value;
    const accompaniment = document.getElementById('accompaniment').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const delivery = document.getElementById('delivery').checked;

    const item = {
        size,
        flavor,
        edge,
        accompaniment,
        quantity,
        delivery
    };

    cart.push(item);
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let cartHTML = '';
    let totalPrice = 0;

    if (cart.length === 0) {
        totalPriceElement.textContent = 'Total: R$0,00';
        cartItemsElement.innerHTML = '';
        return;
    }

    cart.forEach((item, index) => {
        const sizePrice = prices.size[item.size];
        const flavorPrice = prices.flavor[item.flavor];
        const edgePrice = prices.edge[item.edge];
        const accompanimentPrice = prices.accompaniment[item.accompaniment];

        const itemTotalPrice = sizePrice + flavorPrice + edgePrice + accompanimentPrice;

        const itemTotalPriceWithQuantity = itemTotalPrice * item.quantity;

        totalPrice += itemTotalPriceWithQuantity;

        cartHTML += `
            <li>
                ${item.quantity}x Pizza ${item.size}, ${item.flavor}, borda ${item.edge}, ${item.accompaniment} ${item.delivery ? 'com delivery' : 'sem delivery'}
                <button type="button" onclick="removeFromCart(${index})">Remover</button>
                Preço: ${formatCurrency(itemTotalPriceWithQuantity)}
            </li>
        `;
    });

    const totalPriceFormatted = formatCurrency(totalPrice);
    cartItemsElement.innerHTML = cartHTML;
    totalPriceElement.textContent = `Total: ${totalPriceFormatted}`;
}

function clearCart() {
    cart = [];
    updateCart();
}

function finalizeOrder() {
    const whatsapp = document.getElementById('whatsapp').value;
    if (typeof whatsapp !== 'string' || whatsapp === "") {
        alert('Digite um número de Whatsapp válido');
        return;
    }

    const formattedMessage = generateOrderMessage();

    handleSubmitWhatsappMessage(whatsapp, formattedMessage);

    clearCart();
}

function generateOrderMessage() {
    let message = 'Olá, quero os seguintes itens:\n\n';

    cart.forEach(item => {
        message += `${item.quantity}x Pizza ${item.size}, ${item.flavor}, borda ${item.edge}, ${item.accompaniment} ${item.delivery ? 'com delivery' : 'sem delivery'}\n`;
    });

    const totalPrice = calculateTotalPrice();
    const totalPriceFormatted = formatCurrency(totalPrice);
    message += `\nTotal: ${totalPriceFormatted}`;

    return message;
}
