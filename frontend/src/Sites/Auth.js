import React from 'react';
import { useDispatch, useSelector } from 'react-redux'

// Material UI Style
import { makeStyles } from '@material-ui/core';

// Material UI Components
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';



// Icons
import { CircularProgress } from '@material-ui/core';

//Reducers 
import { login, loadUser, signUp } from '../redux/reducers/auth'

// Router
import { Redirect } from 'react-router-dom'


// Components
import MainForm from '../component/auth/Form'
import Copyright from '../component/layout/Copyright';

import qs from 'qs'


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

/**
 * Form login and signup
 * @param {*} props 
 */
export default function AuthForm(props) {
    console.log("Run Auth Site")

    const GET_params = qs.parse(props.location.search, { ignoreQueryPrefix: true })
    const classes = useStyles();
    const auth = useSelector(state => state.auth)

    const isSignUp = props.match.params.subpath == "signup"

    const dispatch = useDispatch()
    console.log(dispatch)
    const loginAction = login(dispatch)
    const signupAction = signUp(dispatch)
    const loadUserAction = loadUser(dispatch)

    if (auth.token && !auth.isAuthenticated && !auth.isLoading) {
        loadUserAction()
        return (
            <div>
                <CircularProgress />
            </div>
        )
    } else if (auth.isAuthenticated && auth.user.is_verified) {
        //Chuyển hướng đến trang yêu cầu nếu đã đăng nhập
        return <Redirect to={GET_params.next ? GET_params.next : "/"} />
    }

    const onValidSubmit = (validFormData, isSignUp, callback) => {
        console.log(validFormData)
        console.log(isSignUp)
        if (!isSignUp)
            loginAction(validFormData, callback)
        else
            signupAction(validFormData, callback)
    }
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {isSignUp ? "Sign up" : "Sign in"}
                </Typography>
                {
                    (auth.isAuthenticated && !auth.user.is_verified) ?
                        <form className={classes.form}>
                            <Grid container spacing={2} justify="center">
                                <Grid item xs={12} sm={6} >
                                    <TextField variant='outlined' label='Enter your verify code'></TextField>
                                </Grid>
                            </Grid>
                        </form>
                        :
                        <MainForm classes={classes} signupPage={isSignUp} onValidSubmit={onValidSubmit} isLoading={auth.isLoading} next={GET_params.next} />
                }
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container >
    );
}