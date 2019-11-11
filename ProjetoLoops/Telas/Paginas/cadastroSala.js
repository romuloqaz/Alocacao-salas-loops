

let buttCadSala = document.getElementById('buttCadSala')

buttCadSala.addEventListener('click', ()=>{
    let nome = document.getElementById('nome').value
    let estado = document.getElementById('estado').value
    let descricao = document.getElementById('mensagem').value

    
    let obj = {
        nome: nome,
        estado: estado,
        descricao: descricao
    }
    console.log("Fora")
    console.log(obj)

  $.post('/cadastrarSala', obj, function(response){
       if(!response.status){
           window.alert('Sala cadastrada com sucesso!!')
       }else{
            window.alert('Sala já cadastrada!!!')
       }

    })
})