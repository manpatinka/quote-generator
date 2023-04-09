import { useState } from 'react';
import '../styles/author.css';

const Author = (props) => {
    const { author, genre } = props;
    const [isHover, setIsHover] = useState(true);

    const handleMouseEnter = () => {
        setIsHover(false);
     };
     const handleMouseLeave = () => {
        setIsHover(true);
     };

    const styles = {
        color: isHover ? 'transpartent' : 'white'
    }

    const handleMouseClick = () => {
        props.handleMouseClick(author);
    }

    return (
        <div 
          className='author-block'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleMouseClick}
          >
            <div>
                <p id='author-p'>{author}</p>
                <p id='genre-p'>{genre}</p>
            </div>

            <div className='symbol-arrow' style={styles}>
                <span className="material-symbols-outlined" >
                    arrow_forward
                </span>
            </div>

        </div>
    );
}

export default Author;