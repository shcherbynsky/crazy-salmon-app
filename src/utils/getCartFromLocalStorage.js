export const getCartFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('cart')) || []
}