import React, {Component, useState} from "react";
import Container from "../../components/container/Container";
import {CategoryList, ProjectList, TagList, MessList} from "../../components/list/List";
import colors from "../../theme/colors";
import {ButtonLink} from "../../components/button/Button";
import './index.css'
import {MessageItem,ShowMessage} from "../../components/message/Message";
import {useWindowSize} from "../../helpers/useWindowSize";

const Messages = ({}) => {
    const size = useWindowSize()

    const [active, setActive] = useState("Recibidos")
    const recibidos = ()=>(<MessList list={[
        <MessageItem
            mess={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a egestas quam, quis consequat augue. Etiam at fringilla nulla. In hac habitasse platea dictumst. Mauris vitae augue eu eros'}
            open={true}
        />,
        <MessageItem
            mess={'holaj asdf asdf'}
        />
    ]}/>)
    const enviados = ()=>(<MessList list={[
        <MessageItem
            mess={'holaj asdf asdf'}
        />,
        <MessageItem
            mess={'holaj asdf asdf'}
        />,
        <MessageItem
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

    return(
        <Container
            searchbar={false}
        >
            <div className={'neutral-container'}>
                <ShowMessage
                    subject={'Asunto muy importante'}
                    date={'02/03/2021'}
                    mess={'HOla tomi adfsdfas ddafsdfas dfsadfdfsafdas dfasdfas adfs'}
                />
                <ButtonLink
                    to={'/messages'}
                    style={{width: 150}}
                    buttonStyle={{width: 150}}
                    styleType={'outline'}
                >
                    Volver al listado
                </ButtonLink>
            </div>
        </Container>
    )
}
export {Messages,Message};
