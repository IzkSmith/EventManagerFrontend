import React from 'react';
import './styles/App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./components/Pages/Login";
import Events from "./components/Pages/Events";
import NewEvent from "./components/Pages/NewEvent";
import Signup from "./components/Pages/Signup";
import Event from "./components/Pages/Event";
import EditEvent from "./components/Pages/EditEvent";
import Members from "./components/Pages/Members";
import AdminPanel from "./components/Pages/AdminPanel";
import Account from "./components/Pages/Account";

export default function App (){
    return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/Account">
                            <Account />
                        </Route>
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
                        <Route path="/">
                            <Events />
                        </Route>
                    </Switch>
                </div>
            </Router>
    );
}
