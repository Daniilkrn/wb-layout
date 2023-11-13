import { productState } from "./product-state.js";
import { anotherStock } from "../store/delivery-state.js";

const firstDate = document.querySelector('.delivery-dates__item-date.first-date');
const secondDate = document.querySelector('.delivery-dates__item-date.second-date');

export function setDelivery() {
    const filteredItems = productState.totalFilterChecked();
    productState.setDeliveryItems(filteredItems, anotherStock)
    
    const parent = firstDate.closest('.delivery-dates__item');
    const targetDate = parent.querySelector('.delivery-dates__item-products');
    const taregtSection = targetDate.closest('#first-date');

    targetDate.innerHTML = '';

    const firstDateState = productState.totalFilterChecked();
    
    if(firstDateState.length){
        taregtSection.style.display = "flex";
    }

    if(!firstDateState.length) {
        taregtSection.style.display = "none";
    }

    firstDateState.forEach((item,idx) => {
        const creatImgContainer = document.createElement('div')
        creatImgContainer.className = "delivery-dates-container";  
        targetDate.appendChild(creatImgContainer);

        const createImg = document.createElement('img');
        createImg.className = "delivery-dates-src";
        creatImgContainer.appendChild(createImg);

        const createImgCount = document.createElement('span');
        createImgCount.className = "delivery-dates-count";
        createImgCount.classList.add('count-main');
        creatImgContainer.appendChild(createImgCount);

        createImgCount.innerHTML = item.inputValue;
        if(item.inputValue === 1) createImgCount.style.display = "none";
        if(item.inputValue > 9) createImgCount.style.padding = "0px 10px";
        if(item.inputValue > 99) createImgCount.style.padding = "0px 14px";

        createImg.src = firstDateState[idx].img;
        
        if(item.inputValue > anotherStock) {
            createImgCount.innerHTML = anotherStock;
        }
    })
}

export function setDeliveryNextDate (array) {
    const parent = secondDate.closest('.delivery-dates__item');
    const targetDate = parent.querySelector('.delivery-dates__item-products');

    targetDate.innerHTML = '';

    const firstDateState = productState.totalFilterChecked();
    
    const taregtSection = targetDate.closest('#second-date');
    taregtSection.style.display = "none";

    array.secondDate.forEach((obj,idx) => {
        let diff;
        if(typeof obj === 'number'){
            diff = obj;
            taregtSection.style.display = "flex";
        } 

        if(diff >= 1){
            const creatImgContainer = document.createElement('div');
            creatImgContainer.className = "delivery-dates-container";
            targetDate.appendChild(creatImgContainer);
        
            const createImg = document.createElement('img');
            createImg.className = "delivery-dates-src";
            creatImgContainer.appendChild(createImg);
        
            const createImgCount = document.createElement('span');
            createImgCount.className = "delivery-dates-count";
            createImgCount.classList.add('count-main');
            creatImgContainer.appendChild(createImgCount);

            createImgCount.innerHTML = diff;
            createImg.src = firstDateState[idx].img;
        }
    }) 
}