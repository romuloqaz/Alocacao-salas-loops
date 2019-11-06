const porta = 3003
const express = require('express');
const app = express();
const path = require('path');
const body = require('body-parser');
const cors= require('cors');



const pg = require('pg')
var conString = "postgres://postgres:klihsman123@localhost:5432/ProjetoLoops";
var client = new pg.Client(conString);
client.connect();

app.use(body.json())
app.use(body.urlencoded({extended:false}))
app.use(cors())

app.use(express.static('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas'))
app.use(express.static('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/TelaLogin'));
app.use(express.static('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/TelaCadastroSala/resources'));
app.use(express.static('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/TelaCadastroSala'));
app.use(express.static('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/TelaCadastro'))
app.use(express.static('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/TelaIndex'))
app.use(express.static('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/TelaIndex/resources'))

app.get('/',(req, res, next)=>{
    res.sendFile(path.join('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/TelaLogin/telaLogin.html'))
})

app.get('/cadastro', (req, res, next)=>{
    res.sendFile(path.join('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/TelaCadastro/telaCadastro.html'))
})

app.get('/cadastroSala', (req, res, next)=>{
    res.sendFile(path.join('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/TelaCadastroSala/cadastroSala.html'))
})

app.get('/telaPrincipal',(req, res, next)=>{
    res.sendFile(path.join('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/TelaIndex/Index.html'))
})

app.post('/autenticar', async (req, res, next)=>{
 
    function getProfessor(){
        return new Promise((resolve,reject) => {
            let query = client.query("SELECT* FROM Servidor");
            
           
            let cont = 0;
            query.on('row', function(row) {
                if(row.id == req.body.matricula) {
                    resolve({ status: 1 });
                     }
                });
        })
    }

    var waitToGetKlih = await getProfessor();
    console.log(waitToGetKlih)
    res.send(JSON.stringify(waitToGetKlih));
        
        
        
      /*query.on('end', function() {
            client.end();
        });*/
})


app.listen(porta, ()=>{
    console.log('Server rodando na porta: '+porta)
})