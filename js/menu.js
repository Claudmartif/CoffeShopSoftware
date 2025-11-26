// js/menu.js
let cart = JSON.parse(localStorage.getItem('cart') || '[]');

const CATEGORIES = ["Coffee", "Tea", "Pastries"];

function renderMenu() {
  const container = document.getElementById('menuContainer');
  container.innerHTML = '';

  CATEGORIES.forEach(cat => {

    // 1. Crear ID único para la sección
    const sectionId = cat.replace(/\s+/g, '').toLowerCase(); // ej: Cafés → cafes

    // 2. Crear título desplegable
    const title = document.createElement('div');
    title.className = `category-title cat-${sectionId}`;
    title.innerText = cat;

    // Cuando haga clic → mostrar/ocultar productos
    title.addEventListener('click', () => {
      const section = document.getElementById(`section-${sectionId}`);
      section.classList.toggle('section-open');
    });

    container.appendChild(title);

    // 3. Crear contenedor de productos
      const section = document.createElement('div');
      section.id = `section-${sectionId}`;
      section.className = `section-content cat-${sectionId}`;


    const products = PRODUCTS.filter(p => p.category === cat);

    products.forEach(p => {
      const item = document.createElement('div');
      item.className = 'card mb-3';
      item.innerHTML = `
        <div class="row g-0">
          <div class="col-3">
            <img src="${p.img}" class="img-fluid rounded">
          </div>
          <div class="col-9">
            <div class="card-body">
              <h5>${p.name}</h5>
              <p>€${p.price.toFixed(2)}</p>
              <button class="btn btn-success btn-sm" onclick="addToCart(${p.id})">Agregar</button>
            </div>
          </div>
        </div>
      `;
      section.appendChild(item);
    });

    // Por defecto las secciones aparecerán cerradas
   section.classList.add('section-content');


    container.appendChild(section);
  });
}

function addToCart(id) {
  const prod = PRODUCTS.find(x => x.id === id);
  cart.push({ ...prod, cartId: String(Date.now()) + Math.random() });
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const list = document.getElementById('cartList');
  list.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price;
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      <div>${item.name}</div>
      <div>
        €${item.price.toFixed(2)}
        <button class="btn btn-sm btn-link text-danger" onclick="removeFromCart('${item.cartId}')">X</button>
      </div>
    `;
    list.appendChild(li);
  });
  document.getElementById('total').innerText = total.toFixed(2);
}

function removeFromCart(cartId) {
  cart = cart.filter(c => c.cartId !== cartId);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

document.getElementById('sendKitchen').addEventListener('click', () => {
  if (!cart || cart.length === 0) { alert('El carrito está vacío'); return; }
  const orders = getOrders();
  const order = { id: Date.now(), items: cart, status: 'Pendiente', createdAt: new Date().toISOString() };
  orders.push(order);
  saveOrders(orders);
  cart = [];
  localStorage.removeItem('cart');
  renderCart();
  alert('Orden enviada a cocina');
});

window.onload = () => {
  // Si no estás autentificado, redirige a index.html
  try {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (!auth) window.location.href = 'index.html';
  } catch(e) { window.location.href = 'index.html'; }

  renderMenu();
  renderCart();
};
