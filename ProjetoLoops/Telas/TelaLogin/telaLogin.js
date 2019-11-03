let butt = document.getElementById('cadastro');
let buttLog = document.getElementById('botao')
const banco = require('../../Servidor/index')
banco.cliente.connect();




butt.addEventListener('click', ()=>{
    window.location.href="http://localhost:3003/cadastro"
})

buttLog.addEventListener('click', ()=>{
    banco.cliente.query("")
})