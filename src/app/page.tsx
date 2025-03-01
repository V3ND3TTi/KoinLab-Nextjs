'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faLinkedin,
  faXTwitter,
  faBitcoin,
  faEthereum,
} from '@fortawesome/free-brands-svg-icons';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from './ThemeContext';

interface CoinPrices {
  bitcoin?: { usd: number };
  ethereum?: { usd: number };
}

export default function Home() {
  const [prices, setPrices] = useState<CoinPrices>({});
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd'
    )
      .then((res) => res.json())
      .then((data: CoinPrices) => setPrices(data))
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  return (
    <div className='flex flex-col min-h-screen'>
      <button
        onClick={toggleTheme}
        className='absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700'
      >
        <FontAwesomeIcon
          icon={theme === 'light' ? faMoon : faSun}
          className='w-6 h-6 text-gray-800 dark:text-gray-200'
        />
      </button>
      <main className='flex-grow flex flex-col items-center justify-center p-4'>
        <h1 className='text-4xl font-bold mb-6 text-blue-400'>
          Welcome to KoinLab
        </h1>
        <p className='text-xl mb-4 text-center'>
          Future home of the world's ultimate crypto-currency!!! For now it's
          API practice. 😊
        </p>
        <div id='crypto-prices' className='text-5xl space-y-2'>
          <p>
            <FontAwesomeIcon id='faBitcoin' icon={faBitcoin} className='mr-2' />
            Bitcoin:{' '}
            <span>
              ${prices.bitcoin?.usd?.toLocaleString() || 'Loading...'}
            </span>
          </p>
          <p>
            <FontAwesomeIcon
              id='faEthereum'
              icon={faEthereum}
              className='mr-2'
            />
            Ethereum:{' '}
            <span>
              $
              {Math.floor(prices.ethereum?.usd || 0).toLocaleString() ||
                'Loading...'}
            </span>
          </p>
        </div>
      </main>
      <footer className='flex justify-center gap-6 py-4 bg-gray-800'>
        <a
          href='https://github.com/v3nd3tti'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FontAwesomeIcon icon={faGithub} className='text-5xl fa-github' />
        </a>
        <a
          href='https://linkedin.com/in/v3nd3tti'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FontAwesomeIcon icon={faLinkedin} className='text-5xl fa-linkedin' />
        </a>
        <a
          href='https://x.com/v3nd3tti'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FontAwesomeIcon
            icon={faXTwitter}
            className='text-5xl fa-x-twitter'
          />
        </a>
      </footer>
    </div>
  );
}
