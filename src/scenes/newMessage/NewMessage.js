import Container from "../../components/container/Container";
import {WriteMessage} from "../../components/message/Message";
import {ButtonLink} from "../../components/button/Button";
import React from "react";
import Connector from "../../utils/connector";

const NewMessage = () => {
    return (
        <Container
            searchbar={false}
        >
            <div className={'neutral-container'}>
                <WriteMessage
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
