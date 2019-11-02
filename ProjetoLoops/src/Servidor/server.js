const porta = 3003

const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('/home/klihsman/ProjetoLoops/src/Telas/TelaLogin/src'))

app.get('/login',(req, res, next)=>{
    res.sendFile(path.join('/home/klihsman/ProjetoLoops/src/Telas/TelaLogin/index.html'));
})

app.get('/teste',(req, res, next)=>{
    console.log("Klihsman")
})




app.listen(porta, ()=>{
    console.log('Servidor rodando na porta: '+porta);
})


