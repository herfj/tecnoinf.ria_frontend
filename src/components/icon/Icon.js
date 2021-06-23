import React, {useState, useEffect} from "react";
import './index.css'

const UserIcon = ({ height='auto', name = '', img = null, size = 50, rounded = true}) => {
    if (rounded) {
        return (
        <>

                {
                    img ? (
                        <img className={'user-img'} src={img} alt={name} style={{
                            height: size,
                            width: size,
                            borderRadius: size,
                        }}/>
                    ) : (
                        <div className={'icon'} style={{
                            height: size,
                            width: size,
                            borderRadius: size,
                        }}>
                        <p className="far fa-user"></p>
                        </div>
                    )
                }
        </>
        )
    } else {
        return (
            <img className={'user-img'} src={img} alt={name} style={{
                height: height,
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