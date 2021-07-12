import React, {useEffect, useState} from "react";
import './index.css'
import {Button, ButtonLink} from "../../components/button/Button";
import {EmailInput, PwdInput, DateInput, NameInput, SurnameInput, FileInput} from "../../components/forms/TextInput";
import {LocalForm} from "react-redux-form";
import {SelectCountry} from "../../components/forms/Select";
import {TextInput} from "../../components/forms/TextInput";
import {UserIcon} from "../../components/icon/Icon";
import Container from "../../components/container/Container";
import Connector from "../../utils/connector";
import TextArea from "../../components/forms/TextArea";
import {convertBase64} from "../../helpers/handleBase64";


const EditUser = ({loggedUser, actions}) => {
    const [baseImage, setBaseImage] = useState(loggedUser ? loggedUser.imagen : null);
    useEffect(()=>{
        setBaseImage(loggedUser ? loggedUser.imagen : null)
    },[loggedUser])
    const handleSubmit = (values) => {
        let user = {
            Nombre:values.Nombre,
            Apellido: values.Apellido,
            Email: loggedUser.Email,
            Password: loggedUser.Password,
            Pais: values.Pais,
            Fecha_nac: loggedUser.Fecha_nac,
            Descripcion: values.Descripcion,
            Profesion: values.Profesion,
            Empresa: values.Empresa,
            Ciudad: values.Ciudad,
            URL: values.URL,
            imagen: baseImage,
        };
        console.log('handleSubmit USER',user)
        actions.users.updateUser({
            updateUser: user
        })
    }


    const uploadImage = async (event) => {
        const file = event.target.files[0];
        const base64 = await convertBase64(file);
        setBaseImage(base64);
        console.log('base64',baseImage);
    };



    return (

            <Container
                searchbar={false}
                auth={true}
            >
                {loggedUser!==null &&
                <LocalForm
                    onSubmit={(values) => handleSubmit(values)}
                >
                    <div className={'edit-wrapper'}>

                        <div style={{display:"flex",justifyContent:"center",alignContent:"center"}} className={'image-edit'}>
                            <div style={{display:"flex", flexDirection: 'column', alignSelf: 'center'}}>
                                <div style={{ display:"flex",justifyContent:"center"}}>
                                    <UserIcon
                                        // img={'https://placekitten.com/1200/800'}
                                        img={baseImage}
                                        name={loggedUser.Nombre}
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
                                    <NameInput
                                        defaultValue={loggedUser.Nombre}
                                    />
                                </div>
                                <div className={"content-der"}
                                     style={{marginLeft: "4%"}}>
                                    <SurnameInput
                                        defaultValue={loggedUser.Apellido}
                                    />
                                </div>
                            </div>
                            <TextInput
                                model=".Profesion"
                                id="Profesion"
                                name="Profesion"
                                style={{marginTop: 12}}
                                placeholder="Profesion"
                                defaultValue={loggedUser.Profesion ? loggedUser.Profesion : '' }
                                validators={{}}
                                messages={{}}
                            />

                            <TextInput
                                model=".Empresa"
                                id="Empresa"
                                name="Empresa"
                                style={{marginTop: 12}}
                                placeholder="Empresa"
                                defaultValue={loggedUser.Empresa ? loggedUser.Empresa : '' }
                                validators={{}}
                                messages={{}}
                            />

                            <div className={"register-content"}>
                                <div className={"content-left"}>
                                    <SelectCountry defaultValue={loggedUser.Pais ? loggedUser.Pais : "Uruguay"}/>
                                </div>
                                <div className={"content-der"}
                                     style={{marginLeft: "4%"}}>
                                    <TextInput
                                        defaultValue={loggedUser.Ciudad ? loggedUser.Ciudad : '' }
                                        model=".Ciudad"
                                        id="Ciudad"
                                        name="Ciudad"
                                        placeholder="Ciudad"
                                        validators={{}}
                                        messages={{}}
                                    />
                                </div>
                            </div>
                            <TextInput
                                defaultValue={loggedUser.URL ? loggedUser.URL : '' }
                                model=".URL"
                                id="URL"
                                name="URL"
                                style={{marginTop: 12}}
                                placeholder="URL"
                                validators={{}}
                                messages={{}}
                            />
                            <TextArea
                                model=".Descripcion"
                                id="Descripcion"
                                name="Descripcion"
                                style={{marginTop: 12}}
                                placeholder="Descripcion"
                                defaultValue={loggedUser.Descripcion ? loggedUser.Descripcion : '' }
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
                </LocalForm>
                }
            </Container>
    )
}

export default (props) => (
    <Connector>
        {({ actions, state: { app } }) => {
            return (
                <EditUser actions={actions}  {...app} {...props} />
            )
        }}
    </Connector>
)