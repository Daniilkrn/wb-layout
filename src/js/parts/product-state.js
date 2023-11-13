// import { setDelivery } from "./set-delivery-items.js";

import { deliveryState } from "../store/delivery-state.js";
import { setDeliveryNextDate } from "./set-delivery-items.js";

const chooseAll = document.querySelector('.cart-content__choose-all');

export const productState = {
    initalItems: [
        {
            id: 1,
            inputValue: 1,
            balance: 2,
            price: 522,
            oldPrice: 1051,
            totalPrice: 522,
            totalOldPrice: 1051,
            checked: true,
            trashed: false,
            img: "./images/product-shirt.png",
        },
        {
            id: 2,
            inputValue: 1,
            balance: undefined,
            price: 10500.235,
            oldPrice: 11500.235,
            totalPrice: 10500.235,
            totalOldPrice: 11500.235,
            checked: true,
            trashed: false,
            img: "./images/product-case.png",
        },
        {
            id: 3,
            inputValue: 1,
            balance: 2,
            price: 247,
            oldPrice: 475,
            totalPrice: 247,
            totalOldPrice: 475,
            checked: true,
            trashed: false,
            img: "./images/product-pencil.png",
        },
    ],

    arrNext: [

    ],

    totalPrice() {

        let total = 0;

        this.initalItems.forEach(obj => {
            total += obj.totalPrice
        })

        return Math.floor(total).toLocaleString() + '&nbsp' + 'сом'
    },

    totalOldPrice() {
        let oldTotal = 0;

        this.initalItems.forEach(obj => {
            oldTotal += obj.totalOldPrice
        })

        return Math.floor(oldTotal).toLocaleString() + '&nbsp' + 'сом';

    },

    totalFilterCheckboxPrice(filterArray) {

        let total = 0;

        filterArray.forEach(obj => {
            total += obj.totalPrice
        })

        return Math.floor(total)
    },

    totalFilterCheckboxItems (filterArray) {

        let totalItems = 0;

        filterArray.forEach(obj => {
            totalItems += obj.inputValue
        })

        return Math.floor(totalItems)
    },

    totalInput() {

        let total = 0;
        
        this.initalItems.forEach(obj => {
            total += obj.inputValue
        })

        return total
    },

    totalFilterChecked() {

        let trashCount = 0;

        const newArr = this.initalItems.filter(obj => {

            if(obj.trashed) {
                trashCount++;
                this.initalItems.length - 1 === trashCount ? chooseAll.style.display = "none" : null;
            }

            return obj.checked === true
        })
        
        return newArr
    },

    setDeliveryItems(newArr, anotherStock) {
        deliveryState.secondDate = newArr;
   
        newArr.forEach((obj,idx) => {
            if(obj.inputValue > anotherStock) {
                deliveryState.secondDate[idx] = obj.inputValue - anotherStock
            } 
        })

        return setDeliveryNextDate(deliveryState);

    },

    setInitialStatus(item,idx) {
        const parent = item.closest('.product-item__counter-content');
        if(+item.value > 1){
            return parent.querySelector('.product-item__counter-decrease').style = 'color:#000';
        }

        if(+item.value === this.initalItems[idx].balance){
            return parent.querySelector('.product-item__counter-increase').style = 'color:rgba(0, 0, 0, 0.20)';
        }

        return parent.querySelector('.product-item__counter-decrease').style = 'color:rgba(0, 0, 0, 0.20)'
    },

    setMathStatusDecrease(decrease,idx) {
        const parent = decrease.closest('.product-item__counter-content');
        const valueDigit = parent.querySelector('.product-item__counter-digit').value

        if(+valueDigit > 1){
            const findIncrease = parent.querySelector('.product-item__counter-increase')
            findIncrease.style.color = '#000'
        }

        if(+valueDigit === 1){
            decrease.style = 'color:rgba(0, 0, 0, 0.20)'
        }

        if(+valueDigit < this.initalItems[idx].balance){
            const findIncrease = parent.querySelector('.product-item__counter-increase')
            findIncrease.style = '#000'
        }
    },

    setMathStatusIncrease(increase,idx) {
        const parent = increase.closest('.product-item__counter-content');
        const valueDigit = parent.querySelector('.product-item__counter-digit').value

        if(+valueDigit > 1) {
            const findDecrease = parent.querySelector('.product-item__counter-decrease')
            findDecrease.style.color = '#000'
        }

        if(+valueDigit === this.initalItems[idx].balance){
            increase.style = 'color:rgba(0, 0, 0, 0.20)'
        }
    },

    setMathStatuInput(event,idx){
        const input = event.target;
        const parent = input.closest('.product-item__counter-content');
        const decrease = parent.querySelector('.product-item__counter-decrease');
        const increase = parent.querySelector('.product-item__counter-increase');

        
        if(+input.value === 1) {
            decrease.style = 'color:rgba(0, 0, 0, 0.20)';
            increase.style = 'color:#000'
        }


        if(+input.value === this.initalItems[idx].balance){
            increase.style = 'color:rgba(0, 0, 0, 0.20)';
            decrease.style = "color:#000"
        } else {
            increase.style = 'color:#000'
            decrease.style = 'color:#000'
        }

    }
}
