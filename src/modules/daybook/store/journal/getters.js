// export const myGetters = (state ) => {
//     return state
// }


export const getEntriesByTerm = ( state ) => ( term = '' ) => {
    if ( term.length === 0 ) {
        return state.entries
    }else if ( term.length > 0 ){
        return state.entries.filter( entry => entry.text.toLowerCase().includes( term.toLowerCase() ) )
    }else {
        return `Ningun termino igual a ${term}`
    }
    
}


export const getEntriesById = ( state ) => ( id = '') => {

    const data = state.entries.find( entry => entry.id == id )
    if (! data ) return
    return { ... data }
}