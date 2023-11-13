
export function salerTip (icon,_idx) {
    const parent = icon.closest('.prodcut-item__saler');
    const saler = parent.querySelector('.prodcut-item__saler-tip')
    saler.style.display = 'block'
    
    icon.addEventListener('mouseleave', () => {
        saler.style.display = 'none'
    })
}