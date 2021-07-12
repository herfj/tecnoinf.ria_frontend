import React, {useEffect, useState} from "react";
import './index.css'
import {Button, ButtonLink} from "../../components/button/Button";

import {EmailInput, PwdInput, DateInput, NameInput, SurnameInput, FileInput} from "../../components/forms/TextInput";
import {Form, actions, LocalForm} from "react-redux-form";
import {SelectCountry} from "../../components/forms/Select";
import {Link} from "react-router-dom";
import {required} from "../../helpers/formValidator";
import {TextInput} from "../../components/forms/TextInput";
import {UserIcon} from "../../components/icon/Icon";
import {useWindowSize} from "../../helpers/useWindowSize";
import Container from "../../components/container/Container";
import Connector from "../../utils/connector";
import {Page} from "../../components/page/Page";
import TextArea from "../../components/forms/TextArea";
import colors from "../../theme/colors";


const EditPort = ({actions,projectTitle, loggedUser, project}) => {
    const [baseImage, setBaseImage] = useState("");
    const [esTexto, setEsTexto] = useState(false)

    useEffect(() => {
        actions.projects.getProject(projectTitle, false)
    }, [])

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        console.log('base64', base64)
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

    const handleSubmit = (values) => {

        if (!values.text) {
            const newpage = {
                ID_Portfolio: project.ID_Portfolio,
                Imagen: baseImage,
                Titulo: project.Titulo
            }
            console.log('imagen',newpage)
            actions.projects.createPage(newpage);
        } else {
            const newpage = {
                ID_Portfolio: project.ID_Portfolio,
                Texto: values.text,
                Titulo: project.Titulo
            }
            console.log('pagina if text', newpage);
            actions.projects.createPage(newpage);
        }

    }


    return (
        <Container searchbar={false}
                   auth={true}
        >
            {loggedUser !== null && project && project.Titulo === projectTitle &&
            <>
                {project.paginas.map((page,index) => {
                    return (
                        <div style={{
                            marginTop: 20,
                            display: 'block'
                        }}>
                        <Page actions={actions} page={page} project={project.Titulo} idPagina={project.IDPages[index]}/>
                        </div>
                    )
                })}
                <div style={{
                    marginTop: 20,
                    display: 'block'
                }}>
                    <h1 style={{color: colors.primary,marginLeft: 10}}>Agregar una pagina</h1>
                    <div  style={{padding: 20}}>


                    <LocalForm
                        className={'page-index'}
                        onSubmit={(values) => handleSubmit(values)}
                    >
                    <div className={"page-image"}>

                        <input
                            type="file"
                            model=".image"
                            id="image"
                            name="image"
                            onChange={(e) => {
                                setEsTexto(true)
                                uploadImage(e);
                            }}
                        />
                    </div>
                    <div className={"page-text"}>
                        {

                        }
                        <TextArea
                            model=".text"
                            id="text"
                            name="text"
                            disabled={esTexto}
                            style={{marginTop: 12}}
                            validators={{}}
                            messages={{}}
                        />
                    </div>
                    <div className={"page-delete"}>
                        <Button
                            style={{marginTop: '20%'}}
                            styleType={'primary'}
                            type="submit"
                        >Agregar</Button>

                    </div>
                        </LocalForm>

                    </div>
                </div>
            </>
            }
        </Container>
    )
};


export default (props) => (
<Connector>
    {({actions, state: {app,projects}}) => {
        return (
            <EditPort actions={actions}  {...app}  {...projects} {...props} />
        )
    }}
</Connector>
)