import React, {useEffect, useState} from "react";
import './index.css'
import {Button} from "../../components/button/Button";
import {EmailInput} from "../../components/input/TextInput";
import {Form, actions} from "react-redux-form";

const Login = ({}) => {

    const handleSubmit = (values) => {
        console.log("Current State is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(values));
        //this.props.resetFeedbackForm();
        // event.preventDefault();
        // this.props.postFeedback(
        //     values.firstname,
        //     values.lastname,
        //     values.telnum,
        //     values.email,
        //     values.agree,
        //     values.contactType,
        //     values.message
        // );
    }

    return (
        <>
            <div className={'pink-b'}>
                <h1>DesignPro</h1>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div className={'login-wrapper'}>
                    <h1>Login</h1>
                    <Form
                        model="login"
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        <EmailInput/>
                        {/*<EmailInput style={{marginTop: 10}}/>*/}
                        <Button
                            styleType={'primary'}
                            type="submit"
                            style={{marginTop: 20}}
                        >
                            Ingresar
                        </Button>

                    </Form>
                    <Button
                        style={{marginTop: 10}}
                    >
                        Registrarme
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Login;