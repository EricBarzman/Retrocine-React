/* eslint-disable react/prop-types */
import { useState } from "react"
import axios from '@/components/utils/axios';
import toast from "react-hot-toast";
import StarRating from "./StarRating";

function VoteForMovie({ movie }) {

    const defaultForm = {
        comment:'',
        rating: 1,
    }
    const [formData, setFormData] = useState(defaultForm);
    // const [rating, setRating] = useState(1);
  

    function handleChange(e) {
        setFormData({
            ...defaultForm,
            [e.target.name] : e.target.value
        })
    }

    async function submitVote(e) {
        e.preventDefault();
        await axios.post(`votes/vote-for-movie/${movie.id}`, formData)
            .then((response) => {
                console.log(response.data);
                toast.success('Vote sent!');
            })
        setFormData(defaultForm);
    }

    return (
        <div className="w-1/4">
            <form>
                <div className="flex flex-col text-gray-500">
                    <StarRating name='rating' formData={formData} setFormData={setFormData}/>
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-600">Write some comment</label>
                    <input
                        type="text"
                        className="bg-black text-gray-400 border-2 border-gray-600"
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <button
                        onClick={submitVote}
                        type='submit'
                        className='mt-4 rounded-xl px-4 py-2 bg-primary border-2 border-black
                         text-white hover:bg-green-400 transition-all'
                    >Vote</button>
                </div>

            </form>
        </div>
    )
}

export default VoteForMovie