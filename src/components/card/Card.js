import React, {
    Component,
    Suspense
} from "react";
import {Img} from 'react-image'

import './index.css';
import {ButtonLink} from "../button/Button";

const ProjectCard = ({}) => {
    return (
        <div className={'card'}>
            <div className={'card-img'} style={{
                backgroundImage: `url("https://placekitten.com/700/700")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}/>
            <div
                className={'card-body'}
            >
                <div className={'card-body-main'}>
                    <h3>Hola</h3>
                    <p>
                        asfdasdfdsfaadfsfdasdfsaadfsfdsasdfafdsa
                    </p>
                </div>
                <div className={'card-body-slide'}>
                    <span>
                        <span style={{marginRight: 5}}>
                            400
                        </span>
                        <i className="far fa-thumbs-up"></i>
                    </span>
                </div>
            </div>
            <div
                className={'card-footer'}
            >
                <ButtonLink
                    to={'/tomas'}
                    type={'primary'}
                >
                    VER MAS
                </ButtonLink>

            </div>

        </div>
    )
}

export {ProjectCard}