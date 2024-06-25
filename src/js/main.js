async function handleSubmitForm() {
    const data = getPizzaFormValues();

    if (data) {
        console.log('Dados do formulário:', data);

        const totalPrice = calculateTotalPrice(data);
        const totalPriceFormatted = formatCurrency(totalPrice);
        document.getElementById('total-price').innerText = totalPriceFormatted;

        const formattedMessage = formatMessage(data);
        console.log('Mensagem formatada:', formattedMessage);

        await handleSubmitWhatsappMessage(data.whatsapp, formattedMessage);
    }
}
