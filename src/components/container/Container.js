import React, {Component} from "react";
import Searchbar from '../searchbar/Searchbar'
import './index.css'

const Container =({children})=>(
    <main>
        <Searchbar/>
        <div className='container'>
            {children}
        </div>
    </main>
)

export default Container