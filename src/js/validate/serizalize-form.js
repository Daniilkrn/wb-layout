import { validateState } from "../store/validate-state.js";

const formNode = document.querySelector('#recipient-form');
const stateValidaton = validateState;
const confirmBtn = document.querySelector('.delivery-button')
let isSend = false;
export function serializeForm() {
    const { elements } = formNode
    let phone;
    Array.from(elements).forEach((element, idx) => {
        const { name, value } = element

        phone = document.getElementsByName('phone');

        confirmBtn.addEventListener('click', () => {
            if (!element.value) {
                element.nextElementSibling.style.display = 'block';
                element.style = 'border-bottom: 1px solid #F55123';
                element.nextElementSibling.innerHTML = stateValidaton.tipsEmpty[idx].name;
                isSend = true;

                element.addEventListener('blur', () => {
                    validatonBlur(element, idx);
                });

                element.addEventListener('keyup', (e) => {
                    validatonKeyUp(element, e.keyCode);
                });
            } else {
                validatonBlur(element, idx);
                formSubmit()
            }
        })

        element.addEventListener('keyup', () => {
            if (element.value.length > 0) {
                element.previousElementSibling.style.display = "block"
            } else {
                element.previousElementSibling.style.display = "none"
            }

            if (element.name === 'phone') {
                element.value = element.value.replace(/[^+0-9\s]/g, '')
                const patternDigit = /[^0-9\s]/g;

                if (element.value.length === 1) {
                    element.value = '+7' + " "
                }

                if (element.value.length === 6 || element.value.length === 10 || element.value.length === 13)
                element.value = element.value + " ";

                if (element.value.match(patternDigit) && element.value.length >= 16) {
                    let parent
                    if (element.nextElementSibling) {
                        parent = element.nextElementSibling.closest('.recipient-label');
                        element.nextElementSibling.style.display = 'none';
                        element.style.color = '#000';
                        element.style = 'border-bottom: 1px solid rgba(0, 0, 0, 0.20)';
                    }
                } else {
                    if(isSend){
                        element.nextElementSibling.style.display = "block"
                        element.style.color = '#F55123';
                        element.style = 'border-bottom: 1px solid #F55123';
                    }
                }
            }
        })
        
        element.addEventListener('keyup', (e) => {
            validatonKeyUp(element, e.keyCode);
        });
    })
}

export function validatonBlur(item, idx) {

    if (item.name === 'name' || item.name === 'surname') {
        if (item.value.length > 0) {
            let parent
            if (item.nextElementSibling) {
                parent = item.nextElementSibling.closest('.recipient-label');
                item.nextElementSibling.style.display = 'none';
            }
        } else {
            const elemEmpty = document.getElementsByName(item.name);
            elemEmpty[0].nextElementSibling.style.display = 'block';
            elemEmpty[0].nextElementSibling.innerHTML = stateValidaton.tipsError[idx].name;
            item.style = 'border-bottom: 1px solid #F55123';
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
            const elemEmpty = document.getElementsByName(item.name)
            elemEmpty[0].nextElementSibling.style.display = 'block'
            elemEmpty[0].nextElementSibling.innerHTML = stateValidaton.tipsError[idx].name
            item.style = 'border-bottom: 1px solid #F55123';
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
            const elemEmpty = document.getElementsByName(item.name);
            elemEmpty[0].nextElementSibling.style.display = 'block';
            elemEmpty[0].nextElementSibling.innerHTML = stateValidaton.tipsError[idx].name;
            parent = item.nextElementSibling.closest('.recipient-label');
            item.nextElementSibling.style.display = 'block';
            item.style = 'border-bottom: 1px solid #F55123';
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
            elemEmpty[0].nextElementSibling.innerHTML = stateValidaton.tipsError[idx].name
            item.style = 'border-bottom: 1px solid #F55123';
            parent = item.nextElementSibling.closest('.recipient-label');
            item.nextElementSibling.style.display = 'block';
            item.style.color = '#F55123';
        }
    }
}

export function validatonKeyUp(item, keyCode) {
    if (item.name === 'name' || item.name === 'surname') {

        if (item.value.length > 0) {
            let parent
            if (item.nextElementSibling) {
                parent = item.nextElementSibling.closest('.recipient-label');
                item.nextElementSibling.style.display = 'none'
                item.style = 'border-bottom: 1px solid rgba(0, 0, 0, 0.20)';
            }
        } else {
            parent = item.nextElementSibling.closest('.recipient-label');
            item.nextElementSibling.style.display = 'block';
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
                item.style = 'border-bottom: 1px solid rgba(0, 0, 0, 0.20)';
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
                item.style = 'border-bottom: 1px solid rgba(0, 0, 0, 0.20)';
            }
        } else {
            parent = item.nextElementSibling.closest('.recipient-label');
            item.nextElementSibling.style.display = 'block';
        }
    }
}

function formSubmit () {
    const errors = Array.from(document.querySelectorAll('.input-error'));
    const check = errors.filter(el => el.style.display === 'block');
    if(!check.length) window.location.href = 'send.html'
}