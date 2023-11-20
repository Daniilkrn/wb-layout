import { getNoun, getNounAbsent } from "../helpers/getNoun.js";

const absentTitleText = document.querySelector('.absent-products__text');
const absentTitle = document.querySelector('.absent-products__title');

let setCheckAbsent = false;

export function absentProductsTitleRemove(items) {
    if (!items) {
        absentTitle.remove(true)
        setCheckAbsent = true 
    }
    const nounRes = getNounAbsent(items, 'Отсутствует', 'Отсутствуют')
    + '&nbsp;' + '·' + '&nbsp;' + items + '&nbsp;' + getNoun(items, 'товар', 'товара', 'товаров');

    absentTitleText.innerHTML = nounRes
}

export function cartProductsTitleRemove(items) {
    if (!items) {
        return window.location.href = "empty-cart.html"
    }
}




