import Container from "../../components/container/Container";
import {ShowMessage} from "../../components/message/Message";
import {ButtonLink} from "../../components/button/Button";
import React from "react";
import Connector from "../../utils/connector";

const Message = ({loggedUser,message}) => {
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

export default (props) => (
    <Connector>
        {({actions, state: {app,messages}}) => {
            return (
                <Message actions={actions} {...app}  {...messages} {...props} />
            )
        }}
    </Connector>
)
