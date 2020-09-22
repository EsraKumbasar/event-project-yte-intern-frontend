import React, { Component } from "react";

import UserService from "../services/user.service";
import axios from "axios";
import authHeader from "../services/auth-header";
import PaginationTableForUser from "../components/table/PaginationTableForUser";

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            rows: [],
            addEventModalOpen: false,
            updateEventModalOpen: false,
            snackbarProperties: {
                isOpen: false,
                message: "",
                severity: ""
            }
        }
    }
    componentDidMount() {
        UserService.getPublicContent().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    componentDidMount() {
        axios.get("api/test/list", { headers: authHeader() })
            .then(response => {
                this.setState({rows: response.data})
            })
    }

    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                    <PaginationTableForUser rows={this.state.rows}/>
                </header>
            </div>
        );
    }
}