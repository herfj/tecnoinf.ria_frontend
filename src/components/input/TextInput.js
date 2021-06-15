import React, { Component } from "react";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";
import { Form, actions } from "react-redux-form";
import "./index.css";

import {required, minLength, maxLength, validEmail} from "../../helpers/formValidator";


const EmailInput = ({style}) => {
    return(
        <>

                    <Control.text
                        model=".email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        className="text-input"
                        style={style}
                        validators={{
                            required,
                            validEmail,
                        }}
                    />
                    <Errors
                        className="text-danger"
                        model=".email"
                        show="touched"
                        messages={{
                            required: "Requerido",
                            validEmail: " Email invalido",
                        }}
                    />

        </>
    )
}
const PwdInput = ({style}) => {
    return(
        <>

            <Control.text
                model=".pass"
                id="pass"
                name="pass"
                type="password"
                placeholder="Contraseña"
                className="pwd-input"
                style={style}
                validators={{
                    required,
                    validEmail,
                }}
            />
            <Errors
                className="text-danger"
                model=".pass"
                show="touched"
                messages={{
                    required: "Requerido",

                }}
            />

        </>
    )
}


export {EmailInput, PwdInput}