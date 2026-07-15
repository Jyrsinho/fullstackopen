import axios from 'axios'
const baseURL = '/api/persons'

const getAll =  () => {
    return axios.get(baseURL)
        .then(res => res.data)
        .catch(err => console.log(err));
}

const createPerson =  (newPerson) => {
    console.log('in person service creating new Person', newPerson);
    return axios.post(baseURL, newPerson)
    .then(res => {
        console.log("response from create Person", res);
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
}

export default  {
    getAll,
    createPerson,
    deletePerson,
    updatePerson,
}