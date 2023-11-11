import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const EditBook = () => {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [desc, setDesc] = useState('');
    const [publicYear, setPublicYear] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const { id } = useParams()
    useEffect(() => {
        const getDetail = async () => {
            try {
                setLoading(true);
                const detail = await axios.get(`http://localhost:3000/api/book/${id}`);
                // console.log(detail.data.title);
                const { title, author, desc, publicYear } = detail.data;
                console.log(title);
                setTitle(title);
                setAuthor(author);
                setDesc(desc);
                setPublicYear(publicYear);
                setLoading(false)
            } catch (error) {
                setLoading(false);
                alert('An error happened. Please Chack console')
                console.log(error);
            }
        }
        getDetail();
    }, [])
    const handleEditBook = async () => {
        const data = {
            title,
            author,
            desc,
            publicYear
        }
        try {
            setLoading(true)
            await axios.put(`http://localhost:3000/api/updatebook/${id}`, data);
            setLoading(false);
            navigate('/');
        } catch (error) {
            setLoading(false);
            alert('An error happened. Please Chack console')
            console.log(error);
        }
    }


    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Edit Book</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px ] p-4 mx-72'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full ' />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Author</label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full ' />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Desc</label>
                    <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full ' />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Public Year</label>
                    <input type="text" value={publicYear} onChange={(e) => setPublicYear(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full ' />
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>Edit Book</button>
            </div>
        </div>
    )
}

export default EditBook