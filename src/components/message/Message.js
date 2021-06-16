import React, {useState, useEffect} from "react";
import {MessIcon} from "../icon/Icon";
import './index.css'
import {Message} from "../../scenes/message/Message";

const MessageItem = ({mess, open}) => {
    mess = mess.length > 60 ? mess.substring(0, 65) + '...' : mess

    return (
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
    )
}


const ShowMessage = ({subject,mess, date, sendByMe=false}) => {

    return (
        <>
            <h2 className={'sm-subject'}>{subject}</h2>
            <p className={'sm-data'}>Enviado por <strong>Tomba</strong>, el dia <strong>{date}</strong></p>
            <div className={'show-message'}>
                <p className={'sm-text'}>{mess}</p>
            </div>
        </>
    )
}


export {MessageItem, ShowMessage}