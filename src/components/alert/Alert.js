import React from 'react'
import './index.css'

const Alert = ({type="success",children}) =>{
    return (
        <div className={'alert '+type}>
            {children}
        </div>
    )
}

export default Alert;