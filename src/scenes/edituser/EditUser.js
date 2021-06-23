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


const EditUser = ({user}) => {
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
                                    <FileInput/>
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