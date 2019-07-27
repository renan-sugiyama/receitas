import { iniciaEditPage, renderIngredientes } from './views'
import { getReceita, addIngredientes, atualizaReceita, removeIngrediente, getReceitas, atualizaIngrediente } from './receitas'
import uuidv4 from 'uuid/v4'


iniciaEditPage()

document.querySelector('#addIgrediente').addEventListener('click', (e) => {
    let nome = document.querySelector('#ingrediente-nome')
    let quantidade = document.querySelector('#ingrediente-quantidade') 
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
    addEventoDelete()
    addEventoCheckbox()
})

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

const addEventoDelete = () => {
    getReceita(location.hash.substring(1)).ingredientes.forEach(ingrediente => {
        const receitaId = location.hash.substring(1)
        document.querySelector(`#${ingrediente.id}`).addEventListener('click', () => {
            removeIngrediente(receitaId, ingrediente.id)
            renderIngredientes(getReceita(receitaId).ingredientes)
            addEventoDelete()
        })
    
    });
}

const addEventoCheckbox = () => {
    const receitaId = location.hash.substring(1)
    document.querySelectorAll("input[name=checkbox]").forEach((element)=>{
        element.addEventListener('change', (e) => {    
            const ingredienteId = element.id.substring(12)
            atualizaIngrediente(receitaId, ingredienteId, e.target.checked)
        })
    })
    
}

addEventoDelete()
addEventoCheckbox()