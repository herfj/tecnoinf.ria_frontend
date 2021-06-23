import React, {useEffect, useState} from "react";
import './index.css'
import {Button, ButtonLink} from "../../components/button/Button";

import {EmailInput, PwdInput, DateInput, NameInput, SurnameInput ,Checkbox, FileInput} from "../../components/forms/TextInput";
import {Form, actions} from "react-redux-form";
import {SelectCountry} from "../../components/forms/Select";
import {Link} from "react-router-dom";
import {required} from "../../helpers/formValidator";
import {TextInput} from "../../components/forms/TextInput";
import {UserIcon} from "../../components/icon/Icon";
import {useWindowSize} from "../../helpers/useWindowSize";
import Container from "../../components/container/Container";


const CreateProject = ({user}) => {
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
                        <div style={{display:"block"}}>
                            <div style={{ display:"flex",justifyContent:"center"}}>
                              <h3>Portada del proyecto</h3>
                            </div>
                            <div style={{marginTop:'10%', display:"flex",justifyContent:"center"}}>
                                <FileInput/>
                            </div>

                        </div>
                    </div>

                    <div className={"others-edit"}>

                        <TextInput
                            model=".title"
                            id="title"
                            name="title"
                            style={{marginTop: 16}}
                            placeholder="Titulo del proyecto"
                            validators={{
                                required,
                            }}
                            messages={{
                                required:'Se debe ingresar un titulo'
                            }}
                        />
                        <TextInput
                            model=".tags"
                            id="tags"
                            name="tags"
                            style={{marginTop: 16}}
                            placeholder="Etiquetas (Ingresar cada etiqueta entre '' '' si son mas de una)"
                            validators={{required
                            }}
                            messages={{
                                required:'Se debe ingresar al menos una etiqueta'
                            }}
                        />

                        <TextInput
                            model=".tools"
                            id="tools"
                            name="tools"
                            style={{marginTop: 16}}
                            placeholder="Herramientas utilizadas"
                            validators={{
                                required
                            }}
                            messages={{
                                required:'Se debe ingresar al menos una herramienta'
                            }}
                        />
                        <h4>Categorias:</h4>

                        <Checkbox style={{marginRight:'3%'}} value={"insta"} />
                        <Checkbox style={{marginRight:'3%'}} value={"insta"} />
                        <Checkbox style={{marginRight:'3%'}} value={"insta"} />
                        <Checkbox style={{marginRight:'3%'}} value={"insta"} />
                        <Checkbox style={{marginRight:'3%'}} value={"insta"} />
                        <Checkbox style={{marginRight:'3%'}} value={"insta"} />
                        <Checkbox style={{marginRight:'3%'}} value={"insta"} />
                        <Checkbox style={{marginRight:'3%'}} value={"insta"} />
                        <Checkbox style={{marginRight:'3%'}} value={"insta"} />

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

export default CreateProject;