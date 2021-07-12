import React, {Component, useState, useEffect} from "react";
import Container from "../../components/container/Container";
import {getFormatDate} from "../../helpers/formatDate";
import './index.css'
import colors from "../../theme/colors";
import {useWindowSize} from "../../helpers/useWindowSize";
import {Button, ButtonLink} from "../../components/button/Button";
import {TagList, List, CategoryList} from "../../components/list/List";
import {Comment, WriteComment} from "../../components/comment/Comment";
import {Link} from "react-router-dom";
import Connector from "../../utils/connector";

const ProjectInfo = ({project, user}) => {
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
                        <p><strong>Autor:</strong> <Link
                            to={'/profile/' + project.Autor}>{user && user.Nombre}{' '}{user && user.Apellido}</Link>
                        </p>
                        <p><strong>Regíon:</strong> {user && user.Ciudad}, {user && user.Pais}</p>
                        <p><strong>Herramientas:</strong> {project.Herramientas && project.Herramientas.map((h) => (
                            <span>{h.Herramienta}; </span>))}</p>
                        <p><strong>Fecha publicación:</strong> {getFormatDate(project.Fecha_publicada)}</p>
                        <p style={{color: colors.secondary}}>
                          <span style={{marginRight: 10,}}>
                            <span style={{marginRight: 5}}>{project.likes}</span>
                              <span className="far fa-thumbs-up"></span>
                          </span>
                            <span style={{marginRight: 5}}>{project.Vistas}</span>
                            <span className="far fa-eye"></span>
                        </p>
                    </div>
                    <div className="tag">
                    </div>
                    <div className="cat">
                        <h4>Categorias</h4>
                        <CategoryList
                            categories={project.Proyecto_categorias ? project.Proyecto_categorias : []}
                            columnStyle={{
                                paddingLeft: 5,
                                paddingRight: 5,
                            }}
                        />
                    </div>
                    <div className="footer">
                        <Button styleType={'secondary'} style={{height: 40, ...followStyle}}>
                            Seguir a {user && user.Nombre}{' '}{user && user.Apellido}
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

const ProjectContent = ({project}) => {
    return (
        <div
            className={'neutral-container'}
        >
            <h1
                style={{
                    marginBottom: 0
                }}
            >
                {project.Titulo}
            </h1>

            <ContentImg
                imgURL={project.P}
            />
            <ContentImg
                imgURL={'https://placekitten.com/1200/800'}
            />
            <ContentTxt
                text={`What is Lorem Ipsum?Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum available, but the`}/>
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

const Project = ({actions, loggedUser, user, projectTitle, project}) => {

    useEffect(() => {
        actions.projects.getProject(projectTitle)
    }, [])
    useEffect(() => {
        if (project) {
            actions.users.getUser(project.Autor)
        }
    }, [project])

    const project2 = {
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
            {project &&
            <>
                <ProjectContent project={project}/>
                <ProjectInfo
                    user={user}
                    project={project}
                />
                <ProjectComment/>
            </>
            }
        </Container>
    )
}


export default (props) => (
    <Connector>
        {({actions, state: {app, projects, users}}) => {
            return (
                <Project actions={actions}  {...app} {...users} {...projects} {...props} />
            )
        }}
    </Connector>
)