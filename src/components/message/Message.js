import React, {useState, useEffect} from "react";
import {MessIcon} from "../icon/Icon";
import './index.css'
import {Link} from "react-router-dom";
import {Button} from "../button/Button";
import {EmailInput, TextInput} from "../forms/TextInput";
import {SelectCountry} from "../forms/Select";
import {Control, LocalForm, Errors} from "react-redux-form";
import {required} from "../../helpers/formValidator";
import TextArea from "../forms/TextArea";

const MessageItem = ({mess, open, to}) => {
    mess = mess.length > 60 ? mess.substring(0, 65) + '...' : mess

    return (
        <Link
            to={to}
        >
            <div className={'message-item'}>
                <div className={'m-icon'}>
                    <MessIcon
                        open={open}
                    />
                </div>
                <div className={'m-mess'}>
                    <strong style={{marginBottom: 10}}>Tomas Baute</strong>
                    <p>{mess}</p>
                </div>
            </div>
        </Link>
    )
}

const ShowMessage = ({subject, mess, date, sendByMe = false, backButton}) => {

    if (sendByMe) {
        return (
            <>
                <h2 className={'sm-subject'}>{subject}</h2>
                <p className={'sm-data'}>Enviado el dia <strong>{date}</strong></p>
                <div className={'show-message'}>
                    <p className={'sm-text'}>{mess}</p>
                </div>
                {backButton}
            </>
        )
    } else {
        const handleSubmit = (values) => {

        }
        return (
            <>
                <h2 className={'sm-subject'}>{subject}</h2>
                <p className={'sm-data'}>Enviado por <strong>Tomba</strong>, el dia <strong>{date}</strong></p>
                <div className={'show-message'}>
                    <p className={'sm-text'}>{mess}</p>
                </div>
                <p><strong>Responder:</strong></p>
                <LocalForm
                    onSubmit={(values) => handleSubmit(values)}
                >

                    <TextArea></TextArea>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 12}}>
                        {backButton}
                        <Button
                            styleType={'primary'}
                            style={{
                                width: 180
                            }}
                        >Enviar respuesta</Button>
                    </div>
                </LocalForm>
            </>
        )
    }
}

const WriteMessage = ({backButton}) => {
    const handleSubmit = (values) => {

    }
    return (
        <LocalForm
            onSubmit={(values) => handleSubmit(values)}
        >
            <p><strong>Para:</strong></p>
            {/*<SelectCountry/>*/}
            <EmailInput/>
            <p><strong>Asunto:</strong></p>
            <TextInput
                model=".subject"
                id="subject"
                name="subject"
                placeholder="Asunto"
                validators={{
                    required,
                }}
                messages={{
                    required: "Asunto Requerido",
                }}
            />
            <p><strong>Mensaje:</strong></p>
            <TextArea
                model=".message"
                id="message"
                name="message"
                placeholder="Mensaje"
                validators={{
                    required,
                }}
                messages={{
                    required: "Mensaje Requerido",
                }}
            />
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 12}}>
                    {backButton}
                <Button
                    styleType={'primary'}
                    style={{
                        width: 180
                    }}
                >Enviar mensaje</Button>
            </div>
        </LocalForm>
    )
}

export {MessageItem, ShowMessage, WriteMessage}