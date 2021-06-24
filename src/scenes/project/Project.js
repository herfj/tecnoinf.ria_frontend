import React, {Component, useState, useEffect} from "react";
import Container from "../../components/container/Container";
import {Carousel} from "react-responsive-carousel";
import {getFormatDate} from "../../helpers/formatDate";
import './index.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import colors from "../../theme/colors";
import {useWindowSize} from "../../helpers/useWindowSize";
import {Button, ButtonLink} from "../../components/button/Button";
import {TagList, List, CategoryList} from "../../components/list/List";
import {Comment, WriteComment} from "../../components/comment/Comment";
import {Link} from "react-router-dom";

const ProjectInfo = ({project}) => {
    const size = useWindowSize();
    const followStyle = size.width > 1200 ? {width: '49.5%', marginRight: '0.5%',} : {marginBottom: 5}
    const likeStyle = size.width > 1200 ? {width: '49.5%', marginLeft: '0.5%'} : {}
    return (
        <div
            className={'neutral-container'}
        >
            <h2>Información general</h2>
            <div className="p-data">
                <div className="p-data-body">
                    <div className="data">
                        <p><strong>Autor:</strong> <Link to={'/profile'}>{project.author.nombre}</Link></p>
                        <p><strong>Regíon:</strong> {project.author.ubicacion}</p>
                        <p><strong>Herramientas:</strong> {project.herramientas}</p>
                        <p><strong>Fecha publicación:</strong> {project.fecha}</p>
                        <p style={{color: colors.secondary}}>
                          <span style={{marginRight: 10,}}>

                        <span style={{marginRight: 5}}>400</span><span className="far fa-thumbs-up"></span>
                          </span>
                            <span style={{marginRight: 5}}>400</span><span className="far fa-eye"></span>
                        </p>
                    </div>
                    <div className="tag">
                    </div>
                    <div className="cat">
                        <h4>Categorias</h4>
                        <CategoryList
                            columnStyle={{
                                paddingLeft: 5,
                                paddingRight: 5,
                            }}
                        />
                    </div>
                    <div className="footer">
                        <Button styleType={'secondary'} style={{height: 40, ...followStyle}}>
                            Seguir a {project.author.nombre}
                            <span className="fas fa-user-plus" style={{marginLeft: 5}}></span>
                        </Button>

                        <Button styleType={'secondary'} style={{height: 40, ...likeStyle}}>
                            Like
                            <span style={{marginLeft: 5}} className="far fa-thumbs-up"></span>
                        </Button>


                    </div>
                </div>
            </div>
            <h4>Tags</h4>
            <TagList
                columnStyle={{
                    paddingLeft: 5,
                    paddingRight: 5,
                }}
            />

        </div>

    )
}

const ContentImg = ({imgURL, alt}) => (
    <div className={'p-content'}>
        <img alt="" src={imgURL} className={'p-img'}/>
    </div>
)

const ContentTxt = ({text}) => {
    const size = useWindowSize()
    return (
        <div className={'p-content'} style={{
            maxHeight: size.width > 1200 ? '81.75%' : 300,
            overflowY: 'scroll',
            backgroundColor: colors.neutral
        }}>
            <p className={'p-txt'}>
                {text}
            </p>
        </div>
    )
}

const ContetnVideo = ({vURL}) => (
    <div className={'p-content'}>
        <video controls className={'p-vid'}>
            <source src={vURL}/>
        </video>
    </div>
)

const ProjectContent = ({}) => {
    const size = useWindowSize()
    return (
        <div
            className={'neutral-container'}
        >
            <h1
                style={{
                    marginBottom: 0
                }}
            >
                Proyecto 1
            </h1>
            <Carousel
                // autoPlay
                infiniteLoop
                centerMode={size.width > 1200}
                showThumbs={false}
            >
                <ContentImg
                    imgURL={'https://placekitten.com/1200/800'}
                />
                <ContentImg
                    imgURL={'https://placekitten.com/1200/800'}
                />
                <ContentTxt
                    text={`What is Lorem Ipsum?Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).


Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

Where can I get some?
There are many variations of passages of Lorem Ipsum available, but the`}/>
                <ContetnVideo
                    vURL={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                />
            </Carousel>
        </div>
    );
}

const ProjectComment = ({}) => {
    const size = useWindowSize()
    const list = [
        <WriteComment/>,
        <Comment/>,
        <Comment/>,
        <Comment/>,
        <Comment/>,
        <Comment/>,
        <Comment/>,
        <Comment/>,
        <Comment/>,
    ]
    return (
        <div
            className={'neutral-container'}
        >
            <h1>
                Cometarios
            </h1>
            <List
                responsive={false}
                list={list}
                grid={false}
            />
        </div>
    );
}

const Project = ({}) => {
    const project = {
        title: 'Proyecto 1',
        portada: 'https://placekitten.com/1200/800',
        herramientas: 'Picel, react, css',
        comentarios: [],
        tags: [],
        fecha: getFormatDate(new Date()),
        categorias: [],
        likes: 200,
        views: 1233,
        author: {
            nombre: 'Hernan Fabrica',
            ubicacion: 'Sanca',
        }

    }

    return (
        <Container
            searchbar={false}
        >
            <ProjectContent/>
            <ProjectInfo
                project={project}
            />
            <ProjectComment/>
        </Container>
    )
}

export default Project