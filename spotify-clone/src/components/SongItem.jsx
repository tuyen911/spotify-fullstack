import React, { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'

const SongItem = ({name, image, desc, id}) => {
  const {playWithId} = useContext(PlayerContext)
  return (
    <div onClick={() =>playWithId(id)} className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
      <img src={image} alt={name} className="rounded" />
      <h3 className="mt-2 font-bold mb-1">{name}</h3>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  )
}

export default SongItem
