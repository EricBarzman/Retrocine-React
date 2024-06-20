/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoMdStar } from "react-icons/io";

const StarRating = ({ formData, setFormData }) => {
  const [hover, setHover] = useState(null);

  return (
    <div className="flex flex-row">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          // eslint-disable-next-line react/jsx-key
          <label>
            <input
              type="radio"
              className="hidden"
              name="rating"
              value={ratingValue}
              onClick={() => setFormData( {...formData, rating: ratingValue})}
            />
            <IoMdStar
              key={i}
              className="star"
              size={30}
              color={ratingValue <= (hover || formData.rating) ? "#2B2073" : "#e4e5e9"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
