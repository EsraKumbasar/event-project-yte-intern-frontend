import React, { Component } from "react";
import './Toolbar.css';
import {NavLink} from "react-router-dom";

const toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar__navigation">
            <div></div>
            <div className="toolbar__logo"><a href="/">EVENT MANAGEMENT SYSTEM</a> </div>
            <div className="spacer" />
            <div className="toolbar_navigation-items">
                <ul>
                        <li><NavLink to="/home">HOME</NavLink></li>
                        <li><NavLink to="/report">EVENT REPORT</NavLink></li>
                </ul>
            </div>
        </nav>
    </header>
);

export class Toolbar extends Component {
    render() {
        return (
          toolbar()
        );
    }
}

export default Toolbar;