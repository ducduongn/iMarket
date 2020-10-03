import React, { useState } from 'react';

// Material UI
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link'


import { Link as RouteLink } from 'react-router-dom'

import { LOGIN_URL, SIGNUP_URL } from '../../router/urls';

import { validateAuthForm } from '../../utils/validates'

//Reducers 
import { CircularProgress } from '@material-ui/core';

//ReCaptcha
import ReCAPTCHA from 'react-google-recaptcha'

// Components
import AuthInput from './AuthInput';

const signupFields = ['firstName', 'lastName', 'email', 'password']
const loginFields = ['email', 'password']

const loginTexts = {
    submitLabel: "Sign in",
    checkBoxText: "Remember me",
    otherText: "Nead an account? Sign up",
    otherUrl: SIGNUP_URL
}

const signupTexts = {
    submitLabel: "Sign up",
    checkBoxText: "I want to receive inspiration, marketing promotions and updates via email.",
    otherText: "Already have an account? Sign in",
    otherUrl: LOGIN_URL
}

const initialShowErrorState = {}
const initialIsError = {}

signupFields.forEach(f => {
    initialShowErrorState[f] = { showError: false, helperText: 'This field is required' }
    initialIsError[f] = true
})


export default function MainForm(props) {

    const { signupPage, classes, onValidSubmit } = props
    const fields = signupPage ? signupFields : loginFields
    const texts = signupPage ? signupTexts : loginTexts

    // Track previous auth page
    // const refIsSignUp = React.useRef(signupPage)
    // Ref input component
    const refInputComp = React.useRef({
        password: null,
        email: null,
        firstName: null,
        lastName: null,
    })

    const [recaptcha, setRecaptcha] = useState({ loaded: false, expired: false, value: null })
    const handleCaptchaChange = value => {
        console.log("Captcha value:", value);
        if (value) {
            document.getElementById('iknown').style.borderStyle = "none"
        }
        setRecaptcha({ ...recaptcha, value })

    };

    //States
    // const [authInfo, setAuthInfo] = React.useState(initialAuthState)
    const [handleError, setError] = React.useState(initialShowErrorState)
    const isError = React.useRef(initialIsError)

    // Reset 
    const resetValue = () => {
        const inputComps = refInputComp.current;
        setError(() => ({
            ...initialShowErrorState,
        }))
        fields.forEach(inp => {
            if (inp !== 'email')
                inputComps[inp].value = ''
        })
        isError.current = { ...initialIsError }
        // refIsSignUp.current = signupPage
        // console.log(refInputComp)
    }

    const checkInput = (value, name) => {
        const helperText = validateAuthForm(value, name)
        const iserr = helperText !== ''
        if (isError.current[name] !== iserr || handleError[name].helperText != helperText) {
            isError.current[name] = iserr
            setError(prev => ({
                ...prev,
                [name]: { ...prev[name], helperText }
            }))
            if (!iserr) {
                showError(name)
            }
        }
        // console.log(`is error ${iserr}`)
        return iserr
    }

    const showError = (name) => {
        setError(prev => ({
            ...prev,
            [name]: { ...prev[name], showError: isError.current[name] }
        }))
    }

    const checkValid = () => {
        // console.log('check valid')
        let valid = true
        const validFormData = {}
        fields.forEach(f => {
            const { value, name } = refInputComp.current[f]
            if (checkInput(value, name))
                valid = false
            else {
                validFormData[name] = value
            }
            showError(name)
        })
        // if (signupPage && recaptcha.value == null) {
        //     valid = false
        //     document.getElementById('iknown').style.border = "2px solid red"
        // } else {
        //     validFormData['captcha_value'] = recaptcha.value
        // }
        if (valid) {
            onValidSubmit(validFormData, signupPage, onApiError)
        }
        // return { valid, validFormData, signup: signupPage }
    }

    // if (signupPage && !document.querySelector('#recaptcha-src')) {
    //     loadScript("https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit",
    //         document.querySelector('head'),
    //         'recaptcha-src',
    //         () => {
    //             recaptchaLoaded.current = true
    //             console.log('recapt loaded')
    //         }
    //     )
    // }

    //callback khi nhan error response tu server
    const onApiError = (authErrors) => {
        console.log("Run onApiError")
        console.log(authErrors)
        for (var key in authErrors) {
            if (key == 'activate') {
                alert(authErrors[key])
                return
            }
            // skip loop if the property is from prototype
            if (!authErrors.hasOwnProperty(key)) continue;
            console.log(key)
            handleError[key].helperText = authErrors[key][0]
            handleError[key].showError = true
            isError.current[key] = true
        }
        setError(handleError)

    }

    return (
        <form className={classes.form} onSubmit={e => e.preventDefault()}>
            <Grid container spacing={2}>
                {
                    fields.map((line) =>
                        (
                            <Grid item xs={12} sm={line == 'firstName' || line == 'lastName' ? 6 : 12} key={line}>
                                <AuthInput name={line}
                                    error={handleError[line].showError}
                                    helperText={handleError[line].helperText}
                                    checkInput={checkInput}
                                    inref={refInputComp.current}
                                // onFocus={authErrors && authErrors[line] ? () => { dispatch({ type: AUTH_ERROR_HANDLE }) } : null}
                                />
                            </Grid>
                        )
                    )
                }
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label={texts.checkBoxText}
                    />
                </Grid>
            </Grid>
            {/* <Input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response" />
            <Input type="hidden" name="action" value="validate_captcha" /> */}
            {/* <div className="g-recaptcha" data-sitekey="6LctIv4UAAAAAFz_rnIP9ltDPGkSmHjQ_R7F4fus"></div> */}
            {signupPage && <div id='iknown'>
                <ReCAPTCHA sitekey="6LctIv4UAAAAAFz_rnIP9ltDPGkSmHjQ_R7F4fus"
                    onChange={handleCaptchaChange}
                    asyncScriptOnLoad={() => { setRecaptcha({ loaded: true, expired: false }) }}
                />
            </div>}
            <Button
                type="submit" fullWidth variant="contained" color="primary" className={classes.submit}
                onClick={checkValid}
                disabled={props.isLoading || (signupPage && !recaptcha.loaded)}
            >
                {props.isLoading || (signupPage && !recaptcha.loaded) ? <CircularProgress color="white" /> : texts.submitLabel}

            </Button>
            <Grid container justify="flex-end">
                {!signupPage && <Grid item xs> <Link href="#" variant="body2"> Forgot password?</Link> </Grid>}
                <Grid item>
                    <RouteLink onClick={resetValue} to={texts.otherUrl + (props.next ? "?next=" + props.next : "")}>{texts.otherText}</RouteLink>
                </Grid>
            </Grid>
        </form >
    )
}



