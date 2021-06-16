import React, {Component, useState} from "react";
import Container from "../../components/container/Container";
import {CategoryList, ProjectList, TagList, MessList} from "../../components/list/List";
import colors from "../../theme/colors";
import {ButtonLink, Button} from "../../components/button/Button";
import './index.css'
import {MessageItem, ShowMessage} from "../../components/message/Message";
import {useWindowSize} from "../../helpers/useWindowSize";

const Messages = ({}) => {
    const size = useWindowSize()

    const [active, setActive] = useState("Recibidos")
    const recibidos = () => (<MessList list={[
        <MessageItem
            to={'/messages/1'}
            mess={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a egestas quam, quis consequat augue. Etiam at fringilla nulla. In hac habitasse platea dictumst. Mauris vitae augue eu eros'}
            open={true}
        />,
        <MessageItem
            to={'/messages/2'}
            mess={'holaj asdf asdf'}
        />
    ]}/>)
    const enviados = () => (<MessList list={[
        <MessageItem
            to={'/messages/1'}
            mess={'holaj asdf asdf'}
        />,
        <MessageItem
            to={'/messages/1'}
            mess={'holaj asdf asdf'}
        />,
        <MessageItem
            to={'/messages/1'}
            mess={'holaj asdf asdf'}
        />
    ]}/>)

    return (
        <Container
            searchbar={false}
        >
            <div
                className={'neutral-container'}
            >
                <h1>
                    Mensajes
                </h1>
                {
                    size.width > 1200 ? (
                        <div style={{display: 'flex', flexDirection: 'row'}}>

                            <div style={{width: '50%', marginRight: 10, marginLeft: 0}}>
                                <h2>Recibidos</h2>
                                {recibidos()}
                            </div>
                            <div style={{width: '50%', marginRight: 0, marginLeft: 10}}>
                                <h2>Enviados</h2>
                                {enviados()}
                            </div>
                        </div>

                    ) : (
                        <div>
                            <div style={{display: 'flex', flexDirection: 'row', alignContent: 'flex-end'}}>
                                <div style={{width: '50%', marginRight: 10, marginLeft: 0, textAlign: 'right'}}>
                                    <h2
                                        className={active === "Recibidos" ? 'active' : 'inactive'}
                                        onClick={() => setActive('Recibidos')}
                                    >Recibidos</h2>
                                </div>
                                <div style={{width: '50%', marginRight: 0, marginLeft: 10}}>
                                    <h2
                                        className={active === "Enviados" ? 'active' : 'inactive'}
                                        onClick={() => setActive('Enviados')}
                                    >Enviados</h2>
                                </div>
                            </div>
                            {
                                active === "Recibidos" ? (
                                    <>
                                        {recibidos()}
                                    </>
                                ) : (
                                    <>
                                        {enviados()}
                                    </>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </Container>
    )
}

const Message = ({id}) => {
    return (
        <Container
            searchbar={false}
        >
            <div className={'neutral-container'}>

                <ShowMessage
                    sendByMe={false}
                    subject={'Asunto muy importante'}
                    date={'02/03/2021'}
                    mess={'HOla tomi adfsdfas ddafsdfas dfsadfdfsafdas dfasdfas adfs'}
                    backButton={(
                        <ButtonLink
                            to={'/messages'}
                            style={{width: 160, height: 45}}
                            buttonStyle={{width: 160, height: 45}}
                            styleType={'outline'}
                        >
                            <span class="fas fa-chevron-left" style={{marginRight: 5}}></span>
                            Volver al listado
                        </ButtonLink>)}
                />

            </div>
        </Container>
    )
}

export {Messages, Message};
