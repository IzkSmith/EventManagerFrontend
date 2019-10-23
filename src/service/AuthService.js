import decode from 'jwt-decode';

export default class AuthService {

    newEvent = (name, date, cityId, maxMembers, description, holderId) => {
        return this.fetch(`/api/v1/event`, {
            method: 'POST',
            body: JSON.stringify({
                name,
                date,
                cityId,
                maxMembers,
                description,
                holderId
            })
        }).then(res => {
            return Promise.resolve(res);
        })
    };

    editEvent = (id, name, date, cityId, maxMembers, description, holderId) => {
        return this.fetch(`/api/v1/event`, {
            method: 'POST',
            body: JSON.stringify({
                id,
                name,
                date,
                cityId,
                maxMembers,
                description,
                holderId
            })
        }).then(res => {
            return Promise.resolve(res);
        })
    };

    newUser = (firstName ,lastName, username, email, password) => {
        return this.fetch(`/api/v1/user/register`, {
            method: 'POST',
            body: JSON.stringify({
                firstName ,
                lastName,
                username,
                email,
                password
            })
        }).then(res => {
            return Promise.resolve(res);
        })
    };

    login = (username, password) => {
        // Get a token
        return this.fetch(`/api/v1/auth/login`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            })
        }).then(res => {
            localStorage.setItem('id_token', res.token);
            localStorage.setItem('roles', res.roles);
            localStorage.setItem('firstName', res.firstName);
            localStorage.setItem('lastName', res.lastName);
            localStorage.setItem('user_id', res.id);
            localStorage.setItem('username', res.username);
            localStorage.setItem('page', 0);
            return Promise.resolve(res);
        })
    };

    fetch = (url, options) => {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json());
    };

    _checkStatus = (response) => {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    };

    loggedIn = () => {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token) // handwaiving here
    };

    isTokenExpired = (token) => {
        try {
            const decoded = decode(token);
            return(decoded.exp < Date.now() / 1000);
        }
        catch (err) {
            return false;
        }
    };

    getToken = () => {
        return localStorage.getItem('id_token')
    };

    getProfile = () => {
        return decode(this.getToken());
    };

    logout = () => {
        localStorage.removeItem('avatar');
        localStorage.removeItem('id_token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('roles');
        localStorage.removeItem('event_id');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
    };
}