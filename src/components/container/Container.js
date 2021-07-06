import React, {Component, useEffect} from "react";
import Searchbar from '../searchbar/Searchbar'
import './index.css'
import Connector from "../../utils/connector";

const Container =({actions,isLoading, loggedUser, auth=false, children,searchbar=true, style,...props}) => {
    useEffect(()=>{
        actions.app.validate()
    },[])
    if (isLoading || loggedUser===null){
        return (
            <main>
                {
                    searchbar && <Searchbar/>
                }
                <div className='container' {...props}>
                    <h2>Cargando...</h2>
                </div>
            </main>
        )
    }else{
        return (
            <main>
                {
                    searchbar && <Searchbar/>
                }
                <div className='container' {...props}>
                    {children}
                </div>
            </main>
        )
    }
}

export default (props) => (
    <Connector>
        {({ actions, state: { app } }) => {
            return (
                <Container actions={actions}  {...app} {...props} />
            )
        }}
    </Connector>
)
