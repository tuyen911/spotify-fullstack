import React, { useContext, useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/frontend-assets/assets';
import { PlayerContext } from '../context/PlayerContext';

const DisplayAlbum = () => {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState(null);
  const { playWithId, albumsData, songsData } = useContext(PlayerContext);

  useEffect(() => {
    const selectedAlbum = albumsData.find((album) => album._id === id);
    setAlbumData(selectedAlbum);
  }, [id, albumsData]);

  return albumData ? (
    <>
      <Navbar />
      <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
        <img className='w-48 rounded' src={albumData.image} alt={albumData.name} />
        <div className='flex flex-col'>
          <p>Playlist</p>
          <h2 className='text-5xl font-bold mb-4 md:text-7xl'>{albumData.name}</h2>
          <h4>{albumData.desc}</h4>
          <p className='mt-1'>
            <img className='inline-block w-5' src={assets.spotify_logo} alt='Spotify logo' />
            <b>Spotify</b>
            <p>1,323,145 likes</p>
            {/* <b>50 songs, about 2 hr 30 min</b> */}
          </p>
        </div>
      </div>
      <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#7a7a7a]'>
        <p><b className='mr-4'>#</b> Title</p>
        <p>Album</p>
        <p className='hidden sm:block'>Date Added</p>
        <img className='m-auto w-4' src={assets.clock_icon} alt='Clock icon' />
      </div>
      <hr />
      {songsData.filter((song) => song.album === albumData.name).map((item, index) => (
        <div
          onClick={() => playWithId(item._id)}
          key={item.id}
          className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#7a7a7a] hover:bg-[#ffffff2b] cursor-pointer'
        >
          <p className='text-white'>
            <b className='mr-4 text-[#7a7a7a]'>{index + 1}</b>
            <img className='inline w-10 mr-5' src={item.imageUrl} alt={item.name} />
            {item.name}
          </p>
          <p className='text-[15px]'>{albumData.name}</p>
          <p className='text-[15px] hidden sm:block'>5 days ago</p>
          <p className='text-[15px] text-center'>{item.duration}</p>
        </div>
      ))}
    </>
  ) : (
    <p>Loading...</p>
  );
};

export default DisplayAlbum;