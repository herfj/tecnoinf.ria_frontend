import React, { useState, useEffect} from "react";
import Container from "../../components/container/Container";
import './index.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {useWindowSize} from "../../helpers/useWindowSize";
import {Button, ButtonLink} from "../../components/button/Button";
import {TagList, List, CategoryList, ProjectList} from "../../components/list/List";
import {UserIcon} from "../../components/icon/Icon";
import Connector from "../../utils/connector";

const ProfileHeader = ({user}) => {
    const size = useWindowSize();
    const followStyle = size.width > 1200 ? {width: '49.5%', marginRight: '0.5%',} : {marginBottom: 5}
    const likeStyle = size.width > 1200 ? {width: '49.5%', marginLeft: '0.5%'} : {}
    return (
        <div
            className={'neutral-container'}
        >
            <h1>
                {user.name}
            </h1>
            <div className="profile-data">

                <div className="profile-data-body">
                    <div className="img">
                        <UserIcon
                            img={user.img}
                            name={user.name}
                            size={size.width > 1200 ? '90%' : '100%'}
                            rounded={false}
                        />
                    </div>
                    <div className="data">
                        <p><strong>Profesion:</strong> {user.profesion}</p>
                        <p><strong>Empresa:</strong> {user.empresa}</p>
                        <p><strong>Web:</strong> <a href={user.link}>{user.link}</a></p>
                        <p><strong>Región:</strong> {user.ubicacion}</p>
                        <p><strong>Descripción:</strong></p><p>{user.desc}</p>
                    </div>
                    <div className="extras">

                        <p>
                            <strong>Total de visitas:</strong> {user.views}
                            <span className="far fa-eye" style={{marginLeft: 5}}></span>
                        </p>
                        <p>
                            <strong>Total de likes:</strong> {user.views}
                            <span className="far fa-thumbs-up" style={{marginLeft: 5}}></span>
                        </p>
                        <p>
                            <strong>Seguidores:</strong> {user.views}
                            <span className="fas fa-user-check" style={{marginLeft: 5}}></span>
                        </p>
                    </div>
                    <div className="footer">
                        <Button styleType={'secondary'} style={{height: 40, ...followStyle}}>
                            Seguir
                            <span className="fas fa-user-plus" style={{marginLeft: 5}}></span>
                        </Button>

                        <Button styleType={'secondary'} style={{height: 40, ...likeStyle}}>
                            Enviar mensaje
                            <span style={{marginLeft: 5}} className=" far fa-paper-plane"></span>
                        </Button>


                    </div>
                </div>


            </div>
        </div>
    )
}
const Profile = ({actions, loggedUser, user, emailUser}) => {
    useEffect(() => {
        if (loggedUser !== null) {
            actions.users.getUser(emailUser)
        }
    }, [loggedUser])
    return (
        <Container
            searchbar={false}
        >
            {user !== null &&
            (
                <>
                    <ProfileHeader
                        user={user}
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
