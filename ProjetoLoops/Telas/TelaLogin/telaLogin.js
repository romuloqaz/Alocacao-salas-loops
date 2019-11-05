let butt = document.getElementById('cadastro');
let buttLog = document.getElementById('botao')
let mat = document.getElementById('matricula');
let sen = document.getElementById('senha')

butt.addEventListener('click', ()=>{
    window.location.href="http://localhost:3003/cadastro"
})

buttLog.addEventListener('click', ()=>{
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3003/autenticar",
        "method": "POST",
        "headers": {}
      }
      
      $.ajax(settings).done(function (response) {
            if(response.id == mat.value && response.nome == sen.value){
             alert('foi')
            }
      });
})