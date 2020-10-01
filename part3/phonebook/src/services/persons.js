import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const errorPerson = {
        id: "5f456167e3476f29d0ffdb5a",
        name: "Error",
        number: "00000000"
      }
    return axios
        .get(baseUrl)
        .then(res => res.data.concat(errorPerson))
}
const create = personObject => {
    return axios
        .post(baseUrl, personObject)
        .then(res => res.data)
}
const updatePerson = (personObject, id) => {
    return axios
        .put(`${baseUrl}/${id}`, personObject)
        .then(res => res.data)
}
const deletePerson = id => {
    return axios
        .delete(`${baseUrl}/${id}`)
        .then(res => res.data)
}

export default {
    getAll,
    create,
    updatePerson,
    deletePerson
}