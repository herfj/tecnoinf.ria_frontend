import React, {Component, useState, useEffect} from "react";
import Container from "../../components/container/Container";
import {Carousel} from "react-responsive-carousel";
import {getFormatDate} from "../../helpers/formatDate";
import './index.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProjectHeader = ({portada, title}) => {
    return (
        <div
            className={'project-container'}
        >
            <div className="ph-main">
                <h1>
                    {title}
                </h1>
            </div>
            <img className={'p-img'} src={portada} alt=""/>
        </div>
    )
}


const ProjectContent = ({}) => {
    return (
        <div
            className={'project-container'}
        >
            <Carousel
                // autoPlay
                infiniteLoop
                centerMode
                showThumbs={false}
            >
                <div className={'p-content'}>
                    <img alt="" src="http://lorempixel.com/output/cats-q-c-640-480-1.jpg" className={'p-img'}/>
                </div>
                <div className={'p-content'}>
                    <img alt="" src="http://lorempixel.com/output/cats-q-c-640-480-1.jpg" className={'p-img'}/>
                </div>
                <div className={'p-content'}>
                    <img alt="" src="http://lorempixel.com/output/cats-q-c-640-480-1.jpg" className={'p-img'}/>
                </div>
            </Carousel>
        </div>
    );
}

const Project = ({}) => {
    const project = {
        title: 'Projecto 1',
        portada: 'https://placekitten.com/1200/800',
        comentarios: [],
        tags: [],
        fecha: getFormatDate(new Date()),
        categorias: [],
        likes: 200,
        views: 1233,
        author: {
            nombre: 'Hernan',
            ubicacion: 'Sanca',
        }

    }
    return (
        <Container
            searchbar={false}
        >
            <ProjectHeader
                portada={project.portada}
                title={project.title}
            />
            <ProjectContent/>
        </Container>
    )
}

export default Project