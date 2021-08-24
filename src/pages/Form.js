import React from "react";
import { Link, withRouter } from "react-router-dom";
import ContatosService from "../services/ContatosService";
import M from "materialize-css";

class Form extends React.Component {

    constructor(props){
        super(props)
        this.contatosService = new ContatosService
        this.state = {
            nome: '',
            email: '',
            telefone: '',
            dataNascimento: '',
        }

        this.changeHandler = this.changeHandler.bind(this)
    }

    componentDidMount(){
        let id = this.props.match.params.id

        if (id){
            this.contatosService.findById(id)
            .then(response => {
                if (response.data){
                    this.setState(response.data)

                    let elements = document.getElementsByTagName('label')
                    for (let element of elements){
                        element.classList.add('active')
                    }

                }else{
                    M.toast( { html: `Não foi encontrado contato com ID = ${id}`} )
                }
            })
        }else{
            
        }
    }

    changeHandler(event){
        this.setState( { [event.target.name]: event.target.value } )
    }

    save(){
        if(this.state.id){
            this.contatosService.update(this.state)
            .then( response => {
                M.toast( { html: 'Contato atualizado com sucesso!'} )
                this.props.history.push('/')
            }).catch(err => {
                M.toast( { html: 'Ocorreu um erro inesperado!'} )
            })
        }else{
            this.contatosService.save(this.state)
            .then( response => {
                M.toast( { html: 'Contato cadastrado com sucesso!'} )
                this.props.history.push('/')
            }).catch(err => {
                M.toast( { html: 'Ocorreu um erro inesperado!'} )
            })
        }
    }

    render() {
        return (
            <div className="container">
                <nav>
                    <div className="nav-wrapper">
                        <a href="#" className="brand-logo">Contatos API</a>
                    </div>
                </nav>

                <div className="row">
                    <h5 className="header">Cadastro de Contatos</h5>
                </div>

                <div className="content">
                    <form action="">
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="nome" name="nome" type="text" className="validate" value={this.state.nome} onChange={this.changeHandler}/>
                                <label htmlFor="nome">Nome</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="email" name="email" type="email" className="validate" value={this.state.email} onChange={this.changeHandler}/>
                                <label htmlFor="email">Email</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s6">
                                <input id="telefone" name="telefone" type="tel" className="validate" value={this.state.telefone} onChange={this.changeHandler}/>
                                <label htmlFor="telefone">Telefone</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="nascimento" name="dataNascimento" type="date" className="validate" value={this.state.dataNascimento} onChange={this.changeHandler}/>
                                <label htmlFor="nascimento">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s4"></div>
                            <div className="col s4"></div>
                            <div className="col s4">
                                <a onClick={ () => this.save() }className="waves-effect waves-light btn"><i className="material-icons">save</i>  Salvar</a>
                                <Link to="/" className="waves-effect waves-light btn red lighten-2"><i className="material-icons">cancel</i>  Cancelar</Link>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Form)