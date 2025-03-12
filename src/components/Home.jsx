import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AddToPastes, UpadteToPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import cpy from './cpy.png';

const Home = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const allPastes = useSelector((state) => state.paste.pastes);

    function createPaste() {
        if (!title || !value) {
            toast.error("Both title and content must be filled out");
            return;
        }
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        };

        if (pasteId) {
            dispatch(UpadteToPastes(paste));
        } else {
            dispatch(AddToPastes(paste));
        }

        // After creation or updation
        setTitle('');
        setValue('');
        setSearchParams({});
    }

    function handleCopy(pasteContent) {
        navigator.clipboard.writeText(pasteContent);
        toast.success("Copied to clipboard successfully");
    }

    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find((p) => p._id === pasteId);
            setTitle(paste.title);
            setValue(paste.content);
        }
    }, [pasteId]);

    return (
        <div className='p-4 sm:p-2'>
            <div className='flex flex-col sm:flex-row place-content-evenly'>
                <input 
                    className='m-2 p-2 border-radius rounded-xl bg-black w-full sm:w-auto' 
                    type="text"
                    placeholder='Type Here'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button 
                    onClick={createPaste} 
                    className='bg-black px-4 h-12 rounded-xl hover:bg-indigo-500 m-2 w-full sm:w-auto'>
                    {pasteId ? "Update My Paste" : "Create My Paste"}
                </button>
            </div>

            <div className='relative mt-4 bg-black rounded-2xl pt-6 pr-4 min-w-[300px] sm:min-w-[600px] m-2 border border-gray-500'>
                <div className='absolute top-2 left-2 flex space-x-2'>
                    <div className='w-3 h-3 bg-red-500 rounded-full'></div>
                    <div className='w-3 h-3 bg-yellow-500 rounded-full'></div>
                    <div className='w-3 h-3 bg-green-500 rounded-full'></div>
                </div>
                
                <button onClick={() => handleCopy(value)} className='absolute top-2 right-2'>
                    <img src={cpy} alt="Copy" className='w-6 h-6'/>
                </button>
                
                <textarea 
                    value={value}
                    placeholder="Enter content here"
                    className='bg-black rounded-2xl p-3 w-full m-2 border-0' 
                    rows={10}
                    onChange={(e) => setValue(e.target.value)}
                ></textarea>
            </div>
        </div>
    );
};

export default Home;
