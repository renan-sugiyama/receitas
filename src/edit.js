import { iniciaEditPage, renderIngredientes } from './views'
import { getReceita, addIngredientes, atualizaReceita, removeIngrediente, getReceitas, atualizaIngrediente } from './receitas'
import uuidv4 from 'uuid/v4'


iniciaEditPage()

document.querySelector('#addIgrediente').addEventListener('click', (e) => {
    let nome = document.querySelector('#ingrediente-nome')
    let quantidade = document.querySelector('#ingrediente-quantidade')
    if(!validaFormIngrediente(nome.value, quantidade.value)){        
        return
    }
    const receitaId = location.hash.substring(1)
    const novosIngredientes = {
        id: 'i' + uuidv4(),
        nome: nome.value,
        quantidade: quantidade.value,
        "tenho": true
    }
    
    addIngredientes(receitaId, novosIngredientes)
    renderIngredientes(getReceita(receitaId).ingredientes)
    nome.value = ''
    quantidade.value = ''
    //addEventoDelete()
    addEventoCheckbox()
})

document.querySelector('#ingrediente-nome').addEventListener('input', (e) => {
    if(e.target.value !== '') {
        document.querySelector('#validate-nome').className = 'invisible validade-form'
    }
})

document.querySelector('#ingrediente-quantidade').addEventListener('input', (e) => {
    if(e.target.value !== '') {
        document.querySelector('#validate-qtd').className = 'invisible validade-form'
    }
})

const validaFormIngrediente = (nome, quantidade) => {
    console.log(nome)
    if(nome === '') {
        document.querySelector('#validate-nome').classList.remove('invisible')
        return false
    }else if(quantidade === '') {
        document.querySelector('#validate-qtd').classList.remove('invisible')
        return false
    }else {
        return true
    }
}



document.querySelector('#nomeReceita').addEventListener('input', (e) => {
    const id = location.hash.substring(1)
    atualizaReceita(id, {
        nome: e.target.value
    })
})

document.querySelector('#descricao').addEventListener('input', (e) => {
    const id = location.hash.substring(1)
    atualizaReceita(id, {
        descricao: e.target.value
    })
})

// const addEventoDelete = () => {
//     getReceita(location.hash.substring(1)).ingredientes.forEach(ingrediente => {
//         const receitaId = location.hash.substring(1)
//         document.querySelector(`#${ingrediente.id}`).addEventListener('click', () => {
//             document.querySelector('#modalBtnDeletar').addEventListener('click', ()=>{
//                 removeIngrediente(receitaId, ingrediente.id)
//                 renderIngredientes(getReceita(receitaId).ingredientes)
//                 addEventoDelete()
//                 $('#modalDelete').modal('hide');
//             })
//         })
    
//     });
// }
$('#modalDelete').on('show.bs.modal', function(e) {
    const ingredienteId = e.relatedTarget.id
    const receitaId = location.hash.substring(1)

    document.querySelector("#modalBtnDeletar").onclick = () =>{
        removeIngrediente(receitaId, ingredienteId)
        renderIngredientes(getReceita(receitaId).ingredientes)
        $('#modalDelete').modal('hide');
    }
})



const addEventoCheckbox = () => {
    const receitaId = location.hash.substring(1)
    document.querySelectorAll("input[name=checkbox]").forEach((element)=>{
        element.addEventListener('change', (e) => {    
            const ingredienteId = element.id.substring(12)
            atualizaIngrediente(receitaId, ingredienteId, e.target.checked)
        })
    })
    
}

//addEventoDelete()
addEventoCheckbox()