import React from 'react'
import { FaPlus } from "react-icons/fa6";


export default function Sidebar() {
    return (
        <div className=' mt-5 mx-5 '>
             <h1 className='fs-3 fw-bold'>LOGO</h1>
            <div className=' mt-5 mx-2 rounded-circle d-flex justify-content-center align-items-center'
             style={{backgroundColor:"black",width:"50px",height:"50px",cursor:'pointer'}}
             
             data-bs-toggle="modal" data-bs-target="#exampleModal"
             
             >
                <FaPlus size={30} className='fs-5 text-white'/>
            </div>
        </div>
    )
}

