import axios from 'axios'

const journalApi = axios.create({
    baseURL : 'https://vue-demo-be946-default-rtdb.firebaseio.com'
})

export default journalApi;