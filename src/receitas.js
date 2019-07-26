import uuidv4 from 'uuid/v4'

// let receitas = [
//     {
//         id: '65461346546',
//         nome: 'pamonha',
//         descricao: 'bata tudo no liquidificador',
//         ingredientes: [
//             {
//                 nome: 'milho',
//                 quantidade: '3 un'
//             }
//         ]
//     },
//     {
//         id: 'kçljaçlkja78a46a4',
//         nome: 'brigadeiro',
//         descricao: 'misture tudo em uma panela e deixe aquecer',
//         ingredientes: [
//             {
//                 nome: 'leite condensado',
//                 quantidade: '1 lata'
//             },
//             {
//                 nome: 'leite',
//                 quantidade: '1 lata'
//             }
//         ],
//     }
// ]

let receitas = []

const getReceitas = () => {
    return JSON.parse(localStorage.getItem('receitas'));
}

const getReceita = (id) => {
    return getReceitas().find((receita)=>{
        return receita.id === id
    });
}


const removeReceita = (id) => {
    const receitaIndex = receitas.findIndex((receita) => {
        return receita.id === id
    })
    if (receitaIndex > -1) {
        console.log('receitas', id)
        receitas.splice(receitaIndex, 1)
        console.log('receitas', receitas)
        
        saveReceitas()
    }
    
}

const novaReceita = () => {
    const id = 'a' + uuidv4()
    receitas.push({
        id: id,
        nome: 'sem nome',
        descricao: '',
        ingredientes: [],
    })
    saveReceitas()
    return id
}

const saveReceitas = () => {
    localStorage.setItem('receitas', JSON.stringify(receitas));
}

const atualizaReceita = (id, updates) => {

}

const addIngredientes = (receitaId, ingredientes) => {
    const receitaUpdate = receitas.find((receita) => {
        return receita.id === receitaId
    })

    receitaUpdate.ingredientes.push(ingredientes)
    saveReceitas()
}

receitas = getReceitas()

export {getReceitas, removeReceita, novaReceita, saveReceitas, addIngredientes, getReceita}