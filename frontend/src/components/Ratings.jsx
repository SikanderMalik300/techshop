import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Ratings = ({ value, text }) => {
    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <span key={index}>
                        {value >= ratingValue ? (
                            <FaStar className="text-yellow-500" />
                        ) : value >= ratingValue - 0.5 ? (
                            <FaStarHalfAlt className="text-yellow-500" />
                        ) : (
                            <FaRegStar className="text-yellow-500" />
                        )}
                    </span>
                );
            })}
            <span className="ml-1 text-gray-600">{text && text}</span>
        </div>
    );
};

export default Ratings;
