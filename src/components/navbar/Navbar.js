import React, {Component, useState} from "react";
import {Link, useLocation} from 'react-router-dom';
import {Button, ButtonLink} from '../button/Button';
import {useWindowSize} from "../../helpers/useWindowSize";
import './index.css'
import Connector from "../../utils/connector";

const Routes = ({loggedUser,extraButtons = null, isMobil = false}) => {
    const style = !isMobil ? {
        width: '120px',
        margin: 5
    } : {}
    return (
        <div className={'routes'}>
            {
                loggedUser === null ? (
                    <>
                        <ButtonLink
                            style={style}
                            to='/explorer'
                        >
                            Explorar
                        </ButtonLink>

                    </>
                ) : (
                    <>
                        <ButtonLink
                            style={style}
                            to='/explorer'
                        >
                            Explorar
                        </ButtonLink>
                        <ButtonLink
                            style={style}
                            to='/messages'
                        >
                            Mensajes
                        </ButtonLink>

                    </>
                )
            }
            {extraButtons}
        </div>
    )
}

const Navbar = ({loggedUser}) => {
    const [open, setOpen] = useState(false);
    const size = useWindowSize()
    const location = useLocation();

    if ('/login' != location.pathname && '/register' != location.pathname) {
        return (
            <navbar>
                <Link
                    className={'logo'}
                    to={'/home'}
                    style={{
                        textDecoration: 'none',
                    }}
                >
                    <h1>DesignPro</h1>
                </Link>
                {
                    size.width > 1200 ? (
                            <>
                                <Routes
                                    loggedUser={loggedUser}
                                />
                                <div className={'navbar-l-btn'}>
                                    {loggedUser ? (
                                        <>
                                            <ButtonLink
                                                to={'/profile/'+loggedUser.Email}
                                                styleType={'secondary'}
                                                style={{
                                                    alignSelf: 'center',
                                                    width: 120,
                                                }}
                                            >
                                                {loggedUser.Nombre}
                                            </ButtonLink>
                                        </>
                                    ) : (
                                        <>
                                            <ButtonLink
                                                to={'/login'}
                                                styleType={'secondary'}
                                                style={{
                                                    alignSelf: 'center',
                                                    width: 120,
                                                }}
                                            >
                                                Login
                                            </ButtonLink>
                                            <ButtonLink
                                                to={'/register'}
                                                styleType={'secondary'}
                                                style={{
                                                    alignSelf: 'center',
                                                    marginLeft: 10,
                                                    marginRight: 15,
                                                    width: 120,
                                                }}
                                            >
                                                Registarte
                                            </ButtonLink>
                                        </>
                                    )}

                                </div>
                            </>
                        ) :
                        (
                            <>
                                <div className={'navbar-l-btn'}>
                                    <Button
                                        styleType={'secondary'}
                                        onClick={() => {
                                            console.log(open)
                                            setOpen(!open)
                                        }}
                                        style={{
                                            alignSelf: 'center',
                                            width: 120,
                                        }}
                                    >
                                        Menu
                                    </Button>
                                </div>

                                {
                                    open && (
                                        <>
                                            <Routes
                                                isMobil={true}
                                                loggedUser={loggedUser}
                                                extraButtons={(
                                                    <>
                                                        {loggedUser ? (
                                                            <>
                                                                <ButtonLink
                                                                    to={'/profile/'+loggedUser.Email}
                                                                    styleType={'secondary'}
                                                                    style={{
                                                                        marginTop: 7,
                                                                    }}
                                                                >
                                                                    {loggedUser.Nombre}
                                                                </ButtonLink>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <ButtonLink
                                                                    to={'/login'}
                                                                    styleType={'secondary'}
                                                                    style={{
                                                                        marginTop: 7,
                                                                    }}
                                                                >
                                                                    Login
                                                                </ButtonLink>
                                                                <ButtonLink
                                                                    to={'/register'}
                                                                    styleType={'secondary'}
                                                                >
                                                                    Registarte
                                                                </ButtonLink>

                                                            </>
                                                        )}
                                                    </>

                                                )}
                                            />
                                        </>
                                    )
                                }
                            </>
                        )
                }

            </navbar>
        )
    } else {
        return (<></>)
    }
}


export default (props) => (
    <Connector>
        {({actions, state: {app}}) => {
            return (
                <Navbar actions={actions}  {...app} {...props} />
            )
        }}
    </Connector>
)
