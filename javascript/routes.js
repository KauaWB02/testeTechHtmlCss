
const style = document.getElementById('style');
const conteudo = document.getElementById('conteudo');
const routes = document.querySelectorAll('#route');
const url = window.location.href.split('/');

existLogin()

if (!url[3] || url[3] == 'index.html') {
  let namePage = url[3].split('.');

  if (namePage[0] === 'index') {
    namePage[0] = 'home';
  }

  let stylePage = namePage[0];

  style.setAttribute('href', `./style/${stylePage}.css`);
  carregarPagina(`./pages/home.html`, conteudo);
}

function existLogin() {
  let token = JSON.parse(localStorage.getItem('testeTech'));
  if (!token || !token.auth || !avisoTempo()) {
    console.log('testando')
    window.location.href = '../pages/login.html'
  }

}

function avisoTempo() {
  let tempoExpirado = true;
  let horaAtual = new Date().getHours();
  let token = JSON.parse(localStorage.getItem('testeTech'));
  let horaToken = parseInt(token.expira);

  if (horaToken < horaAtual) {
    tempoExpirado = false;
  }

  return tempoExpirado;
}

async function carregarPagina(url, elemento) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Não foi possível carregar a página.');
    }
    const html = await response.text();
    elemento.innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}

for (let index = 0; index < routes.length; index++) {
  routes[index].addEventListener('click', function (event) {
    event.preventDefault();

    let page = this.getAttribute('href');

    let arrayUrlPage = page.split('/');
    let namePage = arrayUrlPage[2].split('.');
    let stylePage = namePage[0];

    style.setAttribute('href', `./style/${stylePage}.css`);
    carregarPagina(`${page}`, conteudo);

  });

}


