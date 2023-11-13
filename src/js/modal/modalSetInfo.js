
const parent = document.querySelectorAll('.payment-variant__content')
const cardNumber = document.querySelectorAll('.card-number')

export function modalSetInfo (content, number) {
    if(arguments[0] === undefined) return
    
    parent.forEach((parent,_idx) => {
        let imageAgregator;

        imageAgregator = parent.firstElementChild
        imageAgregator.outerHTML = content.outerHTML
        cardNumber[_idx].textContent = number
    })
}