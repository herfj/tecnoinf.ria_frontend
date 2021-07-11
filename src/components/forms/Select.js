import {Control, Errors} from "react-redux-form";
import {required, minLength, maxLength, validEmail} from "../../helpers/formValidator";
import {country_list} from "../../helpers/consts";
import React from "react";
import "./index.css";

const Select = ({
                    style,
                    list = [],
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
            <Control.select
                model={model}
                id={id}
                name={name}
                placeholder={placeholder}
                className={className}
                style={style}
                validators={validators}
                {...props}
            >
                <option value="" disabled selected>Seleccione una opción</option>
                {list.map((o) => (<option value={o}>{o}</option>))}
            </Control.select>
            <Errors
                className="text-danger"
                model={model}
                show="touched"
                messages={messages}
            />
        </>
    )
}

const SelectCountry = ({style,...props}) => {
    return (
            <Select
                list={country_list}
                model=".Pais"
                id="Pais"
                name="Pais"
                placeholder="Pais de nacimiento"
                style={style}
                validators={{
                    required,
                }}
                messages={{
                    required: "Debe seleccionar una opción",
                }}
                {...props}
            />
    )
}

export {Select,SelectCountry}
