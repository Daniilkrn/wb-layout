import { validateState } from "../store/validate-state.js";

const formNode = document.querySelector('#recipient-form');
const stateValidaton = validateState;
const confirmBtn = document.querySelector('.delivery-button')

export function serializeForm() {
    const { elements } = formNode

    Array.from(elements).forEach((element, idx) => {
        const { name, value } = element

        confirmBtn.addEventListener('click', () => {
            if (!document.getElementsByName(name).value) {
                const elemEmpty = document.getElementsByName(name)
                elemEmpty[0].nextElementSibling.style.display = 'block'
                elemEmpty[0].nextElementSibling.innerHTML = stateValidaton.tips[idx].name
            }
        })

        const elem = document.getElementsByName(name)
        elem[0].addEventListener('blur', () => {
            validatonBlur(elem[0], idx)
        })

        elem[0].addEventListener('keyup', () => {
            validatonKeyUp(elem[0])
        })
    })
}

export function validatonBlur(item, idx) {
    if (item.name === 'name' || item.name === 'surname') {
        if (item.value.length > 0) {
            let parent
            if (item.nextElementSibling) {
                parent = item.nextElementSibling.closest('.recipient-label');
                item.nextElementSibling.style.display = 'none'
            }
        } else {
            const elemEmpty = document.getElementsByName(item.name)
            elemEmpty[0].nextElementSibling.style.display = 'block'
            elemEmpty[0].nextElementSibling.innerHTML = stateValidaton.tips[idx].name

            parent = item.nextElementSibling.closest('.recipient-label');
            item.nextElementSibling.style.display = 'block'
        }
    }

    if (item.name === 'email') {
        const patternEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (patternEmail.test(String(item.value).toLowerCase())) {
            let parent
            if (item.nextElementSibling) {
                parent = item.nextElementSibling.closest('.recipient-label');
                item.nextElementSibling.style.display = 'none';
                item.style.color = '#000';
            }
        } else {
            const elemEmpty = document.getElementsByName(item.name)
            elemEmpty[0].nextElementSibling.style.display = 'block'
            elemEmpty[0].nextElementSibling.innerHTML = stateValidaton.tips[idx].name

            parent = item.nextElementSibling.closest('.recipient-label');
            item.nextElementSibling.style.display = 'block';
            item.style.color = '#F55123';
        }
    }

    if (item.name === 'phone') {

        const patternDigit = /[^0-9]/g;

        if (item.value.match(patternDigit) && item.value.length >= 16) {
            let parent
            if (item.nextElementSibling) {
                parent = item.nextElementSibling.closest('.recipient-label');
                item.nextElementSibling.style.display = 'none';
                item.style.color = '#000';
            }
        } else {
            const elemEmpty = document.getElementsByName(item.name)
            elemEmpty[0].nextElementSibling.style.display = 'block'
            elemEmpty[0].nextElementSibling.innerHTML = stateValidaton.tips[idx].name

            parent = item.nextElementSibling.closest('.recipient-label');
            item.nextElementSibling.style.display = 'block';
            item.style.color = '#F55123';
        }
    }

    if (item.name === 'customs') {
        const patternDigits = /[^0-9]/g;
        if (item.value.length === 14 && !item.value.match(patternDigits)) {
            let parent
            if (item.nextElementSibling) {
                parent = item.nextElementSibling.closest('.recipient-label');
                item.nextElementSibling.style.display = 'none';
                item.style.color = '#000';
            }
        } else {
            const elemEmpty = document.getElementsByName(item.name)
            elemEmpty[0].nextElementSibling.style.display = 'block'
            elemEmpty[0].nextElementSibling.innerHTML = stateValidaton.tips[idx].name

            parent = item.nextElementSibling.closest('.recipient-label');
            item.nextElementSibling.style.display = 'block';
            item.style.color = '#F55123';
        }
    }
}

export function validatonKeyUp(item) {
    if (item.name === 'name' || item.name === 'surname') {
        if (item.value.length > 0) {
            let parent
            if (item.nextElementSibling) {
                parent = item.nextElementSibling.closest('.recipient-label');
                item.nextElementSibling.style.display = 'none'
            }
        } else {
            parent = item.nextElementSibling.closest('.recipient-label');
            item.nextElementSibling.style.display = 'block'
        }
    }

    if (item.name === 'customs') {

        const patternDigits = /[^0-9]/g;
        if (item.value.length === 14 && !item.value.match(patternDigits)) {
            let parent
            if (item.nextElementSibling) {
                parent = item.nextElementSibling.closest('.recipient-label');
                item.nextElementSibling.style.display = 'none';
                item.style.color = '#000';
            }
        } else {
            parent = item.nextElementSibling.closest('.recipient-label');
            item.nextElementSibling.style.display = 'block';

        }
    }

    if (item.name === 'email') {
        const patternEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (patternEmail.test(String(item.value).toLowerCase())) {
            let parent
            if (item.nextElementSibling) {
                parent = item.nextElementSibling.closest('.recipient-label');
                item.nextElementSibling.style.display = 'none';
                item.style.color = '#000';
            }
        } else {
            parent = item.nextElementSibling.closest('.recipient-label');
            item.nextElementSibling.style.display = 'block';
        }
    }

    if (item.name === 'phone') {
        item.value = item.value.replace(/[^+0-9\s]/g, '')
        
        if(item.value.length === 1){
            item.value = '+7' + " "
        }
        
        if (item.value.length === 6 || item.value.length === 10 || item.value.length === 13)
        item.value = item.value + " ";

        const patternDigit = /[^0-9\s]/g;
        if (item.value.match(patternDigit) && item.value.length >= 16) {
            let parent
            if (item.nextElementSibling) {
                parent = item.nextElementSibling.closest('.recipient-label');
                item.nextElementSibling.style.display = 'none';
                item.style.color = '#000';
            }
        } else {

            // item.value = item.value.replace(/[^0-9]/g, '')
            // parent = item.nextElementSibling.closest('.recipient-label');
            // item.nextElementSibling.style.display = 'block';
        }
    }
}