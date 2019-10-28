import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./components/Login";
import Events from "./components/Events";
import NewEvent from "./components/NewEvent";
import Signup from "./components/Signup";
import Event from "./components/Event";
import EditEvent from "./components/EditEvent";
import Members from "./components/Members";
import AdminPanel from "./components/AdminPanel";

export default function App (){
    return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/Members">
                            <Members />
                        </Route>
                        <Route path="/AdminPanel">
                            <AdminPanel />
                        </Route>
                        <Route path="/EditEvent">
                            <EditEvent />
                        </Route>
                        <Route path="/NewEvent">
                            <NewEvent />
                        </Route>
                        <Route path="/Events">
                            <Events />
                        </Route>
                        <Route path="/Event/:id">
                            <Event />
                        </Route>
                        <Route path="/Signup">
                            <Signup />
                        </Route>
                        <Route path="/Auth">
                            <Login />
                        </Route>
                    </Switch>
                </div>
            </Router>
    );
}
