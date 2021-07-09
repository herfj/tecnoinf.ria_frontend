import React, {useState, useEffect} from "react";
import Container from "../../components/container/Container";
import './index.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {useWindowSize} from "../../helpers/useWindowSize";
import {Button, ButtonLink} from "../../components/button/Button";
import {ProjectList} from "../../components/list/List";
import {UserIcon} from "../../components/icon/Icon";
import Connector from "../../utils/connector";

const ProfileHeader = ({actions, user, loggedUser}) => {
    const size = useWindowSize();
    const handleVisitas = () => {
        let ret;
        user.Proyecto.forEach(element => ret = ret + element.Vistas);
        return ret;
    }
    const followStyle = size.width > 1200 ? {width: '49.5%', marginRight: '0.5%',} : {marginBottom: 5}
    const likeStyle = size.width > 1200 ? {width: '49.5%', marginLeft: '0.5%'} : {}
    return (
        <div
            className={'neutral-container'}
        >
            <h1>
                {user.Nombre}
            </h1>
            <div className="profile-data">

                <div className="profile-data-body">
                    <div className="img">
                        <UserIcon
                            img={user.Img ? user.Img : 'https://placekitten.com/700/700'}
                            name={user.Nombre}
                            size={size.width > 1200 ? 180 : 200}
                            rounded={false}
                        />
                    </div>
                    <div className="data">
                        <p><strong>Profesion:</strong> {user.Profesion}</p>
                        <p><strong>Empresa:</strong> {user.Empresa}</p>
                        <p><strong>Web:</strong> <a href={user.URL}>{user.URL}</a></p>
                        <p><strong>Región:</strong> {user.Ciudad}, {user.Pais}</p>
                        <p><strong>Descripción:</strong></p><p>{user.Descripcion}</p>
                    </div>
                    <div className="extras">

                        <p>
                            <strong>Total de visitas:</strong> {handleVisitas()}
                            <span className="far fa-eye" style={{marginLeft: 5}}></span>
                        </p>
                        <p>
                            <strong>Total de likes:</strong> falta
                            <span className="far fa-thumbs-up" style={{marginLeft: 5}}></span>
                        </p>
                        <p>
                            <strong>Seguidores:</strong> falta
                            <span className="fas fa-user-check" style={{marginLeft: 5}}></span>
                        </p>
                    </div>
                    <div className="footer">
                        {loggedUser !== null &&
                        <>
                            {
                                loggedUser.Email === user.Email ?

                                    (
                                        <Button styleType={'secondary'} style={{height: 40, width: '100%'}}
                                                onClick={actions.app.logout}>
                                            Cerrar Sesion
                                            <span className="fas fa-sign-out-alt" style={{marginLeft: 5}}></span>
                                        </Button>
                                    ) : (
                                        <>
                                            {
                                                loggedUser.Seguidos.includes(user) ? (
                                                    <>
                                                        <Button styleType={'secondary'}
                                                                onClick={()=>{
                                                                    actions.user.unfollowUser(loggedUser.Email, user.Email)
                                                                    actions.app.validate()
                                                                }}
                                                                style={{height: 40, ...followStyle}}>
                                                            Dejar de seguir
                                                            <span className="fas fa-user-times"
                                                                  style={{marginLeft: 5}}></span>
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Button styleType={'secondary'}
                                                                onClick={()=>{
                                                                    //encapsulado en un BM 420 am
                                                                    actions.user.followUser(loggedUser.Email, user.Email)
                                                                    actions.app.validate()
                                                                }}
                                                                style={{height: 40, ...followStyle}}>
                                                            Seguir
                                                            <span className="fas fa-user-plus"
                                                                  style={{marginLeft: 5}}></span>
                                                        </Button>
                                                    </>
                                                )
                                            }
                                            <ButtonLink
                                                to={'messages/new/' + user.Email}
                                                styleType={'secondary'}
                                                style={{height: 40, ...likeStyle}}>
                                                buttonStyle={{height: 40, ...likeStyle}}>
                                                Enviar mensaje
                                                <span style={{marginLeft: 5}}
                                                      className=" far fa-paper-plane"></span>
                                            </ButtonLink>
                                        </>
                                    )}

                        </>}
                    </div>
                </div>


            </div>
        </div>
    )
}

const Profile = ({actions, loggedUser, user, emailUser}) => {
    useEffect(() => {
        actions.users.getUser(emailUser)
    }, [])
    return (
        <Container
            searchbar={false}
        >
            {user !== null &&
            (
                <>
                    <ProfileHeader
                        loggedUser={loggedUser}
                        user={user}
                        actions={actions}
                    />
                    <ProjectList/>
                </>
            )
            }
        </Container>
    )
}

export default (props) => (
    <Connector>
        {({actions, state: {app, users}}) => {
            return (
                <Profile actions={actions} {...app} {...users} {...props} />
            )
        }}
    </Connector>
)
