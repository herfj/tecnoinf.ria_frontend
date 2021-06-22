import React from "react";
import {Control, Errors} from "react-redux-form";
import "./index.css";

import {required, minLength, maxLength, validEmail} from "../../helpers/formValidator";

const TextArea = ({
                       style,
                       model = ".textarea",
                       id = "textarea",
                       name = "textarea",
                       placeholder = "",
                       className = "textarea",
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
            <Control.textarea
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

export default TextArea