import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll =  () => {
    return axios.get(baseURL)
        .then(res => res.data)
}

const createPerson =  (newPerson) => {
    return axios.post(baseURL, newPerson)
    .then(res => {
        return res.data
    })
}

const updatePerson = (id, newPerson) => {
    console.log('update person', id, newPerson);
    return axios.put(`${baseURL}/${id}` , newPerson)
        .then(res => {
            console.log('res',res);
            return res.data
        })

}

const deletePerson =  (id) => {
    return axios.delete(`${baseURL}/${id}`)
        .then( res => {
            console.log("res.data - ", res.data);
            return res.data
        })
        .catch( err => {
            console.log("error deleting user", err);
        })
}

export default  {
    getAll,
    createPerson,
    deletePerson,
    updatePerson,
}