// import React from 'react'
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // ✅ Import useDispatch
import { AddToPastes, UpadteToPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import copyImg from './cpy.png'
const ViewPaste = () => {

  function handleCopy(pasteContent) {
    navigator.clipboard.writeText(pasteContent);
    toast.success("Copied to clipboard successfully");
  }

  const {id}=useParams();
   const allPastes=useSelector((state)=>
    state.paste.pastes)

   const paste=allPastes.filter((p)=>p._id===id)[0]

  return (
    <div>
      
    <div className='flex flex-row place-content-evenly'>
        <input 
            className='m-2 p-2 border-radius rounded-xl bg-black' 
            type="text"
            placeholder='Type Here'
            value={paste.title}
            disabled
            onChange={(e) => setTitle(e.target.value)}
        />
       
    </div>

    <div className='relative mt-4 bg-black rounded-2xl p-5 min-w-[300px] sm:min-w-[600px] m-2 border border-gray-500'>
        <div className='absolute top-2 left-2 flex space-x-2'>
          <div className='w-3 h-3 bg-red-500 rounded-full'></div>
          <div className='w-3 h-3 bg-yellow-500 rounded-full'></div>
          <div className='w-3 h-3 bg-green-500 rounded-full'></div>
        </div>
        
        <button onClick={() => handleCopy(paste.content)} className='absolute top-2 right-2'>
          <img src={copyImg} alt="jvj" className='w-7 h-7'/>
        </button>
        
        <textarea 
          value={paste ? paste.content : ''}
          placeholder="Enter content here"
          className='bg-black p-3 w-full border-0 rounded-lg'
          rows={20}
          disabled
        ></textarea>
      </div>
    </div>
  )
}

export default ViewPaste
