import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner'

const ShowBook = () => {
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    `http://localhost:3000/api/book/${id}`
    useEffect(() => {
        const getDetail = async () => {
            try {
                const detail = await axios.get(`http://localhost:3000/api/book/${id}`);
                setBook(detail.data.data);
                console.log(detail.data.data.title);
                setLoading(false)
            } catch (error) {
                console.log('Error fetching data:', error);
                setLoading(false)
            }
        }
        getDetail();
    }, []);
    return (
        <div className='p-4 '>
            <BackButton />
            <h1 className='text-3xl my-4'>Show Book</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-5 mx-auto'>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500 '>Id</span>
                        <span>{book._id}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500 '>Title</span>
                        <span>{book.title}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500 '>Author</span>
                        <span>{book.author}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500 '>Desc</span>
                        <span>{book.desc}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500 '>Public Year</span>
                        <span>{book.publicYear}</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ShowBook