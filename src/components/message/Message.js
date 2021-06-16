import React, {useState, useEffect} from "react";
import {MessIcon} from "../icon/Icon";
import './index.css'
import {Link} from "react-router-dom";
import{Button} from "../button/Button";

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
        return (
            <>
                <h2 className={'sm-subject'}>{subject}</h2>
                <p className={'sm-data'}>Enviado por <strong>Tomba</strong>, el dia <strong>{date}</strong></p>
                <div className={'show-message'}>
                    <p className={'sm-text'}>{mess}</p>
                </div>
                <p><strong>Responder:</strong></p>
                <textarea></textarea>
                 <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>

                     {backButton}
                    <Button
                        styleType={'primary'}
                        style={{
                            width: 180
                        }}
                    >Enviar respuesta</Button>
                </div>
            </>
        )
    }
}


export {MessageItem, ShowMessage}