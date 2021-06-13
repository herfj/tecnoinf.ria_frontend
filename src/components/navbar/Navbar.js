import React, {Component, useState} from "react";
import { Link } from 'react-router-dom';
import {Button,ButtonLink} from '../button/Button';
import {useWindowSize} from "../../helpers/useWindowSize";
import './index.css'

const Routes = ({extraButtons = null, isMobil=false}) => {
    const style = !isMobil ? {
        width: '120px'
    }:{}
    return (
        <div className={'routes'}>
            <ButtonLink
                style={style}
                to='/explorer'
            >
                Explorar
            </ButtonLink>
            {extraButtons}
        </div>
    )
}

const Navbar = ({}) => {
    const [open, setOpen] = useState(false);
    const size = useWindowSize()

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
                            <Routes />
                            <div className={'navbar-l-btn'}>
                                <Button
                                    type={'secondary'}
                                    style={{
                                        alignSelf: 'center',
                                        width: 120,
                                    }}
                                >
                                    Login
                                </Button>
                                 <Button
                                    type={'secondary'}
                                    style={{
                                        alignSelf: 'center',
                                        marginLeft: 10,
                                        width: 120,
                                    }}
                                >
                                     Registarte
                                </Button>
                            </div>
                        </>
                    ) :
                    (
                        <>
                            <div className={'navbar-l-btn'}>
                                <Button
                                    type={'secondary'}
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
                                            extraButtons={(
                                                <>
                                                    <ButtonLink
                                                        to={'/'}
                                                        type={'secondary'}
                                                        style={{
                                                            marginTop: 7,
                                                        }}
                                                    >
                                                        Login
                                                    </ButtonLink>
                                                    <ButtonLink
                                                        to={'/'}
                                                        type={'secondary'}
                                                    >
                                                        Registarte
                                                    </ButtonLink>
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
}

export default React.memo(Navbar);
