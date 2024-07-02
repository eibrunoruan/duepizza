document.addEventListener('DOMContentLoaded', function() {
    const finalCart = localStorage.getItem('finalCart');
    const finalCartElement = document.getElementById('finishOrder');
    finalCartElement.innerHTML = finalCart;
});

