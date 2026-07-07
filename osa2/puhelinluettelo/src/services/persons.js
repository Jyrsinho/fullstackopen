import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll =  () => {
    return axios.get(baseURL)
}

const createPerson =  (newPerson) => {
    return axios.post(baseURL, newPerson)
}

const updatePerson = (id, newPerson) => {
    console.log('update person', id, newPerson);
    return axios.put(`${baseURL}/${id}` , newPerson)
}

const deletePerson =  (id) => {
    return axios.delete(`${baseURL}/${id}`)
        .then( res => {
            console.log('Deleted person, ', res.data);
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