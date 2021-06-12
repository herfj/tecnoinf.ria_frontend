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
                        asfdasdfdsfaadfsfdasdf
                    </p>
                </div>
                <div className={'card-body-slide'}>
                    <p>
                        <span style={{marginRight: 5}}>400</span><span className="far fa-thumbs-up"></span>
                    </p>
                    <p>
                        <span style={{marginRight: 5}}>400</span><span className="far fa-eye"></span>
                    </p>
                </div>

            </div>
            <div
                className={'card-footer'}
            >
                <ButtonLink
                    to={'/project'}
                    type={'primary'}
                >
                    VER MAS
                </ButtonLink>

            </div>

        </div>
    )
}

export {ProjectCard}