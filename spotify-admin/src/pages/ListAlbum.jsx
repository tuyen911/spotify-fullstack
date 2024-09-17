import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { url } from '../App';
import { toast } from 'react-toastify';

const ListAlbum = () => {
  const [data, setData] = useState([]);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      if(response.data.success){
        setData(response.data.albums);
      }
    } catch (error) {
      toast.error('Error occurred while fetching albums');
    }
  };

  const deleteAlbum = async (id) => {
    try {
      const response = await axios.post(`${url}/api/album/remove`,{id});
      if (response.data.success) {
        toast.success('Album deleted successfully');
      
        await fetchAlbums();
       
      } else {
        toast.error('Failed to delete album');
      }
    } catch (error) {
      toast.error('Error occurred while deleting the album');
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div>
      <p>All Album List</p>
      <br/>
      <div>
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Colour</b>
          <b>Action</b>
        </div>
        {data.length > 0 ? (
          data.map((album) => (
            <div key={album._id} className='grid grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
              <img src={album.image} alt="Album Art" className='w-12'/>
              <h3>{album.name}</h3>
              <p>{album.desc}</p>
              <input type='color' value={album.bgColor} />
              <button 
                onClick={() => deleteAlbum(album._id)} 
                className='bg-red-500 text-white p-1'>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No albums available</p>
        )}
      </div>
    </div>
  );
};

export default ListAlbum;
