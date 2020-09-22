import React, { Component } from "react";

import UserService from "../services/user.service";
import axios from "axios";
import Button from "@material-ui/core/Button";
import PlusIcon from "@material-ui/icons/Add";
import ReactDialog from "../components/common/ReactDialog";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import authHeader from "../services/auth-header";
import PaginationTableForApplication from "../components/table/PaginationTableForApplication";
import {SvgIcon} from "@material-ui/core";

export default class BoardUser extends Component {
    constructor() {
        super();
        this.state = {
            rows: [],
            addPeopleModalOpen: false,
            snackbarProperties: {
                isOpen: false,
                message: "",
                severity: ""
            }
        }
    }
    componentDidMount() {
        UserService.getUserBoard().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    componentDidMount() {
        axios.get("api/test/list/people", { headers: authHeader() })
            .then(response => {
                this.setState({rows: response.data})
            })
    }

    peopleDialogFields = [
        {id: "peopleName", label: "Name", type: "text"},
        {id: "peopleSurname", label: "Surname ", type: "text"},
        {id: "peopleTCNo", label: "TCKN", type: "text"},
        {id: "peopleEmail", label: "E-mail", type: "text"},
        {id: "eventNumber", label: "Event Number", type: "text"},

    ]

    toggleAddPeopleModal = () => {
        this.setState({addPeopleModalOpen: !this.state.addPeopleModalOpen})
    }


    submitPeopleAdd = (inputData) => {
        this.toggleAddPeopleModal();
        axios.post("/api/test/addPeople/" + inputData.eventNumber, inputData, { headers: authHeader() })
            .then(response => {
                this.setState(prevState => (
                    {rows: [...prevState.rows, response.data]}
                ));
                this.snackbarOpen("People has been added successfully!", "success");
            })
            .catch(error => {
                if (error.response.status === 400) {
                    this.snackbarOpen(error.response.data.errors[0].defaultMessage, "error")
                }
                console.log(error.response);
            })
    }


    snackbarOpen = (message, severity) => {
        console.log(message, severity);
        this.setState(prevState => {
            let snackbarProperties = {...prevState.snackbarProperties}
            snackbarProperties.isOpen = true;
            snackbarProperties.message = message;
            snackbarProperties.severity = severity;
            return {snackbarProperties};
        })
    }

    snackbarClose = () => {
        this.setState(prevState => {
            let snackbarProperties = {...prevState.snackbarProperties}
            snackbarProperties.isOpen = false;
            snackbarProperties.message = "";
            snackbarProperties.severity = "";
            return {snackbarProperties};
        })
    }



    render() {
        return (
            <div className="container">
                <Button variant="contained"
                        color="secondary"
                        style={{float: "left"}}
                        onClick={this.toggleAddPeopleModal}
                        startIcon={<SvgIcon/>}>
                    Make An Application
                </Button>
                <Snackbar open={this.state.snackbarProperties.isOpen} autoHideDuration={5000} onClose={this.snackbarClose}
                          anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                    <Alert onClose={this.snackbarClose} severity={this.state.snackbarProperties.severity}>
                        {this.state.snackbarProperties.message}
                    </Alert>
                </Snackbar>
                <ReactDialog fields={this.peopleDialogFields} title="Application" isOpen={this.state.addPeopleModalOpen} onClose={this.toggleAddPeopleModal}
                             onSubmit={this.submitPeopleAdd}/>

            </div>
        );
    }
}