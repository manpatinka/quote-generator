import { useState, useEffect } from 'react';

import '../styles/main.css';

import Quote from '../components/Quote';
import Author from '../components/Author';

const Main = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [data, setData] = useState(null);
  const [authorClicked, setAuthorClicked] = useState(false);
  const [pickedAuthor, setPickedAuthor] = useState('');

  const getRandomQuote = () => {
    if (authorClicked) {
      setAuthorClicked(false);
    }

    if (!data) {
      return <p>Loading...</p>
    }
    let randomNumber = Math.floor(Math.random() * data.length);
    for (let i = 0; i < data.length; i++) {
      if (i === randomNumber) {
        setQuote(data[i].quoteText);
        setAuthor(data[i].quoteAuthor);
        setGenre(data[i].quoteGenre);
      }
    }
  }


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://quote-garden.onrender.com/api/v3/quotes');
        const responseJson = await response.json();
        setData(responseJson.data);
        getRandomQuote();
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const handleMouseClick = (pickedAuthor) => {
    setAuthorClicked(true);
    setPickedAuthor(pickedAuthor);
  }

  let content = authorClicked ? (
    data.map(quote => {
      if (quote.quoteAuthor === pickedAuthor) {
        return <Quote quote={quote.quoteText} key={quote.id} />
      }
    }
    )
  ) : (
    <div className='one-quote'>
      <Quote quote={quote} />
      <Author
        author={author}
        genre={genre}
        handleMouseClick={handleMouseClick}
      />

    </div>

  );



  return (
    <div className='main'>
      <div className='random-button'>
        <button id="random" onClick={getRandomQuote}>random <span className="material-symbols-outlined">
          autorenew
        </span></button>
      </div>

      <div className='all-quotes'>
        <p id='pickedAuthor'>
          {authorClicked && pickedAuthor}
        </p>
        {content}
      </div>
    </div>
  );
}

export default Main;