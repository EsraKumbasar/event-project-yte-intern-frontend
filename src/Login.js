import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AuthService from "./AuthService";
import userInit from "./userReducer";
import axios from "axios";

class Login extends React.Component {

    constructor() {
        super();

        this.state = {
            username: "",
            password : "",
        }
    }

    usernameChanged(e) {
        this.setState({
            username: e.target.value
        })
    }

    passwordChanged(e) {
        this.setState({
            password: e.target.value
        })
    }

    onUserClick() {
       return  AuthService.login(this.state.username,this.state.password)
            .then(() => {this.props.history.push("/dashboard")}),
            (error) => {alert("Authentication failure")};
    }

    render() {
        return(
            <React.Fragment>
                <AppBar position="static">

                </AppBar>
                <Container maxWidth="sm">
                    <Typography variant="h4" style={styles.center}>Login</Typography>
                    <form>
                        <Typography variant="h4" style={styles.notification}>{this.state.message}</Typography>
                        <TextField type="text" label="USERNAME" fullWidth margin="normal" name="username" onUserClick={this.state.username} />

                        <TextField type="password" label="PASSWORD" fullWidth margin="normal" name="password" onUserClick={this.state.password}/>

                        <Button variant="contained" color="secondary" onClick={this.login}>Login</Button>
                    </form>
                </Container>
            </React.Fragment>
        )
    }

}

const styles= {
    center :{
        display: 'flex',
        justifyContent: 'center'

    },
    notification: {
        display: 'flex',
        justifyContent: 'center',
        color: '#dc3545'
    }
}

export default Login;