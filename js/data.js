// js/data.js: lista de productos y utilidades simples

const PRODUCTS = [
  { id: 1, name: "Americano / Black Coffee", price: 3.00, category: "Coffee", img: "images/americano.jpg" },
  { id: 2, name: "Latte", price: 4.00, category: "Coffee", img: "images/latte.jpg" },
  { id: 3, name: "Capuchino", price: 4.00, category: "Coffee", img: "images/capuchino.jpg" },
  { id: 4, name: "Croissant", price: 2.00, category: "Pastries", img: "images/croissant.jpg" },
  { id: 5, name: "Green Tea", price: 2.00, category: "Tea", img: "images/te-verde.jpg" },
  {id: 6, name: "Black Tea", price: 2.00, category: "Tea", img: "images/black-tea.jpeg"}

];

// Guardado de órdenes en localStorage (simula base de datos)
function getOrders() {
  return JSON.parse(localStorage.getItem('orders') || '[]');
}
function saveOrders(orders) {
  localStorage.setItem('orders', JSON.stringify(orders));
}
