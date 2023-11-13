import { asideCalc} from "./aside-calc.js";
import { headerCount } from "./header-counter.js";
import { productState } from "./product-state.js";
import { setDelivery } from "./set-delivery-items.js";
import { filterItems } from "./set-spoiler.js";

const checkboxAll = document.querySelector('.cart-content__box');
const itemCheckboxes = document.querySelectorAll('.item-checkbox');
const asideBarDiscount = document.querySelector('.asidebar-discount');

export function chooseItems() {

    let itemsStatus = true;

    checkboxAll.addEventListener('click', () => {

        if (checkboxAll.checked === false) {
            itemsStatus = false;
            asideBarDiscount.style.display = "none";         
        }

        if (checkboxAll.checked === true) {
            itemsStatus = true;    
            asideBarDiscount.style.display = "flex"; 
        }

        itemCheckboxes.forEach(checkbox => {
            checkbox.checked = itemsStatus;
        })

        productState.initalItems.forEach(obj => {
            obj.checked = itemsStatus;
        })

        asideCalc();

        headerCount();

        setDelivery();
    })

    itemCheckboxes.forEach((checkbox,idx) => {
        checkbox.addEventListener('click', () => {

            let checkboxStatus = checkbox.checked;

            productState.initalItems[idx].checked = !productState.initalItems[idx].checked  
    
            checkAll();
            asideCalc(idx, checkboxStatus);
            setDelivery();
            filterItems(idx, checkboxStatus);
            headerCount(idx, checkboxStatus);
        })
    })
}

export function checkAll() {
    
    for (let i = 0; i < itemCheckboxes.length; i++) {
        if (!itemCheckboxes[i].checked) {
            return checkboxAll.checked = false;
        }
    }

    return checkboxAll.checked = true;
}