import { productState } from "./product-state.js";

const headerCounter = document.querySelector('.header-cart__count');
const headerCounerMobile = document.querySelector('.header-cart__count.count-mobile')

export function headerCount () {

    let totalItems = 0
    
    const arr = productState.totalFilterChecked();

    arr.forEach(obj => {
       totalItems += obj.inputValue;
    })

    if(headerCounter) headerCounter.innerHTML = totalItems
    if(headerCounerMobile) headerCounerMobile.innerHTML = totalItems
}