import { getNoun } from "../helpers/getNoun.js";
import { productState } from "./product-state.js";

const chooseText = document.querySelector('.cart-content__checkmark');
const allCheckBox = document.querySelector('.cart-content__box');

export function setSpoilerInfo() {
    
    let totalPrice = 0;
    let totalItems = 0;

    const arr = productState.totalFilterChecked();

    arr.forEach(obj => {
       totalItems += obj.inputValue;
       totalPrice += obj.totalPrice;
    })
    
    const nounRes = totalItems + '&nbsp;' + getNoun(totalItems, 'товар', 'товара', 'товаров');

    chooseText.innerHTML = nounRes + '&nbsp;' + '·' + '&nbsp;' + Math.floor(totalPrice).toLocaleString() + '&nbsp;'  + 'сом';
}

export function setChooseState() {
    chooseText.innerHTML = "Выбрать все";
    allCheckBox.style.display = "initial";
}

export function filterItems (checkboxIdx, checkboxStatus, trashed) {
    productState.initalItems[checkboxIdx].checked = checkboxStatus;
    if(trashed) productState.initalItems[checkboxIdx].trashed = trashed;
}