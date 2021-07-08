import React, {useEffect, useState} from "react";
import Container from "../../components/container/Container";
import { MessList} from "../../components/list/List";
import {ButtonLink, } from "../../components/button/Button";
import './index.css'
import {MessageItem} from "../../components/message/Message";
import {useWindowSize} from "../../helpers/useWindowSize";
import Connector from "../../utils/connector";

const Messages = ({actions,loggedUser,inbox,sent}) => {
    const size = useWindowSize()
    const [active, setActive] = useState("Recibidos")

    useEffect(()=>{
        if(loggedUser!==null){
            actions.messages.getInbox(loggedUser.Email)
            actions.messages.getSent(loggedUser.Email)
        }
    },[loggedUser])

    const handleInboxList = () => (inbox !== null ? inbox.map((msg)=>(
        <MessageItem
            to={'/messages/'+msg.ID}
            msg={msg}
        />
    )) : [])
    const [inboxList, setInboxList] = useState(handleInboxList())
    useEffect(()=>{
        setInboxList(handleInboxList())
    },[inbox])

    const handleSentList = () => (sent !== null ? sent.map((msg)=>(
        <MessageItem
            to={'/messages/'+msg.ID}
            msg={msg}
        />
    )) : [])
    const [sentList, setSentList] = useState(handleSentList())
    useEffect(()=>{
        setSentList(handleSentList())
    },[sent])

    return (
        <Container
            searchbar={false}
            auth={true}
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
                {/*<ButtonLink*/}
                {/*    style={{alignSelf: 'center', width: size.width > 1200 ? 200 : '100%', height: 40}}*/}
                {/*    buttonStyle={{alignSelf: 'center', width: size.width > 1200 ? 200 : '100%', height: 40}}*/}
                {/*    to={'/messages/new'}*/}
                {/*    styleType={'primary'}*/}
                {/*>*/}
                {/*    Redactar un mensaje*/}
                {/*</ButtonLink>*/}

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
                                <MessList list={sentList}/>
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

                                        <MessList list={sentList}/>
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
