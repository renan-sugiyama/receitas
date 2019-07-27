import { getReceitas } from './receitas'

const iniciaHomePage = () => {
    const receitas = getReceitas()
    let receitaElement = document.querySelector('#cards-receitas')
    receitaElement.innerHTML = ''
    receitas.forEach((receita) => {
        receitaElement.innerHTML +=
        `<div class="col-md-4 py-3">
            <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${receita.nome}</h5>
                <p class="card-text">Você tem todos os ingrediente.</p>
                <div class="row justify-content-between">
                <div class="col">
                    <a href="./edit.html#${receita.id}" class="btn btn-primary">Visualizar</a>
                </div>
                <div class="col d-flex justify-content-end align-items-center">
                    <a href="#" id="${receita.id}" class="trash"><i class="fas fa-trash-alt"></i></a>
                </div>
                </div>
            </div>
            </div>
        </div>`
    })
}

const iniciaEditPage = () => {
    const nomeReceita = document.querySelector('#nomeReceita')
    const descricao = document.querySelector('#descricao')
    const receitaId = location.hash.substring(1)
    
    const receita = getReceitas().find((rec)=>{
        return rec.id === receitaId
     })

     if(receita) {
        nomeReceita.value = receita.nome
        descricao.value = receita.descricao
        renderIngredientes(receita.ingredientes)    
     }else {
         location.assign('./index.html')
     }

}

const renderIngredientes = (ingredientes) => {
    
    let ingredienteHtml = ''
    const listaIngredientes = document.querySelector('#lista-ingredientes')
    
    if(ingredientes.length === 0) {
        listaIngredientes.innerHTML = `<div class="col-md-9">Nenhum ingrediente cadastrado</div>`
    }else {
        ingredientes.forEach(ingrediente => {
            
            ingredienteHtml += 
            `<div class="col-md-9">
                <input type="checkbox" name="" id="ingrediente#${ingrediente.id}" ${ingrediente.tenho === true ? 'checked' : ''} autocomplete="off">                                    
                <span>${ingrediente.quantidade} - </span>
                <span>${ingrediente.nome}</span>
            </div>
            <div class="col-md-3">
                <span id="${ingrediente.id}">Deletar</span>
            </div>`
        });
        console.log(ingredienteHtml)
        
        listaIngredientes.innerHTML = ingredienteHtml
    }
}


export {iniciaHomePage, iniciaEditPage, renderIngredientes}



