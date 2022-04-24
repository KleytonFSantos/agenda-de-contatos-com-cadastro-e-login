let btn = document.getElementById("btnLogin");
let msgError = document.getElementById("msgError");

email.focus();

btn.addEventListener("click", () => {
  let inputPassword = document.getElementById("inputPassword");

  if (inputPassword.getAttribute("type") == "password") {
    inputPassword.setAttribute("type", "text");
  } else {
    inputPassword.setAttribute("type", "password");
  }
});

const enter = () => {
  let email = document.querySelector("#email");
  let labelEmail = document.querySelector("#labelEmail");
  let password = document.querySelector("#inputPassword");
  let labelPassword = document.querySelector("#labelPassword");

  let listaUser = [];

  let userValid = {
    email: "",
    password: "",
  };

  listaUser = JSON.parse(localStorage.getItem("listaUser"));

  try {
    listaUser.forEach((item) => {
      if (email.value === item.email && inputPassword.value === item.senha) {
        userValid = {
          email: item.email,
          password: item.senha,
        };
      }
    });
  } catch (err){
    
  }

  if (
    email.value &&
    password.value &&
    email.value === userValid.email &&
    password.value === userValid.password
  ) {
    window.location.href = "http://127.0.0.1:5500/index.html";

    let token = Math.random().toString(16).substring(2);
    localStorage.setItem("token", token);
  } else {
    msgError.setAttribute("style", "display:block");
    msgError.setAttribute("style", "color:red");
    email.setAttribute("style", "color: red");
    labelEmail.setAttribute("style", "color: red");
    password.setAttribute("style", "color: red");
    labelPassword.setAttribute("style", "color: red");
    email.focus();
    email.value = "";
    password.value = "";
  }
};
