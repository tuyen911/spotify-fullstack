import React from "react";
import { useNavigate } from "react-router-dom";

const AlbumItem = ({ name, desc, image, id }) => {

    const navigate = useNavigate()
  return (
    <div onClick={()=>navigate(`/album/${id}`)}  className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
      <img src={image} alt={name} className="rounded" />
      <h3 className="mt-2 font-bold mb-1">{name}</h3>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
    
  );
}

export default AlbumItem;
