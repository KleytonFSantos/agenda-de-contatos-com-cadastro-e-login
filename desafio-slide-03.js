let idAtual = undefined;

if(localStorage.getItem('token') === null) {
  alert('Você precisa estar logado para acessar esta página.')
  window.location.href = "http://127.0.0.1:5500/login-screen/login.html"
}

function tratarEvento(event, index) {
  let nomeContato = document.getElementById("nomeContato").value;
  let telefoneContato = document.getElementById("telefoneContato").value;
  let estadoContato = document.getElementById("estadoContato").value;

  console.log(
    "evento: ",
    event,
    " dados: ",
    nomeContato,
    telefoneContato,
    estadoContato
  );
   
    

  if ("salvar" == event) {
    let contatos = recuperarDados();
    if(idAtual == contatos[index]){
      salvarContato(nomeContato, telefoneContato, estadoContato, undefined);
    } else {
      alert('Não é possível salvar o item de id:' +' '+ idAtual +' '+ 'apenas editá-lo.')
    }
    
  } else if ("editar" == event) {
    salvarContato(nomeContato, telefoneContato, estadoContato, idAtual);
  } else if ("excluir" == event) {
    let retorno = confirm("deseja realmente excluir este contato?");
    if (retorno == true) {
      idAtual = index;
      removerContato(index);
    }
  } else if ("visualizar" == event) {
    visualizarContato(index);
  } else if("sair" == event) {
 
    localStorage.removeItem('token')
    window.location.href = "http://127.0.0.1:5500/login-screen/login.html"
  }
    else {
    console.log(`Nenhuma ação válida foi selecionada`);
  } 

  if ("visualizar" != event) {
    carregarTela();
  }
}

function salvarContato(nome, telefone, estado, id) {
  // chave : valor
  let contato = {};
  contato["nome"] = nome;
  contato["telefone"] = telefone;
  contato["estado"] = estado;
  contato["id"] = id;

  salvarDados(contato);
  
}

function visualizarContato(index) {
  idAtual = index;
  let contatos = recuperarDados();
  let contato = contatos.filter(function (c) {
    return c.id == index;
  })[0];
  preencherCampos(contato);
}

function preencherCampos(contato) {
  if (contato) {
    document.getElementById("nomeContato").value = contato.nome;
    document.getElementById("telefoneContato").value = contato.telefone;
    document.getElementById("estadoContato").value = contato.estado;
  } else {
    document.getElementById("nomeContato").value = "";
    document.getElementById("telefoneContato").value = "";
    document.getElementById("estadoContato").value = "";
  }
}

function montarTabelaConteudo(contatos) {
  if (contatos && contatos.length) {
    document.getElementById("conteudo-tabela-contatos-salvos").innerHTML =
      contatos
        .map((contato) => {
          return `
      <tr>
        <td>${contato.nome}</td>
        <td>${contato.telefone}</td>
        <td>${contato.estado}</td>
        <td>
          <span style="cursor:pointer" class="material-icons material-icons-outlined text-info" onclick="tratarEvento('visualizar','${contato.id}')">
           search
          </span>
          <span style="cursor:pointer" class="material-icons material-icons-outlined text-info" onclick="tratarEvento('excluir','${contato.id}')">
           delete
          </span>
        </td>
      </tr>
      `;
        })
        .join("");
  }
}

function carregarTela() {
  montarTabelaConteudo(recuperarDados());
}
carregarTela();

function sair() {
  window.location.href = "http://127.0.0.1:5500/login.html"
}