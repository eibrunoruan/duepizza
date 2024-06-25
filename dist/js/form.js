function getPizzaFormValues() {
    const size = document.getElementById('size').value;
    const flavor = document.getElementById('flavor').value;
    const edge = document.getElementById('edge').value;
    const accompaniment = document.getElementById('accompaniment').value;
    const delivery = document.getElementById('delivery').checked;
    const whatsapp = document.getElementById('whatsapp').value;

    if (typeof whatsapp !== 'string' || whatsapp === "") {
        alert('Digite um número de Whatsapp válido');
        return null;
    }

    return {
        size,
        flavor,
        edge,
        accompaniment,
        delivery,
        whatsapp
    };
}
