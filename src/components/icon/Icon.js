import React, {useState,useEffect} from "react";
import './index.css'

const UserIcon = ({})=>{
    const user= {
        img: 'https://placekitten.com/700/700',
        name: 'hola'
    }
    return (
        <div className={'user-icon'}>
            {
                user.img ? (
                    <img src={user.img} alt={user.name}/>
                ):(
                    <p className="far fa-user"></p>
                )
            }
        </div>
    )
}

export {UserIcon}