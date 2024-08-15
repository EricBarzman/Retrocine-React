import { IoStar } from "react-icons/io5";
import { IoStarHalfSharp } from "react-icons/io5";
/* eslint-disable react/prop-types */

function CommentCard({ vote }) {
  return (
    <div className="p-3 mb-3 border-2 rounded-md border-gray-800">
        <h2 className="text-sm text-primary">
            {vote.created_by.username} <span className="text-gray-600 text-sm">{vote.created_at}</span>
            <div className="flex flex-row mb-2 text-white">
                {vote.rating >= 1 && (<IoStar />)}
                {vote.rating > 1 && vote.rating < 2 && (<IoStarHalfSharp />)}
                {vote.rating >= 2 && (<IoStar />)}
                {vote.rating > 2 && vote.rating < 3 && (<IoStarHalfSharp />)}
                {vote.rating >= 3 && (<IoStar />)}
                {vote.rating > 3 && vote.rating < 4 && (<IoStarHalfSharp />)}
                {vote.rating >= 4 && (<IoStar />)}
                {vote.rating > 4 && vote.rating < 5 && (<IoStarHalfSharp />)}
                {vote.rating >= 5 && (<IoStar />)}
            </div>
        </h2>
        <p className="text-sm">{vote.comment}</p>
    </div>
  )
}

export default CommentCard