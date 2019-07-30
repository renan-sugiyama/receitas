import { getReceitas, sortReceitas } from './receitas'

const iniciaHomePage = (sortBy) => {
    const receitas = sortReceitas(sortBy)
    let receitaElement = document.querySelector('#cards-receitas')
    receitaElement.innerHTML = ''
    receitas.forEach((receita, index) => {
        receitaElement.innerHTML +=
        `<div class="col-md-4 py-3">
            <div class="card">
            <div class="card-body">
                <h5 class="card-title">${receita.nome}</h5>
                <p class="card-text">${criaFrase(verificaQtdIngredientes())[index]}</p>
                <div class="row justify-content-between">
                <div class="col">
                    <a href="./edit.html#${receita.id}" class="btn btn-primary">Visualizar</a>
                </div>
                <div class="col d-flex justify-content-end align-items-center">
                    <a href="#" id="${receita.id}" class="trash"  data-toggle="modal" data-target="#modalDeleteReceita"><i class="fas fa-trash-alt"></i></a>
                </div>
                </div>
            </div>
            </div>
        </div>`
    })
}

const verificaQtdIngredientes = () => {
    const receitas = getReceitas()
    let porcentagens = []
    let contagem = 0
    let soma = 0
    receitas.forEach((receita, indexReceita)=>{
        receita.ingredientes.forEach((ingrediente) => {
            soma += ingrediente.tenho ? 1 : 0
            contagem++
        });
        if(contagem === 0) {
            porcentagens[indexReceita] = 0    
        }else {
            porcentagens[indexReceita] = soma / contagem
        }
        soma = 0
        contagem = 0
    })

    return porcentagens
}

const criaFrase = (porcentagens) =>{
    let frases = []
    porcentagens.forEach((porcentagem, index) =>{
        if(porcentagem === 1) {
            frases[index] = 'Você tem todos os ingredientes'
        } else if(porcentagem >= 0.5) {
            frases[index] = 'Você tem a maioria dos ingredientes'
        } else if(porcentagem > 0) {
            frases[index] = 'Você tem alguns ingredientes'
        } else {
            frases[index] = 'Você não tem nenhum ingrediente'
        }
    })
    return frases
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
        listaIngredientes.innerHTML = `<div class="col-md-9 msg-padrao">Nenhum ingrediente cadastrado</div>`
    }else {
        ingredientes.forEach(ingrediente => {
            
            ingredienteHtml += 
            `<div class="col-md-9">
                <input type="checkbox" name="checkbox" id="ingrediente#${ingrediente.id}" ${ingrediente.tenho === true ? 'checked' : ''} autocomplete="off">                                    
                <span>${ingrediente.quantidade} - </span>
                <span>${ingrediente.nome}</span>
                <hr>
            </div>
            <div class="col-md-3">
                <span id="${ingrediente.id}" data-toggle="modal" data-target="#modalDelete"><i class="fas fa-trash-alt trash-edit"></i></span>
            </div>`
        });
        
        listaIngredientes.innerHTML = ingredienteHtml
    }
}


export {iniciaHomePage, iniciaEditPage, renderIngredientes}



