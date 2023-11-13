import { setSpoilerInfo } from "./set-spoiler.js";
import { setChooseState } from "./set-spoiler.js";
/*cart-content-spoiler*/
const cartSpoiler = document.querySelectorAll('.cart-content-spoiler');
const cartProducts = document.querySelector('.cart-products');
const absentProducts = document.querySelector('.absent-products');
const absentTitle = document.querySelector('.absent-products__title');
/*cart-content-spoiler*/
const checkboxAll = document.querySelector('.cart-content__box');
const allC = document.querySelector('.custom-checkbox')

export default function spoilers () {

    cartSpoiler.forEach((spoiler, idx) => {

        spoiler.addEventListener('click', () => {
            
            if (!spoiler.classList.contains('cart-content-spoiler--active')) {
                spoiler.classList.toggle('cart-content-spoiler--active', true)

                /*удаление border для spoiler*/
                absentTitle.classList.remove('cart-heading');

                /*функция переноса total info price в spoiler */

                if(spoiler.id === 'all-spoiler'){
                    allC.style.display = "none"
                    checkboxAll.style.display = "none"
                    setSpoilerInfo()
                }

                if (idx === 0) {
                    cartProducts.classList.toggle('cart-products--active', true)
                }
                if (idx === 1) absentProducts.classList.toggle('absent-products--active', true)
    
            } else {
                spoiler.classList.toggle('cart-content-spoiler--active', false)

                /*возврат border для spoiler */
                absentTitle.classList.add('cart-heading');

                allC.style.display = "block"

                /*функция возврата выбора */
                setChooseState();

                if (idx === 0) cartProducts.classList.toggle('cart-products--active', false)
                if (idx === 1) absentProducts.classList.toggle('absent-products--active', false)
            }
        })
    })
}
