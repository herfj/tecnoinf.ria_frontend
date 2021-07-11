import React, {useState, useEffect} from "react";
import Container from "../../components/container/Container";
import './index.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {useWindowSize} from "../../helpers/useWindowSize";
import {Button, ButtonLink} from "../../components/button/Button";
import {ProjectList} from "../../components/list/List";
import {UserIcon} from "../../components/icon/Icon";
import Connector from "../../utils/connector";

const ProfileHeader = ({actions,isLoading, user, loggedUser}) => {
    const size = useWindowSize();
    const handleVisitas = () => {
        let ret = 0;
        // user.Proyecto.forEach(element => ret = ret + element.Vistas);
        return ret;
    }
    const handleSeguirODejar = () => {
        if(loggedUser!==null){
            let esSeguido = false
            user.Seguidores.forEach((seguidor)=>{
                if(loggedUser.Email==seguidor.Email){
                    esSeguido=true
                }
            })
            return esSeguido;
        } else {
            return false
        }
    }

    const [seguirODejar,setSeguirODejar] = useState(handleSeguirODejar())
    useEffect(()=>{
        setSeguirODejar(handleSeguirODejar())
    },[user.Seguidores.length])
    useEffect(()=>{
        setSeguirODejar(handleSeguirODejar())
    },[loggedUser])
    useEffect(()=>{
        setSeguirODejar(handleSeguirODejar())
    },[isLoading])

    return (
        <div
            className={'neutral-container'}
        >
            <h1>
                {user.Nombre}{' '}{user.Apellido}
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
                            <strong>Seguidores:</strong> {user.Seguidores.length}
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
                                            seguirODejar ? (
                                                <>
                                                    <Button styleType={'secondary'}
                                                            onClick={()=>{
                                                                actions.users.unfollowUser(loggedUser.Email, user.Email)
                                                                actions.app.validate()
                                                            }}
                                                            style={size.width > 1200 ? {width: '49.5%', marginRight: '0.5%',height: 40} : {marginBottom: 5}}>
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
                                                                actions.users.followUser(loggedUser.Email, user.Email)
                                                                actions.app.validate()
                                                            }}
                                                            style={size.width > 1200 ? {width: '49.5%', marginRight: '0.5%',height: 40} : {marginBottom: 5}}>
                                                        Seguir
                                                        <span className="fas fa-user-plus"
                                                              style={{marginLeft: 5}}></span>
                                                    </Button>
                                                </>
                                            )
                                        }
                                        <ButtonLink
                                            to={'/messages/new/' + user.Email}
                                            styleType={'secondary'}
                                            style={size.width > 1200 ? {width: '49.5%', marginLeft: '0.5%', height: 40} : {}}
                                            buttonStyle={size.width > 1200 ? {width: '49.5%', height: 40} : {}}
                                            >
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

const Profile = ({actions,isLoading, loggedUser, user, emailUser}) => {
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
                        isLoading={isLoading}
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
