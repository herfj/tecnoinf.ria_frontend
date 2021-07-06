import React, {useEffect, useState} from "react";
import Container from "../../components/container/Container";
import { MessList} from "../../components/list/List";
import {ButtonLink, } from "../../components/button/Button";
import './index.css'
import {MessageItem} from "../../components/message/Message";
import {useWindowSize} from "../../helpers/useWindowSize";
import Connector from "../../utils/connector";

const Messages = ({actions,isLoading,loggedUser,inbox,sent}) => {
    const size = useWindowSize()
    const [active, setActive] = useState("Recibidos")

    useEffect(()=>{
        if(loggedUser!==null){
            actions.messages.getInbox(loggedUser.Email)
        }
    },[loggedUser])

    const handleInboxList = () => (inbox !== null ? inbox.map((msg)=>(
        <MessageItem
            to={'/messages/'+msg.ID}
            mess={msg.Cuerpo}
            open={msg.Visto}
        />
    )) : [])
    const [inboxList, setInboxList] = useState(handleInboxList())
    useEffect(()=>{
        setInboxList(handleInboxList())
    },[inbox])


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
                <div style={{
                    display: 'flex',
                    flexDirection: size.width > 1200 ? 'row' : 'column',
                    justifyContent: 'space-between',
                    alignContent: 'center'
                }}>

                <h1>
                    Mensajes
                </h1>
                <ButtonLink
                    style={{alignSelf: 'center', width: size.width > 1200 ? 200 : '100%', height: 40}}
                    buttonStyle={{alignSelf: 'center', width: size.width > 1200 ? 200 : '100%', height: 40}}
                    to={'/messages/new'}
                    styleType={'primary'}
                >
                    Redactar un mensaje
                </ButtonLink>

                </div>
                {
                    size.width > 1200 ? (
                        <div style={{display: 'flex', flexDirection: 'row'}}>

                            <div style={{width: '50%', marginRight: 10, marginLeft: 0}}>
                                <h2>Recibidos</h2>
                                <MessList list={inboxList}/>
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
                                        <MessList list={inboxList}/>
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

export default (props) => (
    <Connector>
        {({actions, state: {app,messages}}) => {
            return (
                <Messages actions={actions} {...app} {...messages}   {...props} />
            )
        }}
    </Connector>
)
