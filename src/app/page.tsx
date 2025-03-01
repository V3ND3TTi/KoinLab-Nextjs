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
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd'
    )
      .then((res) => res.json())
      .then((data: CoinPrices) => setPrices(data))
      .catch((err) => console.error('Fetch Error:', err));
  }, []);

  const togglePanel = () => setIsPanelOpen(!isPanelOpen);
  const closePanel = () => setIsPanelOpen(false);

  return (
    <div
      className='flex flex-col min-h-screen relative'
      onClick={isPanelOpen ? closePanel : undefined}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleTheme();
        }}
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
        <p className='text-xl text-center mb-6'>
          Future home of the worlds ultimate crypto-currency!!! For now its API
          practice 😊
        </p>
        <div id='crypto-prices' className='text-5xl space-y-2 mb-6'>
          <p>
            <FontAwesomeIcon
              id='faBitcoin'
              icon={faBitcoin}
              className='mr-2 text-5xl'
            />
            Bitcoin:{' '}
            <span>
              ${prices.bitcoin?.usd?.toLocaleString() || 'Loading...'}
            </span>
          </p>
          <p>
            <FontAwesomeIcon
              id='faEthereum'
              icon={faEthereum}
              className='mr-2 text-5xl'
            />
            Ethereum:{' '}
            <span>
              $
              {Math.floor(prices.ethereum?.usd || 0).toLocaleString() ||
                'Loading...'}
            </span>
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePanel();
          }}
          className='text-lg font-semibold text-blue-400 hover:text-blue-600 dark:hover:text-blue-300'
        >
          Socials
        </button>
      </main>
      <footer
        className={`fixed bottom-0 left-0 w-full h-30 bg-gray-800 transform transition-transform duration-300 ${
          isPanelOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className='p-4'>
          <h2 className='text-lg font-semibold text-white mb-4 text-center'>
            Connect with Me
          </h2>
          <div className='flex justify-center gap-6'>
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
              <FontAwesomeIcon
                icon={faLinkedin}
                className='text-5xl fa-linkedin'
              />
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
          </div>
        </div>
      </footer>
    </div>
  );
}
