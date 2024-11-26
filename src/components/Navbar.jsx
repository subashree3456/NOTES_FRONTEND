import React from 'react'
import { useNavigate } from 'react-router-dom'
import { post } from '../services/ApiEndPoint'
import toast from 'react-hot-toast'

export default function Navbar() {

  const navigate= useNavigate()


  const handleLogout=async()=>{
    try {

      const request=await post('/auth/logout')
      const response= request.data
      console.log('message',response.message)
      if (response.success) {
        toast.success(response.message)
       //  disptach(logout())
        navigate('/login')
      }
      
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message)
      }
    //  console.log(error)
    }
  }



  return (
   <>
   
   <nav className="navbar ">
   <div className="container-fluid p-2 ">

   <input  type="text" name="" id=""  placeholder="Search" className='mx-3 searchinput' />
   <button className='btn btn-dark text-white mx-3' onClick={handleLogout}>Logout</button>

   </div>
   </nav>
   
   </>
  )
}
