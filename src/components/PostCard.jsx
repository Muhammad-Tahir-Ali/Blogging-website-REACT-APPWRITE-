import React from "react";
import service from "../appwrite/configure";
import { Link } from "react-router-dom";

const PostCard = ({ $id, featuerdImage, title }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-red text-white rounded-lg">
        <div>
          <img src={service.getFilePreview(featuerdImage)} alt={title} />
        </div>
        <h2 className="text-2xl font-bold text-gray-500"></h2>
      </div>
    </Link>
  );
};

export default PostCard;
