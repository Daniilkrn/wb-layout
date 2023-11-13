import spoilers from "./parts/cart-spoilers.js";
import { productState } from "./parts/product-state.js";
import { chooseItems } from "./parts/items-choose.js";
import { itemInputChange } from "./parts/product-items-math.js";
import { increaseCounter, decreaseCounter} from "./parts/product-items-math.js";
import { actions } from "./parts/product-item-actions.js";
import { setModalPayment } from "./modal/set-modal-payment.js";
import { absentProductsTitleRemove } from "./parts/absent-products-title.js";
import { asideCalc } from "./parts/aside-calc.js";
import { asidePayTime } from "./parts/aside-time-pay.js";
import { setModalDelivery } from "./modal/set-modal-delivery.js";
import { setDelivery } from "./parts/set-delivery-items.js";
import { serializeForm } from "./validate/serizalize-form.js";
import { salerTip } from "./helpers/saler-tip.js";
/*+ and -*/
const increases = document.querySelectorAll('.product-item__counter-increase');
const decreases = document.querySelectorAll('.product-item__counter-decrease');
/*customer aside*/
const aside = document.querySelector('.asidebar');
/*saler tips*/
const icons = document.querySelectorAll('.prodcut-item__saler-icon');
/*aside payment to modal*/
const modalPaymentActionBtn = document.querySelectorAll('.btn-edit-payment');
const modalDeliveryActionBtn = document.querySelectorAll('.btn-edit-delivery');
/*absent products*/
const absentParent = document.querySelector('.absent-products');
/*aside время оплаты*/
const paymentTime = document.querySelector('.delivery-payment-time__box');
/*header-counter + header-counter-mobile*/
const headerCounter = document.querySelector('.header-cart__count');
const headerCounerMobile = document.querySelector('.header-cart__count.count-mobile')

/*загрузка initial values и функций для полей товаров корзины*/
document.addEventListener("DOMContentLoaded", () => {

  modalPaymentActionBtn.forEach(btn => {
    btn.addEventListener('click', setModalPayment);
  })

  modalDeliveryActionBtn.forEach(btn => {
    btn.addEventListener('click', setModalDelivery);
  })
  
  paymentTime.addEventListener('click', asidePayTime)

  headerCounter.innerHTML = productState.totalInput();
  headerCounerMobile.innerHTML = productState.totalInput();
  
  absentProductsTitleRemove(absentParent.querySelectorAll('.product-item').length)
  
  spoilers();
  chooseItems();
  
  increases.forEach((increase, _idx) => {
      increase.addEventListener('click', () => {
        increaseCounter(increase, _idx)
      })
  })

  decreases.forEach((decrease, _idx) => {
    decrease.addEventListener('click', () => {
        decreaseCounter(decrease, _idx)
    })
  })

  actions();

  document.querySelectorAll('.product-item__counter-digit').forEach((input, _idx) => {

    input.value = productState.initalItems[_idx].inputValue
    productState.setInitialStatus(input,_idx);

    input.addEventListener('change', (e) => {
      
      const patternDigits = /[^0-9]/g;

      if (input.value.match(patternDigits) || !input.value.length || +input.value === 0) {
        e.target.value = productState.initalItems[_idx].inputValue;
        return
      }

      if(input.value > productState.initalItems[_idx].balance) return input.value = 1
   
      const inputChangedValue = input.value * productState.initalItems[_idx].price;
      const inputChangedValueOld = input.value * productState.initalItems[_idx].oldPrice;

      productState.initalItems[_idx].totalPrice = inputChangedValue;
      productState.initalItems[_idx].totalOldPrice = inputChangedValueOld;
      productState.initalItems[_idx].inputValue = Number(input.value);

      itemInputChange(inputChangedValue, inputChangedValueOld, _idx, e)
    })
  })

  document.querySelectorAll('.price-content').forEach((price, _idx) => {


    price.innerHTML = Math.floor(productState.initalItems[_idx].price * productState.initalItems[_idx].inputValue).toLocaleString()
    productState.initalItems[_idx].totalPrice = productState.initalItems[_idx].price * productState.initalItems[_idx].inputValue
    
    if ((price.textContent).length > 7) {
      price.style = "font-size: 16px"
    }

  })

  document.querySelectorAll('.price-desc').forEach(span => {
    span.innerHTML = 'сом'
  })

  document.querySelectorAll('.product-item__balance-count').forEach((span, _idx )=> {
    span.innerHTML = productState.initalItems[_idx].balance;
    if(productState.initalItems[_idx].balance === undefined) span.closest('.product-item__balance').remove(true)
  })

  document.querySelectorAll('.old-value').forEach((oldPrice, _idx) => {
    oldPrice.innerHTML = Math.floor(productState.initalItems[_idx].oldPrice * productState.initalItems[_idx].inputValue).toLocaleString() + '&nbspсом';
    productState.initalItems[_idx].totalOldPrice = productState.initalItems[_idx].totalOldPrice * productState.initalItems[_idx].inputValue

    const parent = oldPrice.closest('.total-info')
    const hover = parent.querySelector('.old-value-hover');

    oldPrice.addEventListener('mouseover', () => {
      hover.style.display = "block"
      hover.innerHTML = `
      <div class="all-discount">
        <span class="all-discount__percent">Скидка 55%</span>
        <span class="all-discount__content">−300 сом</span>
      </div>
      <div class="discount-recepient">
          <span class="all-discount__percent">Скидка покупателя 10%</span>
          <span class="all-discount__content">−30 сом</span>
      </div>
      `
    })

    oldPrice.addEventListener('mouseleave', () => {
      hover.style.display = "none"
    })

  })

  document.querySelectorAll('.prodcut-item__saler-icon').forEach((iconSaler,_idx) => {
    iconSaler.addEventListener('mouseover', () => {
      salerTip(iconSaler,_idx)
    })
  });

  document.querySelectorAll('.delivery-return__status-text').forEach(status => {

    const parent = status.closest('.delivery-return') || status.closest('.delivery-variant__return');
    const hover = parent.querySelector('.delivery-return__tooltip');

    status.addEventListener('mouseover', () => {
      hover.style.display = "block"
    })

    status.addEventListener('mouseleave', () => {
      hover.style.display = "none"
    })
  })

  asideCalc();
  setDelivery();
  serializeForm();
})