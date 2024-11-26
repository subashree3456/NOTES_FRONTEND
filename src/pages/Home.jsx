import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import Notes from '../components/Notes'
import NoteModal from '../components/NoteModal'
import { get, post , put , dele } from '../services/ApiEndPoint';
import toast from 'react-hot-toast';
import UpdateModel from '../components/UpdateModel';
import DeleteModal from '../components/DeleteModal';

export default function Home() {

    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [updatenote, setUpdatenote] = useState('');
    const [notesId, setNotesId] = useState('');
    if (notes) {
        console.log("res", notes);
    }

    useEffect(() => {
        const getNotes = async () => {
            try {
                const request = await get('/notes/GetNotes');
                const response = request.data;
                setNotes(response.Notes);
            } catch (error) {
                console.log(error);
            }
        };
        getNotes();
    }, [refresh]);

    // Function to format the date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };


    const handleCretNote = async () => {
        try {
            const request = await post('/notes/createnote', { title });
            const respone = request.data

            if (respone.success) {
                toast.success(respone.message)
                setRefresh(!refresh);

            }

            console.log("createnoteResponse", respone)
        }
        catch (error) {



            if (error.response) {
                toast.error(error.response.data.message);
            }

        }
    }

    const handleUpdateNote =async () =>{
        try{
         //   alert(notesId)
           const request = await put(`/notes/updateNotes/${notesId}`, { title: updatenote });
           const response = request.data;
          
           if (response.success) {
            toast.success(response.message)
            setRefresh(!refresh);

        }


        }catch(error){
            if (error.response) {
                toast.error(error.response.data.message);
            }

            console.log(error);
        }
    }


    const handleDelet = async () =>{
        try{
            const requrest = await dele(`/notes/deleteNotes/${notesId}`);
            const response = requrest.data;
            if (response.success) {
                toast.success(response.message)
                setRefresh(!refresh);

            }

        }catch(error){
            if (error.response) {
                toast.error(error.response.data.message);
            }
        }
       // alert(notesId);
    }


    return (
        <>
            <NoteModal title={"Create Note"} value={title} handelTitleChange={(e) => setTitle(e.target.value)} handleCretNote={handleCretNote} />

<UpdateModel  title={"Update Notes"} value={updatenote} handelTitleChange={(e) => setUpdatenote(e.target.value)} handleUpdateNote={handleUpdateNote}/>

<DeleteModal handleDelet={handleDelet}/>    


            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-2 col-md-2 min-vh-100 shadow">
                        <Sidebar />
                    </div>
                    <div className="col-lg-10 col-md-10">
                        <Navbar />
                        <div className="mt-3 mx-5">
                            <h1 className='fs-2 fw-bold'>NOTES</h1>
                        </div>

                        <div className="row mt-4 mx-5">
                            {
                                notes && notes.map((elem) => {
                                    return (

                                        <div className="col-md-4 mb-5 col-lg-4">
                                            <Notes date={formatDate(elem.createdAt)} title={elem.title} handleUpdate={()=>setNotesId(elem._id)}/>
                                        </div>
                                    )
                                })
                            }




                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}





// 6707b51a05b1b448f0f92c29