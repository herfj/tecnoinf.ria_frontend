import React, {useState, useEffect} from "react";
import {MessIcon} from "../icon/Icon";
import './index.css'

const Message = ({mess, open}) => {
    mess = mess.length > 60 ? mess.substring(0,65) + '...' : mess

    return (
        <div className={'message'}>
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


export {Message}