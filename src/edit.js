import { iniciaEditPage, renderIngredientes } from './views'
import { getReceita, addIngredientes, saveReceitas, atualizaReceita } from './receitas'
import uuidv4 from 'uuid/v4'


iniciaEditPage()

document.querySelector('#addIgrediente').addEventListener('click', (e) => {
    let nome = document.querySelector('#ingrediente-nome')
    let quantidade = document.querySelector('#ingrediente-quantidade') 
    const receitaId = location.hash.substring(1)
    const novosIngredientes = {
        id: uuidv4(),
        nome: nome.value,
        quantidade: quantidade.value,
        "tenho": true
    }
    addIngredientes(receitaId, novosIngredientes)
    renderIngredientes(getReceita(receitaId).ingredientes)
    nome.value = ''
    quantidade.value = ''
})

document.querySelector('#nomeReceita').addEventListener('input', (e) => {
    const id = location.hash.substring(1)
    atualizaReceita(id, {
        nome: e.target.value
    })
})