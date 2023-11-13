import { getNoun } from "../helpers/getNoun.js";
import { productState } from "./product-state.js";

const asideTotal = document.querySelector('.asidebar-total__price-content');
const asideTotalItems = document.querySelector('.asidebar-total-count__count-products');
const asideTotalOld = document.querySelector('.total-old');
const asideDiscount = document.querySelector('.discount-text');

export function asideCalc() {

    let totalPrice = 0;
    let totalItems = 0;
    let totalOld = 0;
    let totalDiscount = 0;

    const arr = productState.totalFilterChecked();

    arr.forEach(obj => {
       totalItems += obj.inputValue;
       totalPrice += obj.totalPrice;
       totalOld += obj.totalOldPrice;
       totalDiscount += obj.totalOldPrice - obj.totalPrice;
    })

    asideTotal.innerHTML = Math.floor(totalPrice).toLocaleString();
    
    const parent = asideTotal.closest('.asidebar-total__price');
    const descTotalPrice = parent.querySelector('.asidebar-total__price-desc');
    descTotalPrice.innerHTML = 'сом';
    
    asideTotalItems.innerHTML = totalItems + '&nbsp;' + getNoun(productState.totalInput(),'товар','товара','товаров');
    asideTotalOld.innerHTML = Math.floor(totalOld).toLocaleString() + '&nbsp;' + 'сом';
    asideDiscount.innerHTML = '−' + Math.floor(totalDiscount).toLocaleString() + '&nbsp;' + 'сом';
}