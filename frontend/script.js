const API_URL = 'https://cadastrodelivros-backend.onrender.com/api/entries';



const form = document.getElementById('formLivro');
const lista = document.getElementById('listaLivros');
const mensagem = document.getElementById('mensagem');

// carregar dados
let livros = [];
try {
  livros = JSON.parse(localStorage.getItem('livros')) || [];
} catch {
  livros = [];
}

// salvar
function salvar() {
  localStorage.setItem('livros', JSON.stringify(livros));
}

// formatar data
function formatarData(data) {
  const d = new Date(data);
  return d.toLocaleDateString('pt-BR');
}

// renderizar
function renderizar() {
  lista.innerHTML = "";

  if (livros.length === 0) {
    lista.innerHTML = "<p style='text-align:center'>Nenhum livro cadastrado 📚</p>";
    return;
  }

  livros.forEach((livro, index) => {
    const li = document.createElement('li');

    li.innerHTML = `
      <div>
        <strong>${livro.nome}</strong>
        <span>${formatarData(livro.data)} • ${livro.editora}</span>
      </div>
      <button class="delete" data-index="${index}">X</button>
    `;

    lista.appendChild(li);
  });
}

// excluir (delegação)
lista.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    const index = e.target.dataset.index;

    livros.splice(index, 1);
    salvar();
    renderizar();

    mensagem.textContent = "Livro removido!";
    mensagem.style.color = "red";
  }
});

// submit
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const data = document.getElementById('data').value;
  const editora = document.getElementById('editora').value.trim();

  if (!nome || !data || !editora) {
    mensagem.textContent = "Preencha todos os campos!";
    mensagem.style.color = "red";
    return;
  }

  livros.push({ nome, data, editora });

  salvar();
  renderizar();
  form.reset();

  mensagem.textContent = "Livro cadastrado com sucesso!";
  mensagem.style.color = "green";
});

// iniciar
renderizar();