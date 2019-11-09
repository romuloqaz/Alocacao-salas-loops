let butt = document.getElementById('buttCad')

butt.addEventListener('click',()=>{
    let nome = document.getElementById('nome').value
    let email = document.getElementById('email').value
    let cargo = document.getElementById('cargo').value
    let matricula = document.getElementById('matricula').value
    let senha = document.getElementById('senha').value


    
    let servidor = {
        nome: nome, 
        email: email,
        cargo: cargo,
        matricula: matricula,
        senha: senha
    }
    
   $.post('/verificar', servidor, function(response){
       function addMsg(type, frase) {
        document.body.insertAdjacentHTML("beforeend",`<div style="width:100%; height: 50px; position: absolute; margin-top:-50px " class="alert alert-${type}" role="alert">
       ${frase}!!
      </div>`)
      $(".alert").animate({top:"50px"})
       }

      if(response.status){
        addMsg("danger", "Usuário já existente")
       }else{
         $.post('/cadastrar', servidor, function(response){
                if(response.status){
                    addMsg("success", "Usuário cadastrado com sucesso")
                }else{
                    addMsg("danger", "Não foi possível cadastrar")
                }
         })
       }

   }) 

})