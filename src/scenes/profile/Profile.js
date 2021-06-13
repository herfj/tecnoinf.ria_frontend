import React, {Component, useState, useEffect} from "react";
import Container from "../../components/container/Container";
import {Carousel} from "react-responsive-carousel";
import {getFormatDate} from "../../helpers/formatDate";
import './index.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import colors from "../../theme/colors";
import {useWindowSize} from "../../helpers/useWindowSize";
import {Button, ButtonLink} from "../../components/button/Button";
import {TagList, List, CategoryList, ProjectList} from "../../components/list/List";
import {Comment, WriteComment} from "../../components/comment/Comment";
import {UserIcon} from "../../components/icon/Icon";

const ProfileHeader = ({user}) => {
    const size = useWindowSize();
    const followStyle = size.width > 1200 ? {width: '49.5%', marginRight: '0.5%',} : {marginBottom: 5}
    const likeStyle = size.width > 1200 ? {width: '49.5%', marginLeft: '0.5%'} : {}
    return (
        <div
            className={'profile-container'}
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
                            size={size.width>1200?'90%':'100%'}
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
                        <Button type={'secondary'} style={{height: 40, ...followStyle}}>
                            Seguir
                            <span className="fas fa-user-plus" style={{marginLeft: 5}}></span>
                        </Button>

                        <Button type={'secondary'} style={{height: 40, ...likeStyle}}>
                            Enviar mensaje
                            <span style={{marginLeft: 5}} className=" far fa-paper-plane"></span>
                        </Button>


                    </div>
                </div>


            </div>
        </div>
    )
}


const ProfileComment = ({}) => {
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
            className={'profile-container'}
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

const Profile = ({}) => {
    const user = {
        name: 'Hernan Fabirca',
        img: 'https://placekitten.com/1200/800',
        ubicacion: 'Sanca',
        desc: `What is Lorem Ipsum?Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it
Where can 
There are many variations of passages of Lorem Ipsum available, but the`,
        link: 'https://www.google.com',
        empresa: 'Cualit',
        profesion: 'SD Jr',
        likes: 200,
        views: 1233,
    }
    return (
        <Container
            searchbar={false}
        >
            <ProfileHeader
                user={user}
            />
            <ProjectList/>
        </Container>
    )
}

export default Profile