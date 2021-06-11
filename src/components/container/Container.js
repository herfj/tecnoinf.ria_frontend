import React, {Component} from "react";
import Searchbar from '../searchbar/Searchbar'
import './index.css'

const Container =({children,searchbar=true,...props})=>(
    <main>
        {
            searchbar && <Searchbar/>
        }
        <div className='container' {...props}>
            {children}
        </div>
    </main>
)

export default Container