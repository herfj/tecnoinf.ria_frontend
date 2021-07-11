import React from "react";
import {Control,  Errors} from "react-redux-form";
import "./index.css";

import {required, minLength, maxLength, validEmail} from "../../helpers/formValidator";

const TextInput = ({
                   style,
                   model = ".text",
                   id = "text",
                   name = "text",
                   placeholder = "",
                   className = "input",
                   validators = {
                       required,
                   },
                   messages = {
                       required: "Campo Requerido",
                   },
                   ...props
               }) => {
    return (
        <>
            <Control.text
                model={model}
                id={id}
                name={name}
                placeholder={placeholder}
                className={className}
                style={style}
                validators={validators}
                {...props}
            />
            <Errors
                className="text-danger"
                model={model}
                show="touched"
                messages={messages}
            />

        </>
    )
}
const Checkbox = ({style, value}) =>{
    return (
        <>
            <Control.text
                model={"."+value}
                id={'category'+value}
                name={'category'+value}
                value={value}
                type='checkbox'
                className="text-input"


            />
            <label style={style} htmlFor={value}>{value}</label>
        </>
    )
}

const FileInput = ({
                       place,
                       style,
                       name, value}) => {
    return(
        <>

            <Control.file
                model={"."+name}
                id={name}
                name={name}
                placeholder={place}
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

const EmailInput = ({style}) => {
    return (
        <>
            <TextInput
                model=".Email"
                id="Email"
                name="Email"
                placeholder="Email"
                className="input"
                style={style}
                validators={{
                    required,
                    validEmail,
                }}
                messages={{
                    required: "Email requerido",
                }}
            />
            <Errors
                className="text-danger"
                model=".Email"
                show="touched"
                messages={{
                    validEmail: "Email invalido",
                }}
            />
        </>
    )
}

const NameInput = ({style}) => {
    return (
        <TextInput
            model=".Nombre"
            id="Nombre"
            Name="Nombre"
            placeholder="Nombre"
            className="input"
            style={style}
            validators={{
                required,
            }}
            messages={{
                required: "Campo Requerido",
            }}
        />
    )
}

const SurnameInput = ({style}) => {
    return (
        <TextInput
            model=".Apellido"
            id="Apellido"
            name="Apellido"
            placeholder="Apellido"
            className="input"
            style={style}
            validators={{
                required,
            }}
            messages={{
                required: "Campo Requerido",
            }}
        />
    )
}

const PwdInput = ({style}) => {
    return (
        <TextInput
            model=".Password"
            id="Password"
            name="Password"
            type="password"
            placeholder="Contraseña"
            className="input"
            style={style}
            validators={{
                required,
            }}
            messages={{
                required: "Contraseña requerida",
            }}
        />
    )
}

const DateInput = ({
                       model = ".date",
                       id = "date",
                       name = "date",
                       placeholder = "Fecha",
                       className = "input",
                       style}) => {
    return (
        <TextInput
            model={model}
            id={id}
            name={name}
            placeholder={placeholder}
            className={className}
            type="date"
            style={style}
            validators={{
                required,
            }}
            messages={{
                required: "Requerido",

            }}
        />
    )
}

export {EmailInput,Checkbox, PwdInput, TextInput, DateInput, NameInput, SurnameInput, FileInput}