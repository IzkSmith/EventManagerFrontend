import React from 'react'
import {Link, withRouter} from "react-router-dom";
import SideNav from "../SideNav";
import axios from 'axios';
import AuthService from "../../service/AuthService";
import MySpinner from "../MySpinner";
import LoginButton from "../LoginButton";
import '../../styles/Event.css';

class Event extends React.Component {
    state = {
        cityName : null,
        loaded: false
    };

    componentDidMount() {
        const { match: {params: {id}} } = this.props;

        axios.get(`/api/v1/event/${id}`)
            .then(res => {
                this.setState(res.data);
                this.getCity(res.data.cityId);
            })
    };

    getCity = async (id, data) => {
        let res = await axios.get(`/api/v1/city/${id}`);
        this.setState({...data, cityName: res.data.name, loaded: true});
    };

    handleSignup = () => {
        const userId = +localStorage.getItem('user_id');
        const userIds = this.state.userIds;

        if (this.state.maxMembers > userIds.length) {
            userIds.includes(userId) ? userIds.splice(userIds.indexOf(userId), 1) : userIds.push(`${userId}`);

            let data = `{
                "id": ${this.state.id},
                "name": "${this.state.name}",
                "date": "${this.state.date}",
                "cityId": ${this.state.cityId},
                "maxMembers": ${this.state.maxMembers},
                "userIds": [${userIds}],
                "description": "${this.state.description}",
                "holderId":" ${this.state.holderId}"
            }`;

            this.postUser(data);
        } else {
            alert('Event is full');
        }
    };

    postUser = async (data) => {
        let res = await axios.post(`/api/v1/event`, data,
            { headers: { 'Content-type':'application/json','authorization': 'Bearer '
                        + localStorage.getItem('id_token')}});
        this.setState(res.data);
    };

    render() {
        let editButton;
        let membersButton;
        let userId=+localStorage.getItem('user_id');
        const userIds=this.state.userIds;

        if (((localStorage.getItem('roles') || []).includes(1)) || (userId === this.state.holderId)) {
            localStorage.setItem('event_id', this.state.id);

            editButton =
                <Link to="/EditEvent">
                    <input className="leftButton" type="submit" name="" value="Edit this event"/>
                </Link>;

            if ((userIds || '').length>0) {
                membersButton =
                    <Link to={"/Members"}>
                        <input className="members" type="submit" name="" value="members"/>
                    </Link>;
            }
        }

        this.Auth = new AuthService();
        let label = (userIds || []).includes(userId) ? 'Sign out' : 'Sign up';
        let signUpButton = (this.Auth.isLoggedIn()) ?
            <button type={"button"} className="signupButton" onClick={this.handleSignup}>{label}</button> : '';

        return (
            <div>
                <div className="main">
                    {this.state.loaded?
                        <div>
                            <h2>{this.state.name}</h2>
                            <p>Date : {(this.state.date||'').replace(/T/g, " ")}</p>
                            <p>City : {this.state.cityName}</p>
                            <p>Members ( Max : {this.state.maxMembers} / Current : {(userIds || '').length}) </p>
                            <h3>Description</h3>
                            <p>{this.state.description}</p>
                        </div>
                        :
                        <MySpinner/>
                    }
                </div>
                <div className="sideNav">
                    <SideNav/>
                </div>
                {signUpButton}
                {editButton}
                {membersButton}
            </div>
        )
    }
}

export default withRouter(Event)



