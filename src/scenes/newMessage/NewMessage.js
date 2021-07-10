import Container from "../../components/container/Container";
import {WriteMessage} from "../../components/message/Message";
import {ButtonLink} from "../../components/button/Button";
import React from "react";
import Connector from "../../utils/connector";

const NewMessage = ({actions,loggedUser,email}) => {
    const handleSubmit = (values) => {
        const message = {
            Cuerpo: values.Cuerpo,
            Emisor: loggedUser.Email,
            Remitente: email,
        }
        actions.messages.sendMessage({message: message})
    }
    return (
        <Container
            searchbar={false}
            auth={true}
        >
            <div className={'neutral-container'}>
                <WriteMessage
                    email={email}
                    handleSubmit={handleSubmit}
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

export default (props) => (
    <Connector>
        {({actions, state: {app,}}) => {
            return (
                <NewMessage actions={actions} {...app}   {...props} />
            )
        }}
    </Connector>
)
