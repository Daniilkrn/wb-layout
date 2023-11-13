import { productState } from "./product-state.js";

const paymentTime = document.querySelector('.delivery-payment-time__box');
const btn = document.querySelector('.delivery-button');

export function asidePayTime() {

    let totalPrice = 0;

    const arr = productState.totalFilterChecked();

    arr.forEach(obj => {
       totalPrice += obj.totalPrice;
    })

    const parent = paymentTime.closest('.delivery-payment__time');
    const desc = parent.querySelector('.delivery-payment__time-desc');

    if (paymentTime.checked === true) {
        btn.innerHTML = 'Оплатить' + '&nbsp' + Math.floor(totalPrice).toLocaleString() + '&nbsp' + 'сом';
        desc.style.display = "none";
    } else {
        btn.innerHTML = 'Заказать';
        desc.style.display = "block";
    }
}
