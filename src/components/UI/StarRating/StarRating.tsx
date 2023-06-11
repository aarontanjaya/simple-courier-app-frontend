import React, { useState } from 'react';
import styles from './StarRating.module.scss';
type StarRatingProps = {
  className?: string | undefined;
  rating: number;
  disabled?: boolean;
  setRating: React.Dispatch<React.SetStateAction<number>>;
};
export default function StarRating({
  rating,
  setRating,
  disabled=false,
  className,
}: StarRatingProps) {
  const [hover, setHover] = useState(0);
  return (
    <div>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            key={index}
            disabled={disabled}
            className={`${className} ${styles.button}  ${
              index <= (hover || rating) ? styles.on : styles.off
            }`}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className='star'>&#9733;</span>
          </button>
        );
      })}
    </div>
  );
}
