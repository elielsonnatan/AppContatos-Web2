import axios from 'axios'

export default class ContatosService {
    constructor () {
        this.urlAPI = 'http://18.220.58.182/api/contatos'
    }

    findAll() {
        return axios.get(this.urlAPI)
    }

    findById (id) {
        return axios.get(`${this.urlAPI}/${id}`)
    }

    delete(id) {
        return axios.delete(`${this.urlAPI}/${id}`)
    }

    save (contato) {
        return axios.post(this.urlAPI, contato)
    }

    update (contato) {
        return axios.put(`${this.urlAPI}/${contato.id}`, contato)
    }
}