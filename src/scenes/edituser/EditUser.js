import React, {useEffect, useState} from "react";
import './index.css'
import {Button, ButtonLink} from "../../components/button/Button";

import {EmailInput, PwdInput, DateInput, NameInput, SurnameInput, FileInput} from "../../components/forms/TextInput";
import {Form, actions} from "react-redux-form";
import {SelectCountry} from "../../components/forms/Select";
import {TextInput} from "../../components/forms/TextInput";
import {UserIcon} from "../../components/icon/Icon";
import {useWindowSize} from "../../helpers/useWindowSize";
import Container from "../../components/container/Container";


const EditUser = ({loggedUser, actions}) => {
    const user={
        name: 'Hernan Fabirca',
            img: 'https://placekitten.com/1200/800',
            ubicacion: 'Sanca',
            desc: `What is Lorem Ipsum?Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it
Where can 
There are many variations of passages of Lorem Ipsum available, but the`,
            link: 'https://www.google.com',
            empresa: 'Cualit',
            profesion: 'SD Jr',
            likes: 200,
            views: 1233,
            imagen:''
    }
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

    return (

            <Container  searchbar={
                false
            }>

                <Form
                    model="edituser"
                    onSubmit={(values) => handleSubmit(values)}
                >
                    <div className={'edit-wrapper'}>

                        <div style={{display:"flex",justifyContent:"center",alignContent:"center"}} className={'image-edit'}>
                            <div style={{display:"flex", flexDirection: 'column', alignSelf: 'center'}}>
                                <div style={{ display:"flex",justifyContent:"center"}}>
                                    <UserIcon
                                        img={user.img}
                                        name={user.name}
                                        size={'70%'}
                                        height={'auto'}
                                        rounded={true}
                                    /></div>
                                <div style={{marginTop:'10%', display:"flex",justifyContent:"center"}}>
                                    <FileInput
                                        name={'imagen'}
                                        place={'Imagen'}
                                        onChange={uploadImage}
                                    />
                                </div>

                            </div>
                        </div>

                        <div className={"others-edit"}>

                            <div className={"register-content"}>
                                <div className={"content-left"}>
                                    <NameInput/>
                                </div>
                                <div className={"content-der"}
                                     style={{marginLeft: "4%"}}>
                                    <SurnameInput/>
                                </div>
                            </div>
                            <TextInput
                                model=".prof"
                                id="prof"
                                name="prof"
                                style={{marginTop: 12}}
                                placeholder="Profesion"
                                validators={{}}
                                messages={{}}
                            />
                            <TextInput
                                model=".empresa"
                                id="empresa"
                                name="esmpresa"
                                style={{marginTop: 12}}
                                placeholder="Empresa"
                                validators={{}}
                                messages={{}}
                            />

                            <div className={"register-content"}>
                                <div className={"content-left"}>
                                    <SelectCountry value={"Uruguay"}/>
                                </div>
                                <div className={"content-der"}
                                     style={{marginLeft: "4%"}}>
                                    <TextInput
                                        model=".city"
                                        id="city"
                                        name="city"
                                        placeholder="Ciudad"
                                        validators={{}}
                                        messages={{}}
                                    />
                                </div>
                            </div>
                            <TextInput
                                model=".url"
                                id="url"
                                name="url"
                                style={{marginTop: 12}}
                                placeholder="URL"
                                validators={{}}
                                messages={{}}
                            />
                            <Button
                                styleType={'primary'}
                                type="submit"
                                style={{marginTop: 20}}
                            >
                                Editar perfil
                            </Button>
                        </div>


                    </div>
                </Form>

            </Container>


    )
}

export default EditUser;