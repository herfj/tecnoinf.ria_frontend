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
import {getProjectComments} from "../../modules/project.module";
import {dioLikeProject, dislikeProject} from "../../modules/user.module";

const ProjectInfo = ({actions, project, user, loggedUser, userDioLike}) => {
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
                        <>
                            <ButtonLink
                                to={'/profile/' + project.Autor}
                                styleType={'secondary'}
                                style={{height: 40, ...followStyle, marginRight: 0}}
                                buttonStyle={{height: 40, ...followStyle}}
                            >
                                Ver perfil de {user && user.Nombre}{' '}{user && user.Apellido}
                                <span className="fas fa-user" style={{marginLeft: 5}}></span>
                            </ButtonLink>

                            <Button styleType={'secondary'} style={{height: 40, ...likeStyle}}
                                    onClick={() => {
                                        if (loggedUser!==null) {
                                            if (loggedUser && userDioLike.email === loggedUser.Email && userDioLike.dio && project.Titulo === userDioLike.projectTitle) {
                                                actions.users.dislikeProject(project.Titulo, loggedUser.Email)
                                            } else {
                                                actions.users.likeProject(project.Titulo, loggedUser.Email)
                                            }
                                        }
                                    }}
                            >
                                { loggedUser && userDioLike.email === loggedUser.Email && userDioLike.dio && project.Titulo === userDioLike.projectTitle ? (
                                    <span>Dislike</span>
                                ) : (
                                    <span>Like</span>
                                )}
                                <span style={{marginLeft: 5}} className="far fa-thumbs-up"></span>
                            </Button>

                        </>
                    </div>
                </div>
            </div>
            <h4 style={{marginBottom: 5}}>Tags</h4>
            <TagList
                tags={project.Etiquetas ? project.Etiquetas : []}
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

const ProjectContent = ({loggedUser, project}) => {
    return (
        <div
            className={'neutral-container'}
        >

            {
                project && loggedUser && project.Autor === loggedUser.Email ?
                    (
                        <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center', paddingTop: 10}}>
                            <h1
                                style={{
                                    marginBottom: 0
                                }}
                            >
                                {project.Titulo}
                            </h1>
                            <ButtonLink
                                to={'/edit_project/' + project.Titulo}
                                styleType={'secondary'}
                                style={{marginLeft: 10, alignSelf: 'center'}}
                                buttonStyle={{alignSelf: 'center'}}
                            >
                                Editar Porfolio
                            </ButtonLink>
                        </div>
                    ) : (
                        <h1
                            style={{
                                marginBottom: 0
                            }}
                        >
                            {project.Titulo}
                        </h1>
                    )

            }
            <ContentImg imgURL={project.P}/>
            {
                project.paginas &&  project.paginas.map((pagina)=>{
                    if(pagina.includes("ENCARA MESSII: QPTMOSYNODENASHE: RUBIOPINKI--")){
                        return( <ContentImg imgURL={pagina.replace('ENCARA MESSII: QPTMOSYNODENASHE: RUBIOPINKI--', '')}/>)
                    }else{
                        return( <ContentTxt text={pagina}/>
                        )
                    }
                })
            }

        </div>
    );
}

const ProjectComment = ({actions, loggedUser, projectTitle, comments}) => {
    return (
        <div
            className={'neutral-container'}
        >
            <h1>
                Cometarios
            </h1>
            <WriteComment actions={actions} loggedUser={loggedUser} projectTitle={projectTitle}/>,
            <List
                responsive={false}
                list={comments.map((c) => <Comment comment={c}/>)}
                grid={false}
            />
        </div>
    );
}

const Project = ({actions, loggedUser, userDioLike, user, projectTitle, project, comments}) => {

    useEffect(() => {
        actions.projects.getProject(projectTitle)
        actions.projects.getProjectComments(projectTitle)
    }, [])
    useEffect(() => {
        if (project) {
            actions.users.getUser(project.Autor)
        }
    }, [project])
    useEffect(() => {
        if (loggedUser) {
            actions.users.dioLikeProject(loggedUser.Email, projectTitle)
        }
    }, [loggedUser])

    return (
        <Container
            searchbar={false}
        >
            {project && user && comments &&
            <>
                <ProjectContent
                    loggedUser={loggedUser}
                    project={project}
                />
                <ProjectInfo
                    loggedUser={loggedUser}
                    user={user}
                    project={project}
                    actions={actions}
                    userDioLike={userDioLike}
                />
                <ProjectComment
                    comments={comments}
                    loggedUser={loggedUser}
                    projectTitle={project.Titulo}
                    actions={actions}
                />
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