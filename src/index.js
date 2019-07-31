import { novaReceita, removeReceita } from './receitas'
import { iniciaHomePage } from './views'

iniciaHomePage(document.querySelector('#ordenarReceitas').value)

document.querySelector('#btnAddReceita').addEventListener('click', () => {
    const id = novaReceita()
    location.assign(`/edit.html#${id}`)
})

document.querySelector('#ordenarReceitas').addEventListener('change', (e) => {
    iniciaHomePage(e.target.value)
})

$('#modalDeleteReceita').on('show.bs.modal', function(e) {
    const receitaId = e.relatedTarget.id
    document.querySelector("#modalBtnDeletar").onclick = () =>{
        removeReceita(receitaId)
        iniciaHomePage()
        $('#modalDeleteReceita').modal('hide')
    }
})