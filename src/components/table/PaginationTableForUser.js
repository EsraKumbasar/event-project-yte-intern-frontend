import React, {Component} from 'react';
import {TablePageController} from "./TablePageController";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHeader from "./TableHeader";
import TableContent from "./TableContent";


export default class PaginationTableForUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 10,
            rows: []
        };
    }

    columns = [
        {id: 'eventName', label: 'Event Name', minWidth: 170},
        {id: 'startDate', label: 'Start Date', minWidth: 170},
        {id: 'endDate', label: 'End Date', minWidth: 170},
        {id: 'eventNumber', label: 'Event Number', minWidth: 170},
    ];

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({
            rowsPerPage: event.target.value,
            page: 0
        });
    };

    render() {
        return (
            <Paper>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHeader columns={this.columns}/>
                        <TableContent rows={this.props.rows} page={this.state.page} rowsPerPage={this.state.rowsPerPage}
                                      columns={this.columns} />
                    </Table>
                </TableContainer>
                <TablePageController count={this.state.rows.length}
                                     rowsPerPage={this.state.rowsPerPage}
                                     page={this.state.page} handleChangePage={this.handleChangePage}
                                     handleChangeRowsPerPage={this.handleChangeRowsPerPage}/>
            </Paper>
        );
    }


}