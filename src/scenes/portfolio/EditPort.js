import React, {useEffect, useState} from "react";
import './index.css'
import {Button, ButtonLink} from "../../components/button/Button";

import {EmailInput, PwdInput, DateInput, NameInput, SurnameInput, FileInput} from "../../components/forms/TextInput";
import {Form, actions} from "react-redux-form";
import {SelectCountry} from "../../components/forms/Select";
import {Link} from "react-router-dom";
import {required} from "../../helpers/formValidator";
import {TextInput} from "../../components/forms/TextInput";
import {UserIcon} from "../../components/icon/Icon";
import {useWindowSize} from "../../helpers/useWindowSize";
import Container from "../../components/container/Container";


const EditPort = ({id}) => {
    const size = useWindowSize();
    const handleSubmit = (values) => {
        console.log("Current State is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(values));
        //this.props.resetFeedbackForm();
        // event.preventDefault();
        // this.props.postFeedback(
        //     values.firstname,
        //     values.lastname,
        //     values.telnum,
        //     values.email,
        //     values.agree,
        //     values.contactType,
        //     values.message
        // );
    }
const portf = {
    img: 'https://placekitten.com/1200/800',
    text: "este es el texto de esta paginita del portfolio amigo"
}

    return (

        <Container  searchbar={
            false
        }>
        <div className={'page-index'}>
            <div className={"page-image"}>
                <img alt="" src={portf.img} className={'page-img'}/>
            </div>
            <div className={"page-text"}>
                {portf.text}
            </div>
            <div className={"page-delete"}>
                { portf.img && <Button
                    style={{marginTop:'20%'}}
                    styleType={'primary'}
                >Borrar imagen</Button>}
                { portf.text && <Button
                    style={{marginTop:'20%'}}
                    styleType={'primary'}
                >Borrar Texto</Button>}
                <Button
                    style={{marginTop:'20%'}}
                    styleType={'primary'}
                >Borrar pagina</Button>
            </div>
        </div>
            <div className={'page-index'}
                 style={{marginTop:'3%'}}
            >
                <div className={"page-image"}>
                    <img alt="" src={portf.img} className={'page-img'}/>
                </div>
                <div className={"page-text"}>
                    {portf.text}
                </div>
                <div className={"page-delete"}>
                    { portf.img && <Button
                        style={{marginTop:'20%'}}
                        styleType={'primary'}
                    >Borrar imagen</Button>}
                    { portf.text && <Button
                        style={{marginTop:'20%'}}
                        styleType={'primary'}
                    >Borrar Texto</Button>}
                    <Button
                        style={{marginTop:'20%'}}
                        styleType={'primary'}
                    >Borrar pagina</Button>
                </div>
            </div>
            <div className={'page-index'}
                 style={{marginTop:'3%'}}
            >
                <div className={"page-image"}>
                    <img alt="" src={portf.img} className={'page-img'}/>
                </div>
                <div className={"page-text"}>
                    {portf.text}
                </div>
                <div className={"page-delete"}>
                    { portf.img && <Button
                        style={{marginTop:'20%'}}
                        styleType={'primary'}
                    >Borrar imagen</Button>}
                    { portf.text && <Button
                        style={{marginTop:'20%'}}
                        styleType={'primary'}
                    >Borrar Texto</Button>}
                    <Button
                        style={{marginTop:'20%'}}
                        styleType={'primary'}
                    >Borrar pagina</Button>
                </div>
            </div>
            <div className={'page-index'}
                 style={{marginTop:'3%'}}
            >
                <div className={"page-image"}>
                    <img alt="" src={portf.img} className={'page-img'}/>
                </div>
                <div className={"page-text"}>
                    {portf.text}
                </div>
                <div className={"page-delete"}>
                    { portf.img && <Button
                        style={{marginTop:'20%'}}
                        styleType={'primary'}
                    >Borrar imagen</Button>}
                    { portf.text && <Button
                        style={{marginTop:'20%'}}
                        styleType={'primary'}
                    >Borrar Texto</Button>}
                    <Button
                        style={{marginTop:'20%'}}
                        styleType={'primary'}
                    >Borrar pagina</Button>
                </div>
            </div>
        </Container>


    )
}

export default EditPort;