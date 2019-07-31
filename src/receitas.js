import uuidv4 from 'uuid/v4'

let receitas = []

const getReceitas = () => {
    const JSONreceitas = JSON.parse(localStorage.getItem('receitas'))
    if (JSONreceitas === null) {
        saveReceitas()
        return []
    } else {
        return JSONreceitas;
    }    
}

const getReceita = (id) => {
    return getReceitas().find((receita) => receita.id === id);
}

const removeReceita = (id) => {
    const receitaIndex = receitas.findIndex((receita) => receita.id === id)
    if (receitaIndex > -1) {
        receitas.splice(receitaIndex, 1)        
        saveReceitas()
    }
}

const novaReceita = () => {
    const id = 'a' + uuidv4()
    receitas.push({
        id: id,
        nome: 'sem nome',
        descricao: '',
        criado_em: Date.now(),
        atualizado_em: Date.now(),
        ingredientes: [],
    })
    saveReceitas()
    return id
}

const saveReceitas = () => {
    localStorage.setItem('receitas', JSON.stringify(receitas));
}

const atualizaReceita = (id, updates) => {
    const receita = receitas.find((rec)=> rec.id === id)

    if(!receita) {
        return
    }

    if(updates.nome) {
        receita.nome = updates.nome
        receita.atualizado_em = Date.now()
    }else if(updates.descricao) {
        receita.descricao = updates.descricao
        receita.atualizado_em = Date.now()
    }
    saveReceitas()
}

const addIngredientes = (receitaId, ingredientes) => {
    const receitaUpdate = receitas.find((receita) => receita.id === receitaId)
    receitaUpdate.atualizado_em = Date.now()
    receitaUpdate.ingredientes.push(ingredientes)
    saveReceitas()
}

const removeIngrediente = (receitaId, ingredienteId) => {
    const receita = receitas.find((receita) => receita.id === receitaId)
    const ingredienteIndex = receita.ingredientes.findIndex((ingrediente) => ingrediente.id === ingredienteId)
    receita.atualizado_em = Date.now()
    receita.ingredientes.splice(ingredienteIndex, 1)
    saveReceitas()
}

const atualizaIngrediente = (receitaId, ingredienteId, update) => {
    const receita = receitas.find((receita) => receita.id === receitaId)
    const ingredienteIndex = receita.ingredientes.findIndex((ingrediente) => {
        return ingrediente.id === ingredienteId
    })
    receita.ingredientes[ingredienteIndex].tenho = update
    saveReceitas()
}

const sortReceitas = (sortByParameter) => {
    if(sortByParameter === 'update') {
        return receitas.sort(sortByUpdate);
    }else if(sortByParameter === 'criacao') {
        return receitas.sort(sortByCriacao);
    }else if(sortByParameter === 'nome') {
        return receitas.sort(sortByNome);
    }else {
        return receitas
    }
}

const sortByUpdate = ( a, b ) => {
    if ( a.atualizado_em > b.atualizado_em ){
      return -1;
    }
    if ( a.atualizado_em < b.atualizado_em ){
      return 1;
    }
    return 0;
}

const sortByNome = ( a, b ) => {
    if ( a.nome < b.nome ){
      return -1;
    }
    if ( a.nome > b.nome ){
      return 1;
    }
    return 0;
}

const sortByCriacao = ( a, b ) => {
    if ( a.criado_em > b.criado_em ){
      return -1;
    }
    if ( a.criado_em < b.criado_em ){
      return 1;
    }
    return 0;
}

receitas = getReceitas()

export {
    getReceitas, 
    removeReceita,
    novaReceita,  
    addIngredientes, 
    getReceita, 
    atualizaReceita, 
    removeIngrediente, 
    atualizaIngrediente, 
    sortReceitas
}