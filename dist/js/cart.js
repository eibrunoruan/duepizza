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
    cart.splice(index, 1); // Remove apenas o item no índice especificado
    updateCart(); // Atualiza o carrinho após remover o item
}

function updateCart() {
    const cartList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let cartHTML = '';
    let totalPrice = 0;

    // Limpa a lista de itens antes de recriá-la
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

        // Botão para remover item do carrinho
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.addEventListener('click', () => {
            removeFromCart(index); // Chama a função para remover o item específico
        });
        card.appendChild(removeButton);

        // Adiciona o card à lista de itens do carrinho
        cartList.appendChild(card);

        // Calcula o preço total deste item
        const sizePrice = prices.size[item.size];
        const flavorPrice = prices.flavor[item.flavor];
        const edgePrice = prices.edge[item.edge];
        const accompanimentPrice = prices.accompaniment[item.accompaniment];
        const itemTotalPrice = sizePrice + flavorPrice + edgePrice + accompanimentPrice;
        
        // Multiplica pelo número de unidades do item
        const itemTotalPriceWithQuantity = itemTotalPrice * item.quantity;

        // Adiciona ao preço total geral
        totalPrice += itemTotalPriceWithQuantity;
    });

    // Atualiza o preço total exibido
    totalPriceElement.textContent = `Total: ${formatCurrency(totalPrice)}`;
}

function clearCart() {
    cart = []; // Limpa o carrinho completamente
    updateCart(); // Atualiza a exibição do carrinho
}

function finalizeOrder() {
    const whatsapp = document.getElementById('whatsapp').value;
    if (typeof whatsapp !== 'string' || whatsapp === "") {
        alert('Digite um número de Whatsapp válido');
        return;
    }

    // Formatar mensagem
    const formattedMessage = generateOrderMessage();

    // Enviar mensagem pelo WhatsApp
    handleSubmitWhatsappMessage(whatsapp, formattedMessage);

    // Limpar o carrinho após finalizar o pedido
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
