import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { set } from 'mongoose'

const DeleteBook = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const handleDeleteBook = async () => {
        try {
            setLoading(true);
            axios.delete(`http://localhost:3000/api/deletebook/${id}`);
            setLoading(false);
            navigate('/')
        } catch (error) {
            setLoading(false);
            alert('An error happened. Please Chack console')
        }
    }

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Delete Book</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] mx-80'>
                <h3 className=' text-2xl m-4' > Are You Sure You want to delete this book?</h3>
                <button className='p-4 bg-red-600 text-white m-8 w-[350px]' onClick={handleDeleteBook}>
                    Yes, Delete it.
                </button>
            </div>
        </div>
    )
}

export default DeleteBook