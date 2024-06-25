let cart = [];

function isOpen() {
    const now = new Date();
    const currentHour = now.getHours();
    return currentHour >= 18 && currentHour <= 23;
}

function addToCart() {
    if (!isOpen()) {
        alert('A loja está fechada. Os pedidos só podem ser feitos entre 18:00 e 23:59.');
        return;
    }

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
    const cartList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let cartHTML = '';
    let totalPrice = 0;

    cartList.innerHTML = '';

    cart.forEach((item, index) => {
        const card = document.createElement('div');
        card.classList.add('cart-item');

        const quantity = document.createElement('span');
        quantity.textContent = `${item.quantity}x `;
        card.appendChild(quantity);

        const size = document.createElement('span');
        size.textContent = `Pizza ${item.size}, `;
        card.appendChild(size);

        const flavor = document.createElement('span');
        flavor.textContent = `sabor ${item.flavor}, `;
        card.appendChild(flavor);

        const edge = document.createElement('span');
        edge.textContent = `borda ${item.edge}, `;
        card.appendChild(edge);

        const accompaniment = document.createElement('span');
        accompaniment.textContent = `acompanhamento ${item.accompaniment}`;
        card.appendChild(accompaniment);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.addEventListener('click', () => {
            removeFromCart(index);
        });
        card.appendChild(removeButton);

        cartList.appendChild(card);

        const sizePrice = prices.size[item.size];
        const flavorPrice = prices.flavor[item.flavor];
        const edgePrice = prices.edge[item.edge];
        const accompanimentPrice = prices.accompaniment[item.accompaniment];
        const itemTotalPrice = sizePrice + flavorPrice + edgePrice + accompanimentPrice;
        const itemTotalPriceWithQuantity = itemTotalPrice * item.quantity;
        totalPrice += itemTotalPriceWithQuantity;
    });

    totalPriceElement.textContent = `Total: ${formatCurrency(totalPrice)}`;
}

function clearCart() {
    cart = [];
    updateCart();
}

function finalizeOrder() {
    if (!isOpen()) {
        alert('A loja está fechada. Os pedidos só podem ser feitos entre 18:00 e 23:59.');
        return;
    }

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