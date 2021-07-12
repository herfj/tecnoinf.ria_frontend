import {Button, ButtonLink} from "../button/Button";
import React, {useState} from "react";
import {FileInput, TextInput} from "../forms/TextInput";
import TextArea from "../forms/TextArea";
import {LocalForm} from "react-redux-form";


const Page = ({actions,page, idPagina, project}) => {
    const [baseImage, setBaseImage] = useState("");
    const [esTexto, setEsTexto] = useState(false)
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
       if(page.includes('ENCARA MESSII: QPTMOSYNODENASHE: RUBIOPINKI--')){
           actions.projects.editPagina(idPagina,baseImage,0,project)
       }else{
           actions.projects.editPagina(idPagina,values.text,1,project)
       }
    }
    return (
        <div >
            <LocalForm

                className={'page-index'}
                onSubmit={(values) => handleSubmit(values)}
            >
            <div className={"page-image"}>
                {page.includes('ENCARA MESSII: QPTMOSYNODENASHE: RUBIOPINKI--') ? <input
                    type="file"
                    model=".image"
                    id="image"
                    name="image"
                    onChange={(e) => {
                        setEsTexto(true)
                        uploadImage(e);
                    }}
                /> : ''}
            </div>
            <div className={"page-text"}>
                {page.includes('ENCARA MESSII: QPTMOSYNODENASHE: RUBIOPINKI--')
                    ? <img alt="" src={page.replace('ENCARA MESSII: QPTMOSYNODENASHE: RUBIOPINKI--', '')} className={'page-img'}/>
                    : <TextArea
                        model=".text"
                        id="text"
                        name="text"
                        style={{marginTop: 12}}
                        defaultValue={page}
                        validators={{}}
                        messages={{}}
                    />
                }
            </div>
            <div className={"page-delete"}>
                <Button
                    style={{marginTop: '20%'}}
                    styleType={'primary'}
                    type="submit"
                >{page.includes('ENCARA MESSII: QPTMOSYNODENASHE: RUBIOPINKI--') ? 'editar imagen' : 'editar texto'}</Button>
            </div>
                </LocalForm>
        </div>
    )
}
export {Page}