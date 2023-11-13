import { modalSetInfoDelivery } from "./modalSetInfoDelivery.js";

const modalSetBtn = document.querySelector('.modal-delivery__button');
const modalBg = document.querySelector('.wrapper');
const deliveryModal = document.querySelector('.modal-delivery')
const closeModal = document.querySelectorAll('.close-icon');
const deliveryBtns = document.querySelectorAll('.modal-delivery__navigation button')
const forms = document.querySelectorAll('.modal-delivery__content-form')
const modal = document.querySelector('#modal-delivery');
const pointItems = document.querySelectorAll('#point-delivery');

export function setModalDelivery () {
    let point;

    const preModalHeight = window.scrollY;
    modalBg.scrollTo({
        top: preModalHeight,
    })

    document.body.style.overflow = 'hidden';
    modal.style.visibility = "visible"

    modalBg.classList.add('wrapper-bg');
    deliveryModal.classList.add('modal--active')

    closeModal.forEach(close => {
        close.addEventListener('click', () => {
            modalBg.classList.remove('wrapper-bg');
            deliveryModal.classList.remove('modal--active')
            document.body.style.overflow = 'visible';
            modal.style.visibility = "hidden"
        })
    })

    deliveryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            deliveryBtns.forEach(btn => {
                btn.classList.remove('modal-delivery__navigation--active');
            });
    
            if (!btn.classList.contains('modal-delivery__navigation--active')) {
                if (document.querySelector('.modal-delivery__content-form').id === btn.name) {
                    document.querySelector('.modal-delivery__content-form').classList.add('visible');
    
                    forms.forEach(form => {
                        if (form.id !== btn.name) {
                            form.classList.remove('visible');
                        }
                    });

                } else {
                    document.querySelector('.modal-delivery__content-form.delivery-courier').classList.add('visible');
                    document.querySelector('.modal-delivery__content-form.delivery-pickup').classList.remove('visible');
                }
    
                btn.classList.add('modal-delivery__navigation--active');
            }
        });
    });

    pointItems.forEach(item => {
        item.addEventListener('click', () => {
            const parent = item.closest('.delivery-redact__item');
            point = parent.querySelector('.modal-point')
        })
    })

    modalSetBtn.addEventListener('click', () => {
        modalSetInfoDelivery(point)
        
        modal.style.visibility = "hidden"
        document.body.style.overflow = 'auto';
        modalBg.classList.remove('wrapper-bg');
        deliveryModal.classList.remove('modal--active')
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

    /*trashes courier*/
    const trashesCourier = document.querySelectorAll('.delivery-item__trash-courier')
    trashesCourier.forEach(trash => {
        trash.addEventListener('click', () => {
            const parent = trash.closest('.delivery-redact');
            const item = parent.querySelector('.delivery-redact__item')
            parent.removeChild(item)
            controlBox1()
        })
    })

    /*trashes point*/
    const trashesPoint = document.querySelectorAll('.delivery-item__trash-point')
    trashesPoint.forEach(trash => {
        trash.addEventListener('click', () => {
            const parent = trash.closest('.delivery-redact');
            const item = parent.querySelector('.delivery-redact__item.point')
            parent.removeChild(item)
            controlBox2()
        })
    })
}

function controlBox1() {
    const parent = document.querySelector('#delivery-redact-courier')
    const items = document.querySelectorAll('.delivery-redact__item.courier');
    if(items.length) {
        items[0].querySelector('.delivery-checkbox').checked = true;
    } else {
        parent.innerHTML = 'нет подходящего адреса'
    }
}

function controlBox2() {
    const parent = document.querySelector('#delivery-redact-point')
    const items = document.querySelectorAll('.delivery-redact__item.point');
    if(items.length) {
        items[0].querySelector('.delivery-checkbox').checked = true;
    } else {
        parent.innerHTML = 'нет подходящего адреса'
    }
}