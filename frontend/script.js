const API_URL = 'https://cadastrodelivros-backend-3.onrender.com/api/entries';

const form = document.getElementById('formLivro');
const lista = document.getElementById('listaLivros');
const mensagem = document.getElementById('mensagem');

let livros = [];


async function carregarLivros() {
  const res = await fetch(API_URL);
  livros = await res.json();
  renderizar();
}


function renderizar() {
  lista.innerHTML = "";

  if (livros.length === 0) {
    lista.innerHTML = "<p style='text-align:center'>Nenhum livro cadastrado 📚</p>";
    return;
  }

  livros.forEach((livro) => {
    const li = document.createElement('li');

    li.innerHTML = `
      <div>
        <strong>${livro.nome}</strong>
        <span>${livro.data} • ${livro.editora}</span>
      </div>
      <button class="delete" data-id="${livro._id}">X</button>
    `;

    lista.appendChild(li);
  });
}


form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const data = document.getElementById('data').value;
  const editora = document.getElementById('editora').value.trim();

  if (!nome || !data || !editora) {
    mensagem.textContent = "Preencha todos os campos!";
    mensagem.style.color = "red";
    return;
  }

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, data, editora })
  });

  mensagem.textContent = "Livro cadastrado!";
  mensagem.style.color = "green";

  form.reset();
  carregarLivros();
});


lista.addEventListener('click', async (e) => {
  if (e.target.classList.contains('delete')) {
    const id = e.target.dataset.id;

    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    mensagem.textContent = "Livro removido!";
    mensagem.style.color = "red";

    carregarLivros();
  }
});


carregarLivros();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(() => console.log('Service Worker registrado'))
    .catch(err => console.log('Erro SW:', err));
}
