/* eslint-disable no-unused-vars */
import journalApi from '@/api/journalApi'

export const loadEntries = async ({ commit }) => {
  const { data } = await journalApi.get('/entries.json')

  if ( !data ) {
    commit('setEntries', [])
  }

  const entries = []

  for (let id of Object.keys(data)) {
    entries.push({
      id,
      ...data[id],
    })
  }
  commit('setEntries', entries)
}

export const updateEntries = async ({ commit }, entry = Object) => {
  const { id, ...rest} = entry
  await journalApi.put(`/entries/${id}.json`, rest)


  commit('updateEntries', entry )
}

export const createEntries = async ({ commit }, entry = Object ) => {
  
  const { data } = await journalApi.post('/entries.json', entry);
  entry.id = data.name;
  
  commit('addEntries', entry)

  return data.name;
}

export const deleteEntry = async ( { commit }, id ) => {
  await journalApi.delete(`/entries/${ id }.json`)
  commit('deleteEntry',id)
}
 