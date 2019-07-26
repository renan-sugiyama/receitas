import { iniciaEditPage, renderIngredientes } from './views'
import { getReceita, addIngredientes } from './receitas'
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
    console.log(getReceita(receitaId))
    renderIngredientes(getReceita(receitaId).ingredientes)
    console.log(nome)
    nome.value = ''
    quantidade.value = ''
})