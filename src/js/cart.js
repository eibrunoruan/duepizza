let cart = [];
let finalCart = '';

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
        const sizePrice = prices.size[item.size].price;
        const flavorPrice = prices.flavor[item.flavor].price;
        const edgePrice = prices.edge[item.edge].price;
        const accompanimentPrice = prices.accompaniment[item.accompaniment].price;

        // Calcula o preço total deste item
        const itemTotalPrice = sizePrice + flavorPrice + edgePrice + accompanimentPrice;

        // Multiplica pelo número de unidades do item
        const itemTotalPriceWithQuantity = itemTotalPrice * item.quantity;

        // Adiciona ao preço total geral
        totalPrice += itemTotalPriceWithQuantity;

        cartHTML += `
            <li>
                <h3>${item.quantity}x Pizza ${item.size}</h3>
                <li>Sabor: ${item.flavor} e Borda:${item.edge}</li>
                <li>Acompanhamento: ${item.accompaniment}</li>
                <li>Delivery? ${item.delivery ? 'Sim' : 'Não'}
                <li>Preço: ${formatCurrency(itemTotalPriceWithQuantity)}</li>
            </li>
        `;
        // <button type="button" onclick="removeFromCart(${index})">Remover</button>
    });
    
    finalCart = cartHTML;
    localStorage.setItem('finalCart', finalCart);
    const totalPriceFormatted = formatCurrency(totalPrice);
    // cart.innerHTML = cartHTML;
    totalPriceElement.innerText = `Total: ${totalPriceFormatted}`;
}

function clearCart() {
    cart = [];
    updateCart();
}

const finishButton = document.getElementById('finishButton')


finishButton.addEventListener('click', function(){
    window.location.replace('../src/finish.html')
    
        // Formatar mensagem
    const formattedMessage = generateOrderMessage();

    // Enviar mensagem pelo WhatsApp
    handleSubmitWhatsappMessage(whatsapp, formattedMessage);
    // updateCart();

    // Limpar o carrinho após finalizar o pedido
    // clearCart();

})

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

