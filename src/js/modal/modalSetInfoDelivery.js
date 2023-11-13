const pointItem = document.querySelectorAll('.delivery__endpoint')

export function modalSetInfoDelivery (point) {
    if(point){
        pointItem.forEach(textEl => {
            textEl.innerHTML = point.innerHTML
        })
    }
}