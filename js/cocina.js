// js/cocina.js

// Objeto global para almacenar intervalos de cada orden
const timers = {};

function renderOrders() {
  const orders = getOrders();
  const container = document.getElementById('ordersContainer');
  container.innerHTML = '';

  if (orders.length === 0) {
    container.innerHTML = '<p>No hay órdenes.</p>';
    return;
  }

  orders.forEach(o => {
    const card = document.createElement('div');
    card.className = 'card mb-2 p-2 position-relative';

    // Crear un span para el timer
    const timer = document.createElement('span');
    timer.style.position = 'absolute';
    timer.style.top = '10px';
    timer.style.right = '10px';
    timer.style.padding = '5px 10px';
    timer.style.borderRadius = '5px';
    timer.style.fontWeight = 'bold';
    timer.style.color = 'white';
    card.appendChild(timer);

    // Contenido de la orden
    card.innerHTML += `
      <div class="d-flex justify-content-between mt-2">
        <div><strong>Orden #${o.id}</strong><br><small>${new Date(o.createdAt).toLocaleString()}</small></div>
        <div><span class="badge ${o.status==='Listo' ? 'bg-success' : 'bg-warning'}">${o.status}</span></div>
      </div>
      <ul class="mt-2">${o.items.map(it=>`<li>${it.name} - €${it.price.toFixed(2)}</li>`).join('')}</ul>
      <div class="mt-2">
        <button class="btn btn-sm btn-secondary" onclick="updateStatus(${o.id}, 'En preparación')">En preparación</button>
        <button class="btn btn-sm btn-success" onclick="updateStatus(${o.id}, 'Listo')">Listo</button>
        <button class="btn btn-sm btn-danger" onclick="deleteOrder(${o.id})">Eliminar</button>
      </div>
    `;

    container.appendChild(card);

    // Función para actualizar el timer
    const updateTimer = () => {
      const now = new Date();
      const created = new Date(o.createdAt);
      const diff = Math.floor((now - created) / 1000);
      const min = Math.floor(diff / 60);
      const sec = diff % 60;
      timer.innerText = `${min.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;

      // Cambiar color según tiempo
      if (min < 3) timer.style.backgroundColor = green;
      else if (min < 6) timer.style.backgroundColor = orange;
      else timer.style.backgroundColor = red;
    };

    // Ejecutar inmediatamente y luego cada segundo
    updateTimer();

    // Si ya existe un timer para esta orden, no crear otro
    if (!timers[o.id]) {
      timers[o.id] = setInterval(updateTimer, 1000);
    }
  });
}

function updateStatus(id, status) {
  const orders = getOrders().map(o => o.id === id ? ({...o, status}) : o);
  saveOrders(orders);
  renderOrders();
}

function deleteOrder(id) {
  const orders = getOrders().filter(o => o.id !== id);
  saveOrders(orders);

  // Limpiar intervalos para esta orden
  if (timers[id]) {
    clearInterval(timers[id]);
    delete timers[id];
  }

  renderOrders();
}

window.onload = () => {
  try {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (!auth) window.location.href = 'index.html';
  } catch(e) { window.location.href = 'index.html'; }

  renderOrders();
};




