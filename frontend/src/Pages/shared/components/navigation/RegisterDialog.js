import React, { useState, useCallback, useRef, Fragment, useEffect } from 'react';

import PropTypes from 'prop-types';
import {
    FormHelperText,
    TextField,
    Button,
    Checkbox,
    Typography,
    FormControlLabel,
    withStyles,
} from '@material-ui/core';
import FormDialog from '../FormDialog';
import HighlightedInformation from '../HighlightedInformation';
import ButtonCircularProgress from '../ButtonCircularProgress';
import VisibilityPasswordTextField from '../VisibilityPasswordTextField';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { action } from '../../../../redux/store';
import { REGISTER } from '../../../../redux/auth/auth.types';

const styles = (theme) => ({
    link: {
        transition: theme.transitions.create(['background-color'], {
            duration: theme.transitions.duration.complex,
            easing: theme.transitions.easing.easeInOut,
        }),
        cursor: 'pointer',
        color: theme.palette.primary.main,
        '&:enabled:hover': {
            color: theme.palette.primary.dark,
        },
        '&:enabled:focus': {
            color: theme.palette.primary.dark,
        },
    },
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
});

function RegisterDialog(props) {
    const { setStatus, theme, onClose, openTermsDialog, status, classes, openLoginDialog } = props;
    const [hasTermsOfServiceError, setHasTermsOfServiceError] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const registerEmail = useRef();
    const registerTermsCheckbox = useRef();
    const registerPassword = useRef();
    const registerPasswordRepeat = useRef();
    const { isLoading, errors } = useSelector((state) => state.auth);

    const register = useCallback(() => {
        if (!registerTermsCheckbox.current.checked) {
            setHasTermsOfServiceError(true);
            return;
        }
        if (registerPassword.current.value !== registerPasswordRepeat.current.value) {
            setStatus({ ...status, password: 'passwordsDontMatch' });
            return;
        }
        action(REGISTER, {firstName: "", lastName: "", email: registerEmail.current.value, password: registerPassword.current.value})
        setStatus({});
    }, [setStatus, setHasTermsOfServiceError, registerPassword, registerPasswordRepeat, registerTermsCheckbox]);

    useEffect(() => {
        if (errors) {
            setStatus(errors);
        }
    }, [errors]);
    
    const helperTextPassword = (repeat) => () => {
        if ('password' in status) {
            if (repeat){
                if (status.password === 'passwordsDontMatch') {
                    return 'Your passwords dont match.';
                }
            } else {
                if (Array.isArray(status.password)) return status.password[0];
                if (status.password == 'passwordTooShort') {
                    return 'Create a password at least 6 characters long.';
                }    
            }
        }
        return null
    }

    return (
        <FormDialog
            loading={isLoading}
            onClose={onClose}
            open
            headline="Register"
            onFormSubmit={(e) => {
                e.preventDefault();
                register();
            }}
            hideBackdrop
            hasCloseIcon
            content={
                <Fragment>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        error={'email' in status}
                        label="Email Address"
                        autoFocus
                        autoComplete="off"
                        type="email"
                        onChange={() => {
                            if ('email' in status) {
                                delete status['email'];
                                setStatus({ ...status });
                            }
                        }}
                        helperText={(() => {
                            if ('email' in status) {
                                return status.email[0]
                            }
                            return null;
                        })()}
                        inputRef={registerEmail}
                        FormHelperTextProps={{ error: true }}
                    />
                    <VisibilityPasswordTextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        error={'password' in status}
                        label="Password"
                        inputRef={registerPassword}
                        autoComplete="off"
                        onChange={() => {
                            if ('password' in status) {
                                delete status['password'];
                                setStatus({ ...status });
                            }
                        }}
                        helperText={helperTextPassword(false)()}
                        FormHelperTextProps={{ error: true }}
                        isVisible={isPasswordVisible}
                        onVisibilityChange={setIsPasswordVisible}
                    />
                    <VisibilityPasswordTextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        error={status.password && status === 'passwordsDontMatch'}
                        label="Repeat Password"
                        inputRef={registerPasswordRepeat}
                        autoComplete="off"
                        onChange={() => {
                            if (status.password &&  status === 'passwordsDontMatch') {
                                setStatus({});
                            }
                        }}
                        helperText={helperTextPassword(true)()}
                        FormHelperTextProps={{ error: true }}
                        isVisible={isPasswordVisible}
                        onVisibilityChange={setIsPasswordVisible}
                    />
                    <FormControlLabel
                        style={{ marginRight: 0 }}
                        control={
                            <Checkbox
                                color="primary"
                                inputRef={registerTermsCheckbox}
                                onChange={() => {
                                    setHasTermsOfServiceError(false);
                                }}
                            />
                        }
                        label={
                            <Typography variant="body1">
                                I agree to the
                                <span
                                    className={classes.link}
                                    onClick={isLoading ? null : openTermsDialog}
                                    tabIndex={0}
                                    role="button"
                                    onKeyDown={(event) => {
                                        // For screenreaders listen to space and enter events
                                        if ((!isLoading && event.keyCode === 13) || event.keyCode === 32) {
                                            openTermsDialog();
                                        }
                                    }}
                                >
                                    {' '}
                                    terms of service
                                </span>
                            </Typography>
                        }
                    />
                    {hasTermsOfServiceError && (
                        <FormHelperText
                            error
                            style={{
                                display: 'block',
                                marginTop: theme.spacing(-1),
                            }}
                        >
                            In order to create an account, you have to accept our terms of service.
                        </FormHelperText>
                    )}
                    {status === 'accountCreated' ? (
                        <HighlightedInformation>
                            We have created your account. Please click on the link in the email we have sent to you
                            before logging in.
                        </HighlightedInformation>
                    ) : (
                        <HighlightedInformation>Registration is disabled until we go live.</HighlightedInformation>
                    )}
                </Fragment>
            }
            actions={
                <Fragment>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        color="secondary"
                        disabled={isLoading}
                    >
                        Register
                        {isLoading && <ButtonCircularProgress />}
                    </Button>
                    <Typography
                        align="center"
                        className={classNames(classes.forgotPassword, isLoading ? classes.disabledText : null)}
                        color="primary"
                        onClick={isLoading ? null : openLoginDialog}
                        tabIndex={0}
                        role="button"
                        onKeyDown={(event) => {
                            // For screenreaders listen to space and enter events
                            if ((!isLoading && event.keyCode === 13) || event.keyCode === 32) {
                                openLoginDialog();
                            }
                        }}
                    >
                        Login?
                    </Typography>
                </Fragment>
            }
        />
    );
}

RegisterDialog.propTypes = {
    theme: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    openTermsDialog: PropTypes.func.isRequired,
    status: PropTypes.string,
    setStatus: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(RegisterDialog);
