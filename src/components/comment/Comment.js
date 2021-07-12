import React, {useState, useEffect} from "react";
import './index.css'
import {UserIcon} from "../icon/Icon";
import {Button} from "../button/Button";
import TextArea from "../forms/TextArea";
import {LocalForm} from "react-redux-form";
import {getFormatDate} from "../../helpers/formatDate";

const Comment = ({comment}) => {
    return (
        <div className={'comment'}>
            <div className={'c-icon'}>
                <UserIcon/>
            </div>
            <div className={'c-mess'}>
                <strong style={{marginBottom: 10}}><span style={{textTransform: 'uppercase'}}>{comment.Usuario}</span>{' - '}{getFormatDate(comment.Fecha)}</strong>
                <p>{comment.Cuerpo}</p>
            </div>
        </div>
    )
}

const WriteComment = ({actions, loggedUser, projectTitle}) => {
    const handleSubmit = (values) => {
        actions.projects.postComment(projectTitle, loggedUser.Email, values.Cuerpo)
    }
    return (
        <>
            {loggedUser &&
            <div className={'comment'}>
                <div className={'c-icon'}>

                    <UserIcon/>
                </div>
                <div className={'c-mess'}>
                    <LocalForm
                        onSubmit={(values) => handleSubmit(values)}
                    >

                        <strong style={{marginBottom: 10}}>Comentario: </strong>
                        <TextArea
                            model={".Cuerpo"}
                            id={"Cuerpo"}
                            name={"Cuerpo"}
                            placeholder={"Comentario..."}
                        ></TextArea>
                        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <Button
                                styleType={'primary'}
                                type={'submit'}
                                style={{
                                    alignSelf: 'flex-end',
                                    width: 120,
                                    height: 40,
                                }}
                            >
                                Publicar
                            </Button>
                        </div>
                    </LocalForm>
                </div>
            </div>
            }
        </>
    )
}

export {Comment, WriteComment}