import React, {Component, useState} from "react";
import Container from "../../components/container/Container";
import {CategoryList, ProjectList, TagList, MessList} from "../../components/list/List";
import colors from "../../theme/colors";
import {Button} from "../../components/button/Button";
import './index.css'
import {Message as Mess} from "../../components/message/Message";
import {useWindowSize} from "../../helpers/useWindowSize";


const Message = ({}) => {
    const size = useWindowSize()

    const [active, setActive] = useState("Recibidos")
    const recibidos = ()=>(<MessList list={[
        <Mess
            mess={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a egestas quam, quis consequat augue. Etiam at fringilla nulla. In hac habitasse platea dictumst. Mauris vitae augue eu eros'}
            open={true}
        />,
        <Mess
            mess={'holaj asdf asdf'}
        />
    ]}/>)
    const enviados = ()=>(<MessList list={[
        <Mess
            mess={'holaj asdf asdf'}
        />,
        <Mess
            mess={'holaj asdf asdf'}
        />,
        <Mess
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

export default Message;
