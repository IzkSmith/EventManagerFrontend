import React, { Component } from 'react';
import SideNav from "../SideNav";
import axios from 'axios';
import MySpinner from "../MySpinner";

export default class AdminPanel extends Component {
    state = {
        loaded: false
    };

    componentDidMount() {
        if(!(localStorage.getItem('roles') || []).includes(1))
            window.location.href =('/Events');
        this.getUsers( );
    }

    getUsers = async () => {
        this.setState({loaded:false});
        let headers = {
            'Content-type':'application/json',
            'authorization': 'Bearer ' + localStorage.getItem('id_token')
        };
        let res = await axios.get(`/api/v1/user/all`, { headers: headers});
        this.setState(res.data);
        this.setState({loaded: true});
    };

    handleGrant = (user) => {
        user.roles = user.roles.includes(2) ? [3] : [3,2];
        this.changeUser(user);
    };

    changeUser = async (data) => {
        await axios.post(`/api/v1/user`, data,
            { headers: { 'Content-type':'application/json','authorization': 'Bearer '
                        + localStorage.getItem('id_token')}});
        this.setState({loaded:true});
        this.getUsers();
    };

    handleDenyRequest = (user) => {
        user.wantsNewRole = false;
        this.changeUser(user);
    };

    render() {
        console.log(this.state);
        let role;
        return (
            <div>
                <div className="events-box">
                    <h1>Список пользователей</h1>
                    <p>Всего : {this.state.numberOfElements}</p>
                    {
                        this.state.loaded?
                            <table width="700" align="center">
                                <thead>
                                <tr>
                                    <th>Полное имя</th>
                                    <th>Имя пользователя</th>
                                    <th>Роль</th>
                                    <th/>
                                    <th/>
                                </tr>
                                </thead>
                                {this.state.content.map(item =>
                                    <tbody>
                                    <tr align="center">
                                        <td>{item.firstName} {item.lastName}</td>
                                        <td>{item.username}</td>
                                        <td>
                                            {
                                                role = item.roles.includes(1) ?
                                            'Администратор' :
                                            item.roles.includes(2) ? 'Организатор' : 'Пользователь'}
                                        </td>
                                        {role === 'Администратор'? <p/> :
                                            <td>
                                                <input className="about"
                                                       type="button"
                                                       value={ role === 'Организатор'? 'Понизить' : 'Повысить'}
                                                       onClick={() => this.handleGrant(item)}
                                                />
                                            </td>
                                        }
                                        <td>{
                                            item.wantsNewRole=== true? <p>Запросил повышение <button type="button" className="about" onClick={()=>{this.handleDenyRequest(item)}}>Отказать</button></p>: ''
                                        }</td>
                                    </tr>
                                    </tbody>)}
                            </table>
                            :
                            <MySpinner/>
                    }
                </div>
                <div className="sideNav">
                    <SideNav/>
                </div>
            </div>
        )
    }
}
