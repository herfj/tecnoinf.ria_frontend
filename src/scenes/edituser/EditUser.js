import React, {useEffect, useState} from "react";
import './index.css'
import {Button, ButtonLink} from "../../components/button/Button";

import {EmailInput, PwdInput, DateInput, NameInput, SurnameInput} from "../../components/forms/TextInput";
import {Form, actions} from "react-redux-form";
import {SelectCountry} from "../../components/forms/Select";
import {Link} from "react-router-dom";
import {required} from "../../helpers/formValidator";
import {TextInput} from "../../components/forms/TextInput";

const EditUser = ({}) => {

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
        <>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div className={'edit-wrapper'}>
                    <Form
                        model="edituser"
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        <div className={"second-wrapper"}>

                            <div className={'image-edit'}>
                                Foto y subir foto

                            </div>
                            <div className={"others-edit"}>

                                <div className={"register-content"}>
                                    <div className={"content-left"}>
                                        <NameInput/>
                                    </div>
                                    <div className={"content-der"}
                                         style={{marginLeft:"4%"}}>
                                        <SurnameInput/>
                                    </div>
                                </div>
                                <TextInput
                                    model=".prof"
                                    id="prof"
                                    name="prof"
                                    style={{marginTop:12}}
                                    placeholder="Profesion"
                                    validators={{

                                    }}
                                    messages={{

                                    }}
                                />
                                <TextInput
                                    model=".empresa"
                                    id="empresa"
                                    name="esmpresa"
                                    style={{marginTop:12}}
                                    placeholder="Empresa"
                                    validators={{

                                    }}
                                    messages={{

                                    }}
                                />

                                <div className={"register-content"}>
                                    <div className={"content-left"}>
                                        <SelectCountry value={"Uruguay"}/>
                                    </div>
                                    <div className={"content-der"}
                                         style={{marginLeft:"4%"}}>
                                        <TextInput
                                            model=".city"
                                            id="city"
                                            name="city"
                                            placeholder="Ciudad"
                                            validators={{

                                            }}
                                            messages={{

                                            }}
                                        />
                                    </div>
                                </div>
                                <TextInput
                                    model=".url"
                                    id="url"
                                    name="url"
                                    style={{marginTop:12}}
                                    placeholder="URL"
                                    validators={{

                                    }}
                                    messages={{

                                    }}
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
                </div>

            </div>
        </>
    )
}

export default EditUser;