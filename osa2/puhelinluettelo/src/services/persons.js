import axios from 'axios'
const baseURL = '/api/persons'

const getAll =  () => {
    return axios.get(baseURL)
        .then(res => res.data)
        .catch(err => console.log(err));
}

const createPerson =  (newPerson) => {
    return axios.post(baseURL, newPerson)
    .then(res => {
        return res.data
    })
}

const updatePerson = (id, newPerson) => {
    return axios.put(`${baseURL}/${id}` , newPerson)
        .then(res => {
            return res.data
        })

}

const deletePerson =  (id) => {
    return axios.delete(`${baseURL}/${id}`)
        .then( res => {
            return res.data
        })
}

export default  {
    getAll,
    createPerson,
    deletePerson,
    updatePerson,
}