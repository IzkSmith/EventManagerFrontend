import React from 'react'
import {Link, withRouter} from "react-router-dom";
import LogoutButton from "./LogoutButton";
import axios from 'axios';
import Spinner from "react-spinner-material";

class Event extends React.Component {

    state = {
        cityName : null,
        loaded: false
    };

    componentDidMount() {
        const { match: {params: { id }}} = this.props;

        let headers = {
            'Content-type':'application/json',
            'authorization': 'Bearer ' + localStorage.getItem('id_token')
        };

        axios.get(`/api/v1/event/${id}`,
            { headers: headers})
            .then(res => {
                this.getCity(res.data.cityId,res.data,headers)
            })
    };

    getCity = async (id,data,headers) => {
        let res = await axios.get(`/api/v1/city/${id}`, { headers: headers});
        this.setState({...data, cityName: res.data.name,loaded: true});
    };

    postUser = async (data) => {
       let res = await axios.post(`/api/v1/event`, data,
            { headers: { 'Content-type':'application/json','authorization': 'Bearer '
                        + localStorage.getItem('id_token')}});
       this.setState(res.data);
    };

    handleSignup=() =>{
        const userId=+localStorage.getItem('user_id');
        const userIds=this.state.userIds;

        if(this.state.maxMembers>userIds.length) {
            userIds.includes(userId) ? userIds.splice(userIds.indexOf(userId),1) : userIds.push(`${userId}`);

            let data=`{"id":${this.state.id},"name":"${this.state.name}","date":"${this.state.date}",
            "cityId":${this.state.cityId},"maxMembers":${this.state.maxMembers},
            "userIds":[${userIds}],"description":"${this.state.description}","holderId":"${this.state.holderId}"}`;

            this.postUser(data);
        }else {
            alert('Event is full');
        }
    };

    render() {
        let editButton;
        let userId=+localStorage.getItem('user_id')
        if((localStorage.getItem('roles').includes(1))||(userId===this.state.holderId)){
            localStorage.setItem('event_id',this.state.id);
            editButton=
                <Link to="/EditEvent">
                    <input className="create" type="submit" name="" value="Edit this event"/>
                </Link>
        }

        const userIds=this.state.userIds;
        let label =(userIds||[]).includes(userId)? 'Sign out': 'Sign in';

        return (
            <div>
                <div className="events-box">
                    {this.state.loaded?
                        <div>
                            <h1>{this.state.name}</h1>
                            <p>Date : {(this.state.date||'').replace(/T/g, " ")}</p>
                            <p>City : {this.state.cityName}</p>
                            <p>Members ( Max : {this.state.maxMembers} / Current : {(userIds||'').length}) </p>
                            <h3>Description</h3>
                            <p className="description" >{this.state.description}</p>
                        </div>
                        :
                        <div className={"spinner"}>
                            <Spinner size={120} spinnerColor={"#2ecc71"} spinnerWidth={2} visible={true} />
                        </div>
                    }
                </div>
                <div className="logout-box">
                    <p><i className="fas fa-user"/> {localStorage.getItem('username')}</p>
                    <LogoutButton/>
                </div>
                <div >
                    <button className="signup" onClick={this.handleSignup}>{label}</button>
                </div>
                {editButton}
            </div>
        )
    }
}

export default withRouter(Event)



