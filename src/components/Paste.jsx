import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RemoveAllPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import share from './shr.png';
import copy from './copy.png';
import view from './view.png';
import edit from './edit.png';
import dlt from './delt.png';
import calendar from './calendar.webp';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const filterData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes(
      searchTerm.toLowerCase()
    )
  );

  function handleDelete(pasteId) {
    dispatch(RemoveAllPastes(pasteId));
  }

  function handleShare(pasteId) {
    const shareableLink = `${window.location.origin}/?pasteId=${pasteId}`;
    navigator.clipboard.writeText(shareableLink);
    toast.success("Shareable link copied to clipboard");
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()]; // Using month names
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  return (
    <div className='p-4'>
      <input
        className='p-2 bg-black rounded-xl w-full sm:min-w-[600px] mb-4'
        type="search"
        placeholder='search here'
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value)
        }}
      />
      <div className='flex flex-col gap-5'>
        {
          filterData.length > 0 && filterData.map(
            (paste) => {
              return (
                <div className='border p-2 m-2 rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-4'
                  key={paste._id}>  {/* Add unique key */}
                  <div>
                    <h1 className='text-lg'>{paste.title}</h1>
                    <div className='line-clamp-3'>{paste.content}</div>
                  </div>
                  <div className='flex flex-col gap-2 justify-between'>
                    <div className='flex flex-wrap gap-2 self-end'>
                      <button className='bg-white p-1 rounded-xl'>
                        <Link to={`/?pasteId=${paste?._id}`}><img className='w-5 h-5' src={edit} alt="Edit" /></Link>
                      </button>
                      <button onClick={() => handleDelete(paste._id)} className='bg-white p-1 rounded-xl'><img className='w-5 h-5' src={dlt} alt="Delete" /></button>
                      <button className='bg-white p-1 rounded-xl'>
                        <Link to={`/pastes/${paste?._id}`}><img className='w-5 h-5' src={view} alt="View" /></Link>
                      </button>
                      <button onClick={() =>
                        {navigator.clipboard.writeText
                        (paste?.content)
                        toast.success("Copy to clipboard success")}} className='bg-white p-1 rounded-xl'><img className='w-5 h-5' src={copy} alt="Copy" /></button>
                      <button onClick={() => handleShare(paste._id)} className='bg-white p-1 rounded-xl'><img className='w-5 h-5' src={share} alt="Share" /></button>
                    </div>
                    <div className='self-end flex gap-2'><img className='bg-white p-1 rounded-xl w-7 h-8' src={calendar} alt="Date" /> {formatDate(paste.createdAt)}</div>
                  </div>
                </div>
              )
            }
          )
        }
      </div>
    </div>
  );
}

export default Paste;
