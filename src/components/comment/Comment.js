import React, {useState, useEffect} from "react";
import './index.css'
import {UserIcon} from "../icon/Icon";
import {Button} from "../button/Button";
import TextArea from "../forms/TextArea";

const Comment = ({}) => {
    return (
        <div className={'comment'}>
            <div className={'c-icon'}>

                <UserIcon/>
            </div>
            <div className={'c-mess'}>
                <strong style={{marginBottom: 10}}>Hace 2 horas</strong>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a egestas quam, quis consequat
                    augue. Etiam at fringilla nulla. In hac habitasse platea dictumst. Mauris vitae augue eu eros
                    lobortis facilisis. Nulla sit amet tortor a elit fringilla sodales. Praesent venenatis hendrerit
                    tortor et feugiat. Proin vitae sagittis magna. Etiam feugiat ligula in semper bibendum.

                    Integer tempor diam in sapien elementum malesuada. Quisque nunc purus, condimentum ac erat at,
                    ullamcorper eleifend turpis. Sed eu euismod tortor, ut convallis lacus. Nulla facilisi. Phasellus
                    eget venenatis magna. Nulla maximus purus orci, quis dignissim nibh placerat vitae. Nunc at congue
                    odio. Morbi quis nisi pellentesque, sodales diam in, sodales est. Suspendisse eu magna tristique,
                    elementum est nec, scelerisque urna. Nam efficitur dictum laoreet.</p>
            </div>
        </div>
    )
}

const WriteComment = ({}) => {
    return (
        <div className={'comment'}>
            <div className={'c-icon'}>

                <UserIcon/>
            </div>
            <div className={'c-mess'}>
                <strong style={{marginBottom: 10}}>Comentario: </strong>

                <TextArea></TextArea>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button
                        type={'primary'}
                        style={{
                            alignSelf: 'flex-end',
                            width: 120,
                            height: 40,
                        }}
                    >
                        Publicar
                    </Button>
                </div>
            </div>
        </div>
    )
}

export {Comment, WriteComment}