import React, {Component} from "react";
import {Control, LocalForm, Errors} from "react-redux-form";
import {Link} from "react-router-dom";
import {Form, actions} from "react-redux-form";
import "./index.css";

import {required, minLength, maxLength, validEmail} from "../../helpers/formValidator";
import {country_list} from "../../helpers/consts";
const EmailInput = ({style}) => {
    return (
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
                    required: "Email requerido",
                }}
            />
            <Errors
                className="text-danger"
                model=".email"
                show="touched"
                messages={{
                    validEmail: "Email invalido",
                }}
            />
        </>
    )
}
const NameInput = ({style, value}) => {
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
const SurnameInput = ({style, value}) => {
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
const FileInput = ({place ,style, name, value}) => {
    return(
        <>

            <Control.text
                model={"."+name}
                id={name}
                name={name}
                placeholder={place}
                type='file'
                className="text-input"
                style={style}

            />
            <Errors
                className="text-danger"
                model={"."+name}
                show="touched"
            />

        </>
    )
}
const Input = ({place ,style, name, value}) => {
    return(
        <>

            <Control.text
                model={"."+name}
                id={name}
                name={name}
                placeholder={place}
                type="password"
                className="text-input"
                style={style}

            />
            <Errors
                className="text-danger"
                model={"."+name}
                show="touched"
            />

        </>
    )
}
const PwdInput = ({style}) => {
    return (
        <>
            <Control.text
                model=".pwd"
                id="pwd"
                name="pwd"
                type="password"
                placeholder="Contraseña"
                className="pwd-input"
                style={style}
                validators={{
                    required,
                }}
            />
            <Errors
                className="text-danger"
                model=".pwd"
                show="touched"
                messages={{
                    required: "Contraseña requerida",
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
const SelectCountry = ({style, value}) => {
    return(
        <>

            <Control.select
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
                >
                <option value="" disabled selected>{value? value : 'Seleccione un pais'}</option>
                {country_list.map((c)=>(<option value={c}>{c}</option>))}
            </Control.select>
            <Errors
                className="text-danger"
                model=".country"
                show="touched"
                messages={{
                    required: "Debe seleccionar una opción",

                }}
            />

        </>
    )
}


export {EmailInput, PwdInput, Input, DateInput, NameInput,SurnameInput, SelectCountry}