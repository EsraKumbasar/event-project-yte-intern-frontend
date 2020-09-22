import React, {Component} from 'react';
import {TablePageController} from "./TablePageController";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHeader from "./TableHeader";
import TableContent from "./TableContent";

export default class PaginationTableForApplication extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 10,
            rows: []
        };
    }

    columns = [
        {id: 'peopleName', label: 'Name', minWidth: 170},
        {id: 'peopleSurname', label: 'Surname', minWidth: 170},
        {id: 'peopleTCNo', label: 'TCKN', minWidth: 170},
        {id: 'peopleEmail', label: 'E-mail', minWidth: 170},

    ];

    handleChangePage = (people, newPage) => {
        this.setState({page: newPage});
    };

    handleChangeRowsPerPage = (people) => {
        this.setState({
            rowsPerPage: people.target.value,
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
                                      columns={this.columns} onAddEvent={this.props.onAddEvent}/>
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