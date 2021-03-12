import React, { useEffect, useState } from 'react';
import { getQuote } from '../util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
// import { motion } from 'framer-motion';

const QuoteBox = () => {
  //states
  const [currentQuote, setCurrentQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [opacity, setOpacity] = useState(0);

  // Updating current quote
  const updateState = async () => {
    setOpacity(0);
    setIsLoading(true);
    const quote = await getQuote();
    setCurrentQuote(quote);
    setIsLoading(false);
    setOpacity(1);
  };

  const tweetUrl = () => {
    return `https://twitter.com/intent/tweet?text="${currentQuote.quote}"%0D%0A-${currentQuote.author}%0D%0A&hashtags=QuoteMachine,KhaledAyman`;
  };

  useEffect(() => {
    updateState();
  }, []);

  return (
    <div id='quote-box'>
      {currentQuote && (
        <>
          <div className='quote-container' style={{ opacity: opacity }}>
            <p id='text'>
              <span id='quote-icon'>
                <FontAwesomeIcon icon={faQuoteLeft} />
              </span>
              {currentQuote.quote}
            </p>
            <p id='author'>-{currentQuote.author}</p>
          </div>

          <button id='new-quote' onClick={updateState}>
            {isLoading ? 'On the way..' : 'New Quote'}
          </button>
          <a
            href={tweetUrl()}
            rel='noreferrer'
            target='_blank'
            id='tweet-quote'
          >
            <FontAwesomeIcon icon={faTwitterSquare} />
          </a>
        </>
      )}
    </div>
  );
};

export default QuoteBox;
