import React, {Component, useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import './index.css';

const Button = ({type = '', children, style = {}, ...props}) => {
    const [touched, setTouched] = useState(false)

    const toggleTouched = () => {
        setTouched(!touched);
    }

    const handleMouseUp = () => {
        setTimeout(() => {
            setTouched(false)
        }, 150);
    }

    const classBase = 'btn ' + type;
    const className = touched ? classBase + ' touched' : classBase;
    return (
        <button
            className={className}
            onMouseDown={toggleTouched}
            onMouseUp={handleMouseUp}
            style={style}
            {...props}
        >
            {children}
        </button>
    )
}

const ButtonLink = ({to, children, style = {}, ...props}) => {
    return (
        <Link
            to={to}
        >
            <Button
                style={style}
                {...props}
            >
                {children}
            </Button>
        </Link>
    )
}

const SelectButton = ({list,callback,...props}) => {

    const [value, setValue] = useState(list[0])

    useEffect(()=>{
        callback(value)
    },[value])

    return (
        <Button
            {...props}
        >
            <select>
                {
                    list.map((op) => {
                        return (
                            <option onClick={() =>{
                                setValue(op)
                            }}>{op}</option>
                        )
                    })
                }
            </select>
        </Button>

    )
}

export {Button, ButtonLink, SelectButton};