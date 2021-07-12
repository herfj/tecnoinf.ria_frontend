import React, {
    Component,
    Suspense
} from "react";
import {Img} from 'react-image'

import './index.css';
import {ButtonLink} from "../button/Button";

const ProjectCard = ({project}) => {
    return (
        <div className={'card'}>
            {project.P &&
            <div className={'card-img'} style={{
                backgroundImage: `url("${project.P}")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}/>
             }
            <div
                className={'card-body'}
            >
                <div className={'card-body-main'}>
                    <h3>{project.Titulo}</h3>
                </div>
                <div className={'card-body-slide'}>
                    <p>
                        <span style={{marginRight: 5}}>{project.likes}</span><span className="far fa-thumbs-up"></span>
                    </p>
                    <p>
                        <span style={{marginRight: 5}}>{project.Vistas}</span><span className="far fa-eye"></span>
                    </p>
                </div>

            </div>
            <div
                className={'card-footer'}
            >
                <ButtonLink
                    to={'/project/'+project.Titulo}
                    styleType={'primary'}
                >
                    VER MAS
                </ButtonLink>

            </div>

        </div>
    )
}

export {ProjectCard}