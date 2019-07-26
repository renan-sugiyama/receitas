let ingredientes = []

const getIngredientes = (receita) => {
    
    return receita.ingredientes
}

const addIngrediente = (ingrediente) => {
    ingredientes.push(ingrediente)
}

const removeIngrediente = (id) => {
    const ingredienteIndex = ingredientes.findIndex((ingrediente) => {
        return ingrediente.id === id
    })

    ingredientes.splice(ingredienteIndex, 1)
}


const checkIngrediente = (id) => {
    const ingrediente = ingredientes.find((ingrediente) => {
        return ingrediente.id === id
    })
    ingrediente.tenho = !ingrediente.tenho
}

