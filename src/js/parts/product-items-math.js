import { asideCalc } from "./aside-calc.js";
import { asidePayTime } from "./aside-time-pay.js";
import { headerCount } from "./header-counter.js";
import { productState } from "./product-state.js";
import { setDelivery } from "./set-delivery-items.js";

export function itemInputChange(inputChangedValue, inputChangedValueOld, _idx, e) {

    const prices = document.querySelectorAll('.price-content');
    const oldPrices = document.querySelectorAll('.old-value');

    prices[_idx].innerHTML = Math.floor(inputChangedValue).toLocaleString();
    oldPrices[_idx].innerHTML = Math.floor(inputChangedValueOld).toLocaleString() + '&nbsp;' + 'сом';
  
    if (Math.floor(productState.initalItems[_idx].totalPrice).toLocaleString().length >= 9){
        prices[_idx].style = "font-size: 16px";
    } 
      
    if(Math.floor(productState.initalItems[_idx].totalPrice).toLocaleString().length <= 6) {
        prices[_idx].style = "font-size: 20px";
    } 
    
    productState.setMathStatuInput(e,_idx)

    headerCount();
    setDelivery();
    asideCalc();
}

export function increaseCounter(increase, _idx) {
    
    if (productState.initalItems[_idx].balance === productState.initalItems[_idx].inputValue) {
        return
    }

    const parent = increase.parentElement;
    const inputItem = parent.querySelector('.product-item__counter-digit');

    inputItem.value = Number(inputItem.value) + 1;
    productState.initalItems[_idx].inputValue = Number(inputItem.value)

    const increaseItem = productState.initalItems[_idx].totalPrice + productState.initalItems[_idx].price;
    const increaseItemOld = productState.initalItems[_idx].totalOldPrice + productState.initalItems[_idx].oldPrice;
    productState.initalItems[_idx].totalPrice = increaseItem;
    productState.initalItems[_idx].totalOldPrice = increaseItemOld;

    /*присваивание значения айтемам цены*/
    const findPriceNew = increase.closest('.product-item__price-info').querySelector('.price-content')
    if (Math.floor(increaseItem).toLocaleString().length >= 7) {
        findPriceNew.style = "font-size: 16px"
    }

    findPriceNew.innerHTML = Math.floor(increaseItem).toLocaleString();

    const findPriceOld = increase.closest('.product-item__price-info').querySelector('.old-value');
    findPriceOld.innerHTML = Math.floor(increaseItemOld).toLocaleString() + '&nbspсом';

    asideCalc();
    headerCount();
    asidePayTime();
    setDelivery();

    productState.setMathStatusIncrease(increase, _idx)
}

export function decreaseCounter(decrease, _idx) {

    if (productState.initalItems[_idx].inputValue === 1) {
        return
    }

    const parent = decrease.parentElement;
    const inputItem = parent.querySelector('.product-item__counter-digit');

    if (inputItem.value > 1) {

        inputItem.value = Number(inputItem.value) - 1;
        productState.initalItems[_idx].inputValue = Number(inputItem.value);

        const decreaseItem = productState.initalItems[_idx].totalPrice - productState.initalItems[_idx].price;
        const decreaseItemOld = productState.initalItems[_idx].totalOldPrice - productState.initalItems[_idx].oldPrice;
        productState.initalItems[_idx].totalPrice = decreaseItem;
        productState.initalItems[_idx].totalOldPrice = decreaseItemOld;

        /*присваивание значения айтемам цены*/
        const findPriceNew = decrease.closest('.product-item__price-info').querySelector('.price-content');
        findPriceNew.innerHTML = Math.floor(decreaseItem).toLocaleString();

        if (Math.floor(decreaseItem).toLocaleString().length < 7) {
            findPriceNew.style = "font-size: 20px"
        }

        const findPriceOld = decrease.closest('.product-item__price-info').querySelector('.old-value');
        findPriceOld.innerHTML = Math.floor(decreaseItemOld).toLocaleString() + '&nbspсом';

        asideCalc();
        headerCount();
        setDelivery();
        asidePayTime();
        productState.setMathStatusDecrease(decrease,_idx)
    }
}