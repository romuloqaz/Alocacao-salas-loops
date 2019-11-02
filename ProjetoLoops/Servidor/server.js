const porta = 3003

const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/TelaLogin'))
app.get('/',(req, res, next)=>{
    res.sendFile(path.join('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/TelaLogin/telaLogin.html'))
})

app.listen(porta, ()=>{
    console.log('Server rodando na porta: '+porta)
})