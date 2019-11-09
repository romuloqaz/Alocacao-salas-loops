

let butt = document.getElementById('cadastro');
let buttLog = document.getElementById('botao');

butt.addEventListener('click', ()=>{
    window.location.href="http://localhost:3003/cadastro"
})

buttLog.addEventListener('click', ()=>{

  let mat = document.getElementById('matricula').value;
  let sen = document.getElementById('senha').value;

  var obj = {
    matricula: mat,
    senha: sen
  }

  $.post('/autenticar', obj, function(response){
      console.log(response) 
    if(response.status == 1){
        window.location.href = "http://localhost:3003/telaPrincipal"
      }
      else{
        console.log(typeof(response))
      }
  })

})