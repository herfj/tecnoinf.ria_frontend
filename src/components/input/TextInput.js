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
const NameInput = ({style}) => {
    return(
        <>

            <Control.text
                model=".name"
                id="name"
                name="name"
                placeholder="Nombre"
                className="text-input"
                style={style}
                validators={{
                    required,
                }}
            />
            <Errors
                className="text-danger"
                model=".name"
                show="touched"
                messages={{
                    required: "Requerido",
                }}
            />

        </>
    )
}
const SurnameInput = ({style}) => {
    return(
        <>

            <Control.text
                model=".surname"
                id="surname"
                name="surname"
                placeholder="Apellido"
                className="text-input"
                style={style}
                validators={{
                    required,
                }}
            />
            <Errors
                className="text-danger"
                model=".surname"
                show="touched"
                messages={{
                    required: "Requerido",
                }}
            />

        </>
    )
}
const TextInput = ({style}) => {
    return(
        <>

            <Control.text
                model=".text"
                id="text"
                name="text"
                placeholder=""
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
const DateInput = ({style}) => {
    return(
        <>

            <Control.text
                model=".date"
                id="date"
                name="date"
                placeholder="Fecha de nacimiento"
                className="text-input"
                type="date"
                style={style}
                validators={{
                    required,

                }}
            />
            <Errors
                className="text-danger"
                model=".date"
                show="touched"
                messages={{
                    required: "Requerido",

                }}
            />

        </>
    )
}
const Selectcountry = ({style}) => {
    return(
        <>

            <Control.text
                model=".country"
                id="country"
                name="country"
                placeholder="Pais de nacimiento"
                className="text-input"
                type="select"
                style={style}
                validators={{
                    required,
                }}
            />
            <Errors
                className="text-danger"
                model=".country"
                show="touched"
                messages={{
                    required: "Debe seleccionar una opcion",

                }}
            />

        </>
    )
}


export {EmailInput, PwdInput, TextInput, DateInput, NameInput,SurnameInput, Selectcountry}