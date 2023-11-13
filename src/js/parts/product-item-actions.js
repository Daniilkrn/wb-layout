import {absentProductsTitleRemove, cartProductsTitleRemove} from "./absent-products-title.js";
import { asideCalc } from "./aside-calc.js";
import { headerCount } from "./header-counter.js";
import { setDelivery } from "./set-delivery-items.js";
import { filterItems } from "./set-spoiler.js";

const trashes = document.querySelectorAll('.product-item__trash-icon');
const likes = document.querySelectorAll('.product-item__favorites-icon');

export function actions() {
    trashes.forEach((trash,_idx) => {

        trash.addEventListener('click', () => {

            let parent = trash.closest(".product-item");

            const parentGrand = parent.parentNode;
            parentGrand.removeChild(parent)
            parent = null;
            
            if(trash.classList.contains('cart-trash')){
                filterItems(_idx, false, true);
                asideCalc(_idx, false);
                headerCount();
                setDelivery();
                cartProductsTitleRemove(parentGrand.children.length);

            } else {
                return absentProductsTitleRemove(parentGrand.children.length)
            }
        })
    })

    likes.forEach(like => {
        like.addEventListener('click', () => {
            if (!like.classList.contains('product-item__favorites-icon--active')) {
                return like.classList.toggle('product-item__favorites-icon--active', true)
            } 
            like.classList.toggle('product-item__favorites-icon--active', false);
        })
    })

}