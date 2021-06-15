import React, {Component, useState} from "react";
import {Link, useLocation} from 'react-router-dom';
import {Button, ButtonLink} from '../button/Button';
import {useWindowSize} from "../../helpers/useWindowSize";
import './index.css'

const Routes = ({extraButtons = null, isMobil = false}) => {
    const style = !isMobil ? {
        width: '120px'
    } : {}
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
    const location = useLocation();

    if ('/login' != location.pathname) {
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
                                <Routes/>
                                <div className={'navbar-l-btn'}>
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
                                        to={'/login'}
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
                                                extraButtons={(
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
                                                            to={'/'}
                                                            styleType={'secondary'}
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
    }else{
        return (<></>)
    }
}

export default React.memo(Navbar);
