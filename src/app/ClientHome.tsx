'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faXTwitter, faBitcoin, faEthereum } from '@fortawesome/free-brands-svg-icons';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from './ThemeContext';

interface CoinPrices {
  bitcoin?: { usd: number };
  ethereum?: { usd: number };
}

interface ClientHomeProps {
  prices: CoinPrices;
}

export default function ClientHome({ prices }: ClientHomeProps) {
  const { theme, toggleTheme } = useTheme();
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => setIsPanelOpen(!isPanelOpen);
  const closePanel = () => setIsPanelOpen(false);

  return (
    <div className='flex flex-col min-h-screen relative' onClick={isPanelOpen ? closePanel : undefined}>
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
        <h1 className='text-4xl font-bold mb-6 text-blue-400'>Welcome to KoinLab</h1>
        <p className='text-xl text-center mb-6'>
          Future home of the world's ultimate crypto-currency!!! For now it's API practice 🤓
        </p>
        <div id='crypto-prices' className='text-4xl space-y-2 mb-6'>
          <p>
            <FontAwesomeIcon icon={faBitcoin} className='mr-2 text-4xl fa-btc' />
            Bitcoin: <span>${prices.bitcoin?.usd?.toLocaleString() || 'Loading...'}</span>
          </p>
          <p>
            <FontAwesomeIcon icon={faEthereum} className='mr-2 text-4xl fa-eth' />
            Ethereum: <span>${Math.floor(prices.ethereum?.usd || 0).toLocaleString() || 'Loading...'}</span>
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
          <h2 className='text-lg font-semibold text-white mb-4 text-center'>Connect with Me</h2>
          <div className='flex justify-center gap-6'>
            <a href='https://github.com/v3nd3tti' target='_blank' rel='noopener noreferrer'>
              <FontAwesomeIcon icon={faGithub} className='text-5xl' />
            </a>
            <a href='https://linkedin.com/in/v3nd3tti' target='_blank' rel='noopener noreferrer'>
              <FontAwesomeIcon icon={faLinkedin} className='text-5xl' />
            </a>
            <a href='https://x.com/v3nd3tti' target='_blank' rel='noopener noreferrer'>
              <FontAwesomeIcon icon={faXTwitter} className='text-5xl' />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
