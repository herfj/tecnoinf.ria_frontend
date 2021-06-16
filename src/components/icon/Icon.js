import React, {useState, useEffect} from "react";
import './index.css'

const UserIcon = ({name = '', img = null, size = 50, rounded = true}) => {
    if (rounded) {
        return (
            <div className={'icon'} style={{
                height: size,
                width: size,
                borderRadius: size,
            }}>
                {
                    img ? (
                        <img src={img} alt={name} style={{
                            height: size,
                            width: size,
                            borderRadius: size,
                        }}/>
                    ) : (
                        <p className="far fa-user"></p>
                    )
                }
            </div>
        )
    } else {
        return (
            <img className={'user-img'} src={img} alt={name} style={{
                height: 'auto',
                width: size,
            }}/>
        )
    }
}

const MessIcon = ({open = false, size,}) => {
    return (
        <div className={'icon'} style={{
            height: size,
            width: size,
            borderRadius: 10,
        }}>
            {
                open ? (
                    <p className="far fa-envelope-open"></p>
                ) : (
                    <p className="far fa-envelope"></p>
                )
            }
        </div>
    )
}

export
{
    UserIcon,
    MessIcon
}