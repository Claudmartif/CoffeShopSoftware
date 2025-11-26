// js/admin.js
function renderAdmin() {
  const orders = getOrders();
  const completed = orders.filter(o => o.status === 'Listo');
  const total = completed.reduce((s, o) => s + o.items.reduce((a,b)=>a+b.price,0), 0);
  document.getElementById('totalVentas').innerText = `€${total.toFixed(2)}`;

  const list = document.getElementById('completedList');
  list.innerHTML = completed.map(o => `<li class="list-group-item">#${o.id} - ${new Date(o.createdAt).toLocaleString()} - €${o.items.reduce((s,i)=>s+i.price,0).toFixed(2)}</li>`).join('');
}

window.onload = () => {
  // comprobar autenticación
  try {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (!auth) window.location.href = 'index.html';
  } catch(e) { window.location.href = 'index.html'; }

  renderAdmin();
};
