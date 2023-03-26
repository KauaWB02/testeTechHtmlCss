let token = JSON.parse(localStorage.getItem('testeTech'));
let aviso = document.getElementById('aviso');

if (token) {
  if (avisoTempo(token)) {
    window.location.href = '/'
  } else {
    aviso.innerHTML = 'Sessão expirada, favor fazer login novamente!';
    aviso.style.display = 'block';
  }

}

function avisoTempo(token) {

  let tempoExpirado = true;
  let horaAtual = new Date().getHours();
  let horaToken = parseInt(token.expira);

  if (horaToken < horaAtual) {
    tempoExpirado = false;
  }

  return tempoExpirado;
}

function login() {
  let emailCpf = document.getElementById('emailCpf').value;
  let password = document.getElementById('password').value;
  const login = {
    emailCpf: emailCpf,
    password: password,
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(login),
  }

  fetch('http://localhost:3333/tech/login/user', options)
    .then(data => {
      if (!data.ok) {
        data.text().then(erro => {
          console.log(erro)
        })
      } else {
        data.text().then(dados => {
          let token = JSON.parse(dados);
          let data = new Date().getHours();
          let horasExpira = data + 3;
          token.expira = horasExpira;
          localStorage.setItem('testeTech', JSON.stringify(token))
          window.location.href = '/index.html'
        })

      }
    })

}
