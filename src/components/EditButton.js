import React, { Component } from 'react';

export default class EditButton extends Component {
    render() {
        let editButton = <button type="button" className="about" onClick={()=>{window.location.href =('/Auth')}}>Edit</button>;
        return (
            <div >
                {editButton}
            </div>
        );
    }
}
