import React, {
    Component,
    Suspense
} from "react";
import {Img} from 'react-image'

import './index.css';

const ProjectCard=({})=>{
    return(
        <div className={'project-card'}>
            <div className={'project-card-img'} style={{
                backgroundImage: `url("https://placekitten.com/700/700")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}>

            </div>
            {/*<Img src={'https://placekitten.com/200/300'} style={{height: 200}}/>*/}
        </div>
    )
}

export {ProjectCard}