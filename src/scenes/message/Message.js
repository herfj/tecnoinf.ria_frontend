import Container from "../../components/container/Container";
import {ShowMessage} from "../../components/message/Message";
import {ButtonLink} from "../../components/button/Button";
import React, {useEffect} from "react";
import Connector from "../../utils/connector";

const Message = ({id,actions,isLoading,loggedUser,message}) => {

    useEffect(()=>{
        if(loggedUser!==null){
            actions.messages.getMsg(id)
        }
    },[loggedUser])
    useEffect(()=>{
        if(loggedUser!==null && message!==null && message.Visto!=1){
            actions.messages.clavarElVisto(message.ID,loggedUser.Email,message.Remitente)
        }
    },[message])


    return (
        <Container
            searchbar={false}
            auth={true}
        >
            <div className={'neutral-container'}>
                { !isLoading && loggedUser !== null && message !== null && (loggedUser.Email === message.Remitente || loggedUser.Email === message.Emisor)  &&
                <ShowMessage
                    actions={actions}
                    loggedUser={loggedUser}
                    msg={message}
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
                }
            </div>
        </Container>
    )
}

export default (props) => (
    <Connector>
        {({actions, state: {app,messages}}) => {
            return (
                <Message actions={actions} {...app}  {...messages} {...props} />
            )
        }}
    </Connector>
)
