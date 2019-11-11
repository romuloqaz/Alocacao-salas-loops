const porta = 3003
const express = require('express');
const app = express();
const path = require('path');
const body = require('body-parser');
const cors= require('cors');
const log = require('./log')


const pg = require('pg')
var conString = "postgres://postgres:klihsman123@localhost:5432/ProjetoLoops";
var client = new pg.Client(conString);
client.connect();

app.use(body.json())
app.use(body.urlencoded({extended:false}))
app.use(cors())

app.use(express.static('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/Paginas'))
app.use(express.static('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/Resources'))
app.use(express.static('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas'))
app.use(express.static('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/CadastroUsuário/img'))
app.use(express.static('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/CadastroUsuário'))
app.use(express.static('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/CadastroUsuário/css'))
app.use(express.static('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/TelaLogin'));
app.use(express.static('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/TelaCadastro'))

function isUserLogged(matricula){
    return new Promise((resolve,rejected) => {
        let mat = Number.parseInt(req.body.matricula);
        let query = client.query('SELECT logado from servidor where matricula = $1', [mat])
        query.on('row', function(row){
            if(row.logado){
               resolve(true);
            }else{
                resolve(false);
            }
        });

        query.on('end', () => {
            
        })
    })
   
}

app.get('/',(req, res, next)=>{
    res.sendFile(path.join('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/TelaLogin/telaLogin.html'))
})

app.get('/telaPrincipal',(req, res, next)=>{
    res.sendFile(path.join('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/Paginas/Index.html'))
})

app.get('/cadastro', (req, res, next)=>{
    res.sendFile(path.join('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/CadastroUsuário/telaCadastro.html'));
})


app.get('/cadastroSala', (req, res, next)=>{
    res.sendFile(path.join('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/Paginas/cadastroSala.html'))
    })

app.post('/cadastrar',(req, res, next)=>{
    console.log('entrei')
    let mat = Number.parseInt(req.body.matricula)
    client.query('insert into servidor(matricula, nome, senha, cargo, logado,email) values($1,$2,$3,$4,false,$5)',[ mat, req.body.nome, req.body.senha, req.body.cargo, req.body.email])
    let consulta = client.query("SELECT count(*) from servidor where matricula = $1", [mat])

    consulta.on('row', function(row){
        if(row.cout == 0){
            res.json({status: 0})
        }else{
            res.json({status:1})
        }

    })
} )

app.post('/cadastrarSala', (req, res, next)=>{
   
    let verifica = client.query("Select count(*) from lugar where nome = $1",[req.body.nome]);
    verifica.on('row', function(row){
        if(row.count == 1){
            res.json({status: true})
        }else{
            client.query("insert into lugar(nome, tipo, descricao) values($1, $2, $3)",[req.body.nome, req.body.tipo, req.body.descricao])
            res.json({status:false})
        }
    })
    verifica.on('end', ()=>{
    })

})
app.post('/verificar', (req, res, next)=>{
        let mat = Number.parseInt(req.body.matricula)
        let matriculas = client.query("Select matricula from servidor")
        let numLinhas = client.query("SELECT count(*) from servidor")
        let linhas;

        function getNumLinhas(){
            let nLinha;
            numLinhas.on('row', function(row){
                nLinha = row.count
        
            })
            numLinhas.on('end', ()=>{
                linhas = nLinha
            })
        }
        
        getNumLinhas()
        userExists()
        
        function userExists() {
            let cont = 0;
            let exists;
            matriculas.on('row', function(row){
                cont++;
                if(row.matricula == mat){
                    exists = true
                }
                if(cont == linhas && !exists ){
                    exists = false
                }
                
            })

            matriculas.on('end', ()=>{
                res.json({status: exists})
            })
        }
        
        
                
})

app.post('/autenticar', (req, res, next)=>{
    
    let mat = Number.parseInt(req.body.matricula)
    let log = client.query("select count(*) from servidor where matricula = $1 and senha = $2", [mat, req.body.senha])
    log.on('row', function(row){
        if(row.count==1){
            client.query("update servidor set logado = true where matricula = $1",[mat])
            res.json({status: 1})
        }else{
            res.json({status: 0})
        }
    })

    
})


app.listen(porta, ()=>{
    console.log('Server rodando na porta: '+porta)
})