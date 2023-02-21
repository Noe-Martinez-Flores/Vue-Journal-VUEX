// export const myMutations = ( state ) => {
//     return state
// }


export const setEntries = ( state, entries ) => {
    state.entries = [...state.entries ,...entries ],
    state.isLoading = false
}


// eslint-disable-next-line no-unused-vars
export const updateEntries = ( state, data = Object ) => {
    const idx = state.entries.map( entry => entry.id ).indexOf(data.id)
    state.entries[idx] = data
    
}

export const addEntries = ( state, entry = Object ) => {
    state.entries = [ entry , ...state.entries]
}

export const deleteEntry = ( state, id = '') => {
    state.entries = state.entries.filter( e => e.id !== id );
}