import React from "react";
import {Button, Grid, TextField} from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {setAdminStatus, setLoading, setLoggedIn, setUserInfo, showToast} from "./App";
import axios from "axios";

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const COOKIE_AGE=31536000

function Login() {

    var [state, setState] = React.useState({
        email: null,
        password: null,
    });

    var [response, setResp] = React.useState({
        ResponseCode: 0,
        ResponseDesc: null,
        ResponseStatus: null,
        UserId: null,
        Username: null,
        Email: null,
        Mobile: null,
        Gender: null,
        UserTypeId: null
    });

    const onTextChange = (event) => {
        const value = event.target.value;
        setState({
            ...state,
            [event.target.name]: value,
        });
        console.log(event.target.value);
    };

    function logIn() {
        const email = state.email;
        const password = state.password;


        console.log("login req: ", "email ", email, "password ", password);


        setLoading(true);
        axios.post(`/api/signIn`,{
            EMAIL: email,
            PASSWORD: password
        }).then(res=>{
            setLoading(false);
            if (res.data.ResponseCode !== 0) {
                showToast(" Logged in successfully");
                setLoggedIn(true);
                cookies.set('auth',JSON.stringify(res.data),{ path: '/', maxAge: COOKIE_AGE })
                setUserInfo(res.data);
            } else {
                showToast(" Login failed");
            }
            console.log(res.data)
        }).catch(err=>{
            setLoading(false);
            console.log(err)
        })


        // const requestOptions = {
        //     method: "POST",
        //     headers: {"Content-Type": "application/json"},
        //     body: JSON.stringify({
        //         EMAIL: email,
        //         PASSWORD: password
        //     }),
        // };
        //
        // setLoading(true);
        // showToast("Logging in...");
        // fetch("/api/signIn", requestOptions)
        //     .then((res) => res.json())
        //     .then((response) => setResp(response))
        //     .then(() => {
        //         console.log(response)
        //         setLoading(false);
        //         if (response.ResponseCode !== 0) {
        //
        //             showToast(" Logged in successfully");
        //             setLoggedIn(true);
        //             setUserInfo(response);
        //         } else {
        //             showToast(" Login failed");
        //         }
        //
        //     })
    }

    return (

        <div style={{backgroundColor: "#F3F4F8"}}>
            <Grid container spacing={1} padding={1}>

                <Grid item xs={1} md={3}></Grid>
                <Grid marginTop={4} marginBottom={3} item xs={10} md={6}>
                    <center>
                        <Card style={{
                            padding: '20px',
                            boxSizing: 'content-box',
                        }} elevation={0}>

                            <Grid item xs={0} md={4}></Grid>

                            <Grid item xs={12} md={12}>
                            </Grid>
                            <Grid item xs={0} md={4}>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <TextField
                                    onChange={onTextChange}
                                    value={state.description}
                                    style={{backgroundColor: "white"}}
                                    name="email"
                                    fullWidth
                                    id="outlined-basic"
                                    label="E-mail"
                                    variant="outlined"/>
                            </Grid>

                            <Grid item xs={0} md={4}></Grid>

                            <Grid item xs={0} md={4}></Grid>

                            <Grid item xs={12} md={12}>
                            </Grid>
                            <Grid item xs={0} md={4}>
                            </Grid>

                            <Grid paddingTop={2} item xs={12} md={4}>
                                <TextField
                                    onChange={onTextChange}
                                    value={state.description}
                                    style={{backgroundColor: "white"}}
                                    name="password"
                                    fullWidth
                                    id="outlined-basic"
                                    label="Password"
                                    variant="outlined"/>
                            </Grid>

                            <Grid item xs={0} md={4}></Grid>

                            <Grid item xs={0} md={4}></Grid>

                            <Grid paddingTop={3} item xs={12} md={4}>
                                <center>
                                    <Button
                                        onClick={logIn}
                                        variant="contained"
                                        id="showAllBooksBtn"
                                        disableElevation>
                                        Log in
                                    </Button>
                                </center>
                            </Grid>
                            <Grid item xs={0} md={4}></Grid>
                        </Card>
                    </center>
                </Grid>
                <Grid item xs={1} md={3}></Grid>


            </Grid>
        </div>

    )
}

export default Login;