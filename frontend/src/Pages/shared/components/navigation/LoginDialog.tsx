import React, { useState, useCallback, useRef, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { TextField, Button, Checkbox, Typography, FormControlLabel, withStyles } from '@material-ui/core';
import FormDialog from '../FormDialog';
import HighlightedInformation from '../HighlightedInformation';
import ButtonCircularProgress from '../ButtonCircularProgress';
import VisibilityPasswordTextField from '../VisibilityPasswordTextField';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/root-reducer';
import { AuthState } from '../../../../redux/auth/auth.d';
import { action } from '../../../../redux/store';
import { LOGIN } from '../../../../redux/auth/auth.types';

const styles = (theme) => ({
    forgotPassword: {
        marginTop: theme.spacing(2),
        color: theme.palette.primary.main,
        cursor: 'pointer',
        '&:enabled:hover': {
            color: theme.palette.primary.dark,
        },
        '&:enabled:focus': {
            color: theme.palette.primary.dark,
        },
    },
    disabledText: {
        cursor: 'auto',
        color: theme.palette.text.disabled,
    },
    formControlLabel: {
        marginRight: 0,
    },
});
type InputRef = {
    value: any;
};

function LoginDialog(props) {
    const { setStatus, history, classes, onClose, openChangePasswordDialog, openRegisterDialog, status } = props;
    const { isLoading, errors } = useSelector((state: RootState) => state.auth);
    // const [isLoading, setIsLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const loginEmail = useRef<InputRef>();
    const loginPassword = useRef<InputRef>();

    const login = useCallback(() => {
        // setIsLoading(true);
        // setStatus(null);
        action(LOGIN, { email: loginEmail.current.value, password: loginPassword.current.value });
        // if (loginEmail.current.value !== 'test@web.com') {
        //     setTimeout(() => {
        //         setStatus('invalidEmail');
        //         setIsLoading(false);
        //     }, 1500);
        // } else if (loginPassword.current.value !== 'HaRzwc') {
        //     setTimeout(() => {
        //         setStatus('invalidPassword');
        //         setIsLoading(false);
        //     }, 1500);
        // } else {
        //     setTimeout(() => {
        //         history.push('/c/dashboard');
        //     }, 150);
        // }
    }, [loginEmail, loginPassword, history, setStatus]);

    useEffect(() => {
        if (errors) {
            setStatus(errors);
        }
    }, [errors]);

    return (
        <Fragment>
            <FormDialog
                open
                onClose={onClose}
                loading={isLoading}
                onFormSubmit={(e) => {
                    e.preventDefault();
                    login();
                }}
                hideBackdrop
                headline="Login"
                content={
                    <Fragment>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            error={'email' in status}
                            required
                            fullWidth
                            label="Email Address"
                            inputRef={loginEmail}
                            autoFocus
                            autoComplete="off"
                            type="email"
                            onChange={() => {
                                if ('email' in status) {
                                    delete status['email'];
                                    const newStatus = { ...status };
                                    setStatus(newStatus);
                                }
                            }}
                            helperText={'email' in status && "This email address isn't associated with an account."}
                            FormHelperTextProps={{ error: true }}
                        />
                        <VisibilityPasswordTextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            error={'password' in status}
                            label="Password"
                            inputRef={loginPassword}
                            autoComplete="off"
                            onChange={() => {
                                if ('password' in status) {
                                    delete status['password'];
                                    const newStatus = { ...status };
                                    setStatus(newStatus);
                                }
                            }}
                            helperText={
                                'password' in status ? (
                                    <span>
                                        Incorrect password. Try again, or click on <b>&quot;Forgot Password?&quot;</b>{' '}
                                        to reset it.
                                    </span>
                                ) : (
                                    ''
                                )
                            }
                            FormHelperTextProps={{ error: true }}
                            onVisibilityChange={setIsPasswordVisible}
                            isVisible={isPasswordVisible}
                        />
                        <FormControlLabel
                            className={classes.formControlLabel}
                            control={<Checkbox color="primary" />}
                            label={<Typography variant="body1">Remember me</Typography>}
                        />
                        {status === 'verificationEmailSend' ? (
                            <HighlightedInformation>
                                We have send instructions on how to reset your password to your email address
                            </HighlightedInformation>
                        ) : (
                            <HighlightedInformation>
                                Email is: <b>admin@email.com</b>
                                <br />
                                Password is: <b>123456</b>
                            </HighlightedInformation>
                        )}
                    </Fragment>
                }
                actions={
                    <Fragment>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            disabled={isLoading}
                            size="large"
                        >
                            Login
                            {isLoading && <ButtonCircularProgress />}
                        </Button>
                        <Typography
                            align="center"
                            className={classNames(classes.forgotPassword, isLoading ? classes.disabledText : null)}
                            color="primary"
                            onClick={isLoading ? null : openChangePasswordDialog}
                            tabIndex={0}
                            role="button"
                            onKeyDown={(event) => {
                                // For screenreaders listen to space and enter events
                                if ((!isLoading && event.keyCode === 13) || event.keyCode === 32) {
                                    openChangePasswordDialog();
                                }
                            }}
                        >
                            Forgot Password?
                        </Typography>
                        <Typography
                            align="center"
                            className={classNames(classes.forgotPassword, isLoading ? classes.disabledText : null)}
                            color="primary"
                            onClick={isLoading ? null : openRegisterDialog}
                            tabIndex={0}
                            role="button"
                            onKeyDown={(event) => {
                                // For screenreaders listen to space and enter events
                                if ((!isLoading && event.keyCode === 13) || event.keyCode === 32) {
                                    openRegisterDialog();
                                }
                            }}
                        >
                            Sign up?
                        </Typography>
                    </Fragment>
                }
            />
        </Fragment>
    );
}

LoginDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    setStatus: PropTypes.func.isRequired,
    openChangePasswordDialog: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    status: PropTypes.string,
};

export default withRouter(withStyles(styles)(LoginDialog));
