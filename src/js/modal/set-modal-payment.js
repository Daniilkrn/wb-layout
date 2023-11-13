import { modalSetInfo } from "./modalSetInfo.js";

const modalBg = document.querySelector('.wrapper');
const modal = document.querySelector('#modal-payment')
const paymentsModal = document.querySelector('.modal-payments')
const closeModal = document.querySelectorAll('.close-icon');
const modalItems = document.querySelectorAll('.payment-checkbox');
const modalSetBtn = document.querySelector('.modal-payments__button');

export function setModalPayment () {
    
    let agregatorImg;
    let cardNumber ;

    const preModalHeight = window.scrollY;

    modalBg.scrollTo({
        top: preModalHeight,
    })

    document.body.style= 'overflow: hidden';
    modal.style.visibility= "visible";

    closeModal.forEach(close => {
        close.addEventListener('click', () => {
            modal.style.visibility = "hidden";
            paymentsModal.classList.remove('modal--active')
            document.body.style.overflow = 'visible';
        })
    })

    modalSetBtn.addEventListener('click', () => {
       
        modalSetInfo(agregatorImg, cardNumber)
        
        document.body.style.overflow = 'auto';
        modal.style.visibility = "hidden";
    })

    modalItems.forEach(item => {
        item.addEventListener('click', () => {
            const parent = item.closest('.modal-payments__content-item');
            agregatorImg = parent.querySelector('.modal-agregator');
            cardNumber = parent.querySelector('.modal-payments__cart').textContent;
        })
    })

    modal.addEventListener('click', (e) => {
        e.stopPropagation()
        if(e.target === modal){
            modal.style.visibility = "hidden";
            document.body.style.overflow = 'auto';
            modalBg.classList.remove('wrapper-bg');
            deliveryModal.classList.remove('modal--active')
        }
    })
}