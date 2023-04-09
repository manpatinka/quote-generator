import '../styles/quote.css';

const Quote = (props) => {

    return ( 
        <div className='quote-div'>
          {props.quote}
        </div> 
     );
}
 
export default Quote;