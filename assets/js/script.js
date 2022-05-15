window.addEventListener('DOMContentLoaded', () => {

    let allActionButtons = document.querySelectorAll('.cart-actions button[data-action]');

    allActionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const action = e.currentTarget.dataset.action;

            switch (action) {
                case 'add':
                    increaseQuantity(button);
                    break;
                case 'remove':
                    decreaseQuantity(button);
                    break;
            }
        })
    });

    document.querySelector('.checkout-form').addEventListener('submit', (e) => {
        if (e.target.checkValidity()) {
            e.preventDefault();
            alert('Thank you for your order!');
        }
    })
});

function increaseQuantity(button) {
    const quantity = button.parentElement.querySelector('.product__count');
    if (+quantity.textContent < 10) {
        quantity.textContent = parseInt(quantity.textContent) + 1;
        countTotal();
    }
}

function decreaseQuantity(button) {
    const quantity = button.parentElement.querySelector('.product__count');
    if (+quantity.textContent > 1) {
        quantity.textContent = parseInt(quantity.textContent) - 1;
        countTotal();
    }
}

function countTotal() {
    const productItems = document.querySelectorAll('.product');
    const shippingPrice = +document.querySelector('.shipping-price').textContent.slice(1);

    let total = shippingPrice;

    productItems.forEach(item => {
        const price = +item.querySelector('.current-price').textContent.slice(1);
        const quantity = +item.querySelector('.product__count').textContent;

        total += price * quantity;
    });

    document.querySelector('.total-price').textContent = `$${total.toFixed(2)}`;
}