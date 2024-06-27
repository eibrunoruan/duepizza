const prices = {
    size: {
        pequena: { price: 15, description: "Pequena (4 fatias)", image: "pequena.jpg" },
        media: { price: 20, description: "Média (6 fatias)", image: "m_media.jpg" },
        grande: { price: 25, description: "Grande (8 fatias)", image: "em_grande.jpg" }
    },
    flavor: {
        peperoni: { price: 20, description: "Pepperoni delicioso e picante", image: "gem_peperoni.jpg" },
        mussarela: { price: 15, description: "Mussarela clássica e saborosa", image: "mussarela.jpg" },
        frango: { price: 18, description: "Frango suculento com tempero especial", image: "frango.jpg" }
    },
    accompaniment: {
        "coca-cola": { price: 10, description: "Refrigerante Coca-Cola (2L)", image: "coca-cola.jpg" },
        guarana: { price: 8, description: "Refrigerante Guaraná (2L)", image: "guarana.jpg" }
    },
    edge: {
        catupiry: { price: 5, description: "Borda recheada com Catupiry", image: "catupiry.jpg" },
        cheddar: { price: 5, description: "Borda recheada com Cheddar", image: "cheddar.jpg" },
        "sem borda": { price: 0, description: "Sem borda recheada", image: "sem_borda.jpg" }
    }
};

const flavorSelect = document.getElementById('flavor')

const flavorDescription = document.getElementById('flavorDescription')

flavorSelect.addEventListener('change', function(){
    flavorDescription.innerHTML = `${prices.flavor[flavorSelect.value].description}`
})