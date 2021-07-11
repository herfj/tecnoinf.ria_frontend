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

const [baseImage, setBaseImage] = useState("");

const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
};

const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

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
    const page= {
        img: 'https://placekitten.com/1200/800',
        text: "este es el texto de esta paginita del portfolio amigo"
    }

    return (
        <Container searchbar={false}>
            <div className={'page-index'}>
                <div className={"page-image"}>
                    {page.img? <FileInput/> : ''}
                </div>
                <div className={"page-text"}>
                    {page.img? <img alt="" src={page.img} className={'page-img'}/> : <TextInput placeholder={page.text}/>}
                </div>
                <div className={"page-delete"}>
                    <Button
                        style={{marginTop: '20%'}}
                        styleType={'primary'}
                    >{page.img? 'editar imagen':'editar texto'}</Button>
                    <Button
                        style={{marginTop: '20%'}}
                        styleType={'primary'}
                    >Borrar pagina</Button>
                </div>
            </div>
            <div className={'page-index'}>
                <div className={"page-image"}>
                    <input
                        type="file"
                        onChange={(e) => {
                            uploadImage(e);
                        }}
                    />
                </div>
                <div className={"page-text"}>
                     <TextInput/>
                </div>
                <div className={"page-delete"}>
                    //falta control para q no aparezcan los dos botonoes a la vez
                    <Button
                        style={{marginTop: '20%'}}
                        styleType={'primary'}
                    >add image</Button><Button
                    style={{marginTop: '20%'}}
                    styleType={'primary'}
                    >add text</Button>
                </div>
            </div>
        </Container>


    )
}

export default EditPort;