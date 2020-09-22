import React, { Component } from "react";

import UserService from "../services/user.service";
import axios from "axios";
import Button from "@material-ui/core/Button";
import PlusIcon from "@material-ui/icons/Add";
import ReactDialog from "../components/common/ReactDialog";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import PaginationTable from "../components/table/PaginationTable";
import authHeader from "../services/auth-header";


export default class BoardAdmin extends Component {



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
        UserService.getAdminBoard().then(
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
        axios.get("api/test/list", { headers: authHeader() })
            .then(response => {
                this.setState({rows: response.data})
            })
    }

    eventDialogFields = [
        {id: "eventName", label: "Event Name", type: "text"},
        {id: "startDate", label: " ", type: "date"},
        {id: "endDate", label: " ", type: "date"},
        {id: "eventNumber", label: "Event Number", type: "text"},
        {id: "quota", label: "Quota", type: "long"},
    ]

    eventUpdateDialogFields = [
        {id: "eventName", label: "Event Name", type: "text"},
        {id: "startDate", label: " ", type: "date"},
        {id: "endDate", label: " ", type: "date"},
        {id: "eventNumber", label: "Event Number", type: "text"},
        {id: "quota", label: "Quota", type: "long"},
    ]


    toggleAddEventModal = () => {
        this.setState({addEventModalOpen: !this.state.addEventModalOpen})
    }

    toggleUpdateEventModal = () => {
        this.setState({updateEventModalOpen: !this.state.updateEventModalOpen})
    }

  /*  submitEventAdd = (inputData) => {
        this.toggleAddEventModal();
        EventService.addEvent(inputData)
            .then(response => {
                this.setState(prevState => (
                    {rows: [...prevState.rows, response.data]}
                ));
                this.snackbarOpen("Event has been added successfully!", "success");
            })
            .catch(error => {
                if (error.response.status === 400) {
                    this.snackbarOpen(error.response.data.errors[0].defaultMessage, "error")
                }
                console.log(error.response);
            })
    } */

    submitEventAdd = (inputData) => {
        this.toggleAddEventModal();
        axios.post("/api/test/admin/add", inputData, { headers: authHeader() })
            .then(response => {
                this.setState(prevState => (
                    {rows: [...prevState.rows, response.data]}
                ));
                this.snackbarOpen("Event has been added successfully!", "success");
            })
            .catch(error => {
                if (error.response.status === 400) {
                    this.snackbarOpen(error.response.data.errors[0].defaultMessage, "error")
                }
                console.log(error.response);
            })
    }


    submitEventUpdate = (inputData) => {
        this.toggleUpdateEventModal();
        axios.put("/api/test/admin/" + inputData.eventNumber, inputData, { headers: authHeader() })
            .then(response => {
                this.setState(prevState => (
                    {row: [prevState.row, response.data]}
                ));
                this.snackbarOpen("Event has been updated successfully!", "success");
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

    onEventDelete = (eventNumber) => {
        axios.delete("/api/test/" + eventNumber,{ headers: authHeader() })
            .then(response => {
                this.setState( {
                    rows: this.state.rows.filter((event) => event.eventNumber !== eventNumber)
                })
                this.snackbarOpen("Event with event number " + eventNumber + " has been deleted!", "success")
            })
    }


    onAddQuestion = (inputData) => {
        axios.post("/events/" + inputData.eventNumber + "/question", inputData)
            .then(response => {
                this.snackbarOpen("Question has been added successfully!", "success");
            })
            .catch(error => {
                if (error.response.status === 400) {
                    this.snackbarOpen(error.response.data.errors[0].defaultMessage, "error")
                }
                console.log(error.response);
            })
    }

    render() {
        return (
            <div className="container">
                <Button variant="contained"
                        color="purple"
                        style={{float: "right"}}
                        onClick={this.toggleAddEventModal}
                        startIcon={<PlusIcon/>}>
                    Add event
                </Button>
                <Snackbar open={this.state.snackbarProperties.isOpen} autoHideDuration={5000} onClose={this.snackbarClose}
                          anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                    <Alert onClose={this.snackbarClose} severity={this.state.snackbarProperties.severity}>
                        {this.state.snackbarProperties.message}
                    </Alert>
                </Snackbar>
                <ReactDialog fields={this.eventDialogFields} title="Add Event" isOpen={this.state.addEventModalOpen} onClose={this.toggleAddEventModal}
                             onSubmit={this.submitEventAdd}/>
                <ReactDialog fields={this.eventUpdateDialogFields} title="Update Event" isOpen={this.state.updateEventModalOpen} onClose={this.toggleUpdateEventModal}
                             onSubmit={this.submitEventUpdate}/>
                <PaginationTable rows={this.state.rows} onUpdate={this.submitEventUpdate} onDelete={this.onEventDelete} onAddPeople={this.onAddQuestion}/>

            </div>
        );
    }
}