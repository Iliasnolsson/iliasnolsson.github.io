
let pageHeight = 0
window.onload = () => {
    var portfolio = new Portfolio()
    setTimeout(() => {
        pageHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }, 400)
}

window.addEventListener('resize', () => {
    const currentOffset = window.scrollY
    const newPageHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const dHeight = newPageHeight / pageHeight
    window.scrollTo(0, currentOffset * dHeight)
    pageHeight = newPageHeight
}, true)