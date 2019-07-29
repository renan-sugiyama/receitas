import { getReceitas, novaReceita, removeReceita } from './receitas'
import { iniciaHomePage } from './views'

const receitas = getReceitas()

iniciaHomePage()

document.querySelector('#btnAddReceita').addEventListener('click', () => {
    const id = novaReceita()
    location.assign(`/edit.html#${id}`)
})

// receitas.forEach(receita => {
//     document.querySelector(`#${receita.id}`).addEventListener('click', () => {
//         console.log('id', receita.id)
//         //removeReceita(receita.id)
//         //location.assign('/')
//     })

// });

$('#modalDeleteReceita').on('show.bs.modal', function(e) {
    const receitaId = e.relatedTarget.id
    document.querySelector("#modalBtnDeletar").onclick = () =>{
        removeReceita(receitaId)
        location.assign('/')
    }
})