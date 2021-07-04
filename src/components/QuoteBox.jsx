import React, { useEffect, useState, useRef } from 'react';

// API call function
import { getQuote } from '../util';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

// Facebook share trigger
import { FacebookShareButton } from 'react-share';

const QuoteBox = () => {
  //states
  const [currentQuote, setCurrentQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [opacity, setOpacity] = useState(0);

  const buttonRef = useRef();

  // Updating current quote
  const updateState = async () => {
    setOpacity(0);
    setIsLoading(true);
    const quote = await getQuote();
    setTimeout(() => {
      setCurrentQuote(quote);
      setIsLoading(false);
      setOpacity(1);
    }, 500);
  };

  // AutoClick
  const autoClick = () => {
    setInterval(() => {
      buttonRef.current.click();
    }, 15000);
  };

  // Twitter intent URL
  const tweetUrl = () => {
    return `https://twitter.com/intent/tweet?text="${currentQuote.quote}"%0D%0A-${currentQuote.author}%0D%0A&hashtags=QuoteMachine`;
  };

  // useEffect
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

          <button
            id='new-quote'
            ref={buttonRef}
            disabled={isLoading}
            onClick={updateState}
          >
            {isLoading ? 'On the way..' : 'New Quote'}
          </button>
          <div className='links-container'>
            <a
              href={tweetUrl()}
              rel='noreferrer'
              target='_blank'
              id='tweet-quote'
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <FacebookShareButton
              url='http://randomquo.netlify.app'
              quote={`"${currentQuote.quote}"\n-${currentQuote.author}`}
              hashtag='#QuoteMachine'
            >
              <FontAwesomeIcon id='facebook-share' icon={faFacebook} />
            </FacebookShareButton>
          </div>
        </>
      )}
    </div>
  );
};

export default QuoteBox;
