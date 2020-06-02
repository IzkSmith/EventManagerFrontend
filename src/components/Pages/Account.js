import React, { Component } from 'react';
import SideNav from "../SideNav";
import axios from 'axios';
import MyAvatar from "../MyAvatar";
import EditButton from "../EditButton";
import AuthService from "../../service/AuthService";
import '../../styles/Account.css';

export default class Account extends Component {
    state = {
        loaded: false
    };

    componentDidMount() {
        this.Auth = new AuthService();
        if (!this.Auth.isLoggedIn()) window.location.href =('/Events');
        this.getUser( );
    }

    getUser = async () => {
        this.setState({loaded:false});
        let id = localStorage.getItem("user_id");
        let headers = {
            'Content-type':'application/json',
            'authorization': 'Bearer ' + localStorage.getItem('id_token')
        };
        let res = await axios.get(`/api/v1/user/${id}`, { headers: headers});
        this.setState({user: res.data});
        this.setState({loaded: true});
    };

    handleRoleRequest = (user) => {
        user.wantsNewRole = true;
        this.changeUser(user);
    };

    changeUser = async (data) => {
        await axios.post(`/api/v1/user`, data,
            { headers: { 'Content-type':'application/json','authorization': 'Bearer '
                        + localStorage.getItem('id_token')}});
        this.setState({loaded:true});
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.changeUser(this.state.user);
    };

    handleChange = (e) => this.setState({user:{[e.target.name]: e.target.value}});

    render() {
        console.log(this.state);
        let user = this.state.loaded ? this.state.user : '';
        let requestButton = <button type="button" onClick={()=>{this.handleRoleRequest(user)}}>Запросить роль организатора</button>;
        return (
            <div>
                <div className="page_block">
                    <h1 className={"page_block_header"}>Ваш профиль</h1>
                    <MyAvatar/>
                    <form onSubmit={this.handleFormSubmit}>
                        <div className={"pedit_row clear_fix"}>
                            <div className={"pedit_label"}> Имя:</div>
                            <input  value={user.firstName} name="firstName" onChange={this.handleChange}/>
                        </div>
                        <div className={"pedit_row clear_fix"}>
                            <div className={"pedit_label"}> Фамилия:</div>
                            <input value={user.lastName} name="lastName" onChange={this.handleChange}/>
                        </div>
                        <div className={"pedit_row clear_fix"}>
                            <div className={"pedit_label"}> Имя пользователя:</div>
                            <input value={user.username} name="username" onChange={this.handleChange}/>
                        </div>
                        <div className={"pedit_row clear_fix"}>
                            <div className={"pedit_label"}> Электронная почта:</div>
                            <input value={user.email} name="email" onChange={this.handleChange}/>
                        </div>
                        <input type="submit"  value="Сохранить изменения" />
                    </form>
                    <p/>
                    <label>Роль:
                        {
                            (user.roles || []).includes(1) ? ' Администратор' :
                                (user.roles || []).includes(2)? ' Организатор' : ' Пользователь'
                        }
                    </label>
                    {((localStorage.getItem('roles') || []).includes(2) || user.wantsNewRole === true)? '' : requestButton}
                </div>
                <div className="sideNav">
                    <SideNav/>
                </div>
            </div>
        )
    }
}
