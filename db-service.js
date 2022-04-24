//implementar a validação dos campos               [ ]
//criar uma forma de confirmar a exclusão de dados [x]
//login para que cada usuário tenha sua agenda     [ ] 





function recuperarDados(){
  let lista = window.localStorage.getItem('contatos');
  if(lista) {
      lista = JSON.parse(lista);
  }   
  return lista || [];
}

function salvarDados(contato){
  let contatos = recuperarDados();

  if(!contato.id){
      contato.id = generateUuid();
  } 

  let indexContato = contatos.findIndex(function(c){
      return c.id == contato.id
  });

  if(indexContato == -1){
      contatos.push(contato);
  } else {
      contatos[indexContato] = contato;
  }
  
  window.localStorage.setItem('contatos', JSON.stringify(contatos));
  return contatos;
}

function removerContato(uuid){
  let contatos = recuperarDados();
  contatos = contatos.filter(function(c) {
      return c.id != uuid;
  });
  window.localStorage.setItem('contatos', JSON.stringify(contatos));

  return contatos;
}

function generateUuid() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}