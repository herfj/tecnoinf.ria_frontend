import React, {useEffect, useState} from "react";
import './index.css'
import {Button, ButtonLink} from "../../components/button/Button";
import {EmailInput, PwdInput, TextInput, DateInput, NameInput, SurnameInput,Selectcountry} from "../../components/input/TextInput";
import {Form, actions} from "react-redux-form";
import {Link} from "react-router-dom";

const Register = ({}) => {

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
                <Link
                    className={''}
                    to={'/home'}
                    style={{
                        textDecoration: 'none',
                    }}
                >
                    <h1>DesignPro</h1>
                </Link>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div className={'register-wrapper'}>
                    <h1>Crear cuenta</h1>
                    <Form
                        model="login"
                        onSubmit={(values) => handleSubmit(values)}
                        >
                        <EmailInput/>
                        <div className={"register-content"}>
                            <div className={"content-left"}>
                                <NameInput/>
                            </div>
                            <div className={"content-der"}
                                 style={{marginLeft:"4%"}}>
                                <SurnameInput/>
                            </div>
                        </div>
                        <PwdInput style={{marginTop:12}}/>
                        <DateInput style={{marginTop:12}}/>
                        <Selectcountry style={{marginTop:12}}/>
                        {/*<EmailInput style={{marginTop: 10}}/>*/}
                        <Button
                            styleType={'primary'}
                            type="submit"
                            style={{marginTop: 20}}
                        >
                            Registrarme
                        </Button>

                    </Form>

                </div>
            </div>
        </>
    )
}

export default Register;