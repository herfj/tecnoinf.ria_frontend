import React, {useEffect, useState} from "react";
import '../project/index.css'
import {Button, ButtonLink} from "../../components/button/Button";
import {
    EmailInput,
    PwdInput,
    DateInput,
    NameInput,
    SurnameInput,
    Checkbox,
    FileInput
} from "../../components/forms/TextInput";
import {LocalForm} from "react-redux-form";
import {required} from "../../helpers/formValidator";
import {TextInput} from "../../components/forms/TextInput";
import {useWindowSize} from "../../helpers/useWindowSize";
import Container from "../../components/container/Container";
import {catgoriesOptions} from "../../helpers/consts";
import {convertBase64} from "../../helpers/handleBase64";
import Connector from "../../utils/connector";
import {validateCreateProject} from "../../helpers/validations";

const CreateProject = ({loggerUser}) => {
    const [baseImage, setBaseImage] = useState('');

    const size = useWindowSize();

    const handleSubmit = (values) => {
        console.log("Current State is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(values));
        validateCreateProject(values)
    }

    const uploadImage = async (event) => {
        const file = event.target.files[0];
        const base64 = await convertBase64(file);
        setBaseImage(base64);
        console.log('base64', baseImage);
    };

    return (
        <Container
            searchbar={false}
            auth={true}
        >
            <LocalForm
                onSubmit={(values) => handleSubmit(values)}
            >
                <div className={'edit-wrapper'}>
                    <div style={{display: "flex", justifyContent: "center", alignContent: "center"}}
                         className={'image-edit'}>
                        <div style={{display: "block"}}>
                            <div style={{display: "flex", justifyContent: "center",}}>
                                <h3>Portada del proyecto</h3>
                            </div>
                            {baseImage !== '' &&
                            <div style={{display: "flex", justifyContent: "center", flexDirection: "row"}}>
                                <div className={'card-img'} style={{
                                    backgroundImage: `url("${baseImage}")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                }}/>
                            </div>
                            }
                            <div style={{marginTop: '10%', display: "flex", justifyContent: "center"}}>
                                <FileInput
                                    name={'Imagen'}
                                    place={'Imagen'}
                                    onChange={uploadImage}
                                />
                            </div>

                        </div>
                    </div>

                    <div className={"others-edit"}>
                        <TextInput
                            model=".Titulo"
                            id="Titulo"
                            name="Titulo"
                            style={{marginTop: 16}}
                            placeholder="Titulo del proyecto"
                            validators={{
                                required,
                            }}
                            messages={{
                                required: 'Se debe ingresar un titulo'
                            }}
                        />
                        <TextInput
                            model=".Etiquetas"
                            id="Etiquetas"
                            name="Etiquetas"
                            style={{marginTop: 16}}
                            placeholder="Etiquetas (Separe cada etiqueta con '';'' si son mas de una)"
                            validators={{
                                required
                            }}
                            messages={{
                                required: 'Se debe ingresar al menos una etiqueta'
                            }}
                        />

                        <TextInput
                            model=".Herramientas"
                            id="Herramientas"
                            name="Herramientas"
                            style={{marginTop: 16}}
                            placeholder="Herramientas utilizadas (Separe cada herramientas con '';'' si son mas de una)"
                            validators={{
                                required
                            }}
                            messages={{
                                required: 'Se debe ingresar al menos una herramienta'
                            }}
                        />

                        <label style={{marginTop: 5,marginLeft: 5, display: 'block'}}>Para separar las etiquestas y/o herramientas ingrese un ";" despues de la misma </label>
                        <h4>Categorias:</h4>
                        <div>
                            {catgoriesOptions.map((cat) => (<Checkbox style={{marginRight: '3%'}} model={cat.value} name={cat.key} id={cat.value}/>))}
                        </div>


                        <ButtonLink
                            styleType={'outline'}
                            type="button"
                            to={'/home'}
                            buttonStyle={{width: '45%', height: 45, marginTop: 20, marginRight: '10%'}}
                        >
                            Volver
                        </ButtonLink>
                        <Button
                            styleType={'primary'}
                            type="submit"
                            style={{width: '45%', marginTop: 20}}
                        >
                            Crear Proyecto
                        </Button>
                    </div>
                </div>
            </LocalForm>

        </Container>


    )
}


export default (props) => (
    <Connector>
        {({actions, state: {app}}) => {
            return (
                <CreateProject actions={actions}  {...app} {...props} />
            )
        }}
    </Connector>
)