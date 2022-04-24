const inputEmail = document.querySelector("#email");

function recuperarDados() {
  let lista = window.localStorage.getItem("listaUser");
  if (lista) {
    lista = JSON.parse(lista);
  }
  return lista || [];
}

const usuarios = recuperarDados();

const SalvarDados = () => {

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#inputPassword").value;
  const confirmPassword = document.querySelector("#inputConfirmPassword").value;

  const listaUser = {
    email: email,
    senha: password,
    id:([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))
  }

  //trás os e-mails cadastrados entro do array de usuarios
  let emailUser = usuarios.map(function (data){
    return data.email;
  })

  const validPassword = password === confirmPassword
  if(!email || !password || !confirmPassword){
    alert('Preencha os campos para se cadastrar.')
    inputEmail.focus();
  }else 
  if(emailUser.includes(listaUser.email)){              //verifica se o e-mail já está cadastrado no localStorage
    alert('Usuário já cadastrado.')
    inputEmail.focus();
  } else 
  if(!validPassword) {
    alert('As senhas digitadas não são as mesmas.')
    inputEmail.focus();
  }
  else {
    usuarios.push(listaUser)
    localStorage.setItem('listaUser', JSON.stringify(usuarios))
    window.location.href = "http://127.0.0.1:5500/login-screen/login.html";
  }

  return usuarios;

}

inputEmail.focus();

const register = () => {
  SalvarDados();
};


