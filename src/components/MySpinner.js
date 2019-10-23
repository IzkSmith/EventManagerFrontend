import Spinner from "react-spinner-material/lib";
import React, { Component } from 'react';

export default class MySpinner extends Component {
    render() {
        return (
            <div className={"spinner"}>
                <Spinner size={120} spinnerColor={"#2ecc71"} spinnerWidth={2} visible={true} />
            </div>
        );
    }
}