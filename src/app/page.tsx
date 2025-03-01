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

interface CoinPrices {
  bitcoin?: { usd: number };
  ethereum?: { usd: number };
}

export default function Home() {
  const [prices, setPrices] = useState<CoinPrices>({});

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
      <main className='flex-grow flex flex-col items-center justify-center p-4'>
        <h1 className='text-4xl font-bold mb-6 text-blue-400'>
          Welcome to KoinLab
        </h1>
        <p className='text-xl mb-6 text-center'>
          Future home of the world's greatest cryptocurrency!!! For now this
          site is a placeholder.
        </p>
        <div className='text-5xl space-y-2'>
          <p>
            <FontAwesomeIcon
              icon={faBitcoin}
              id='faBitcoin'
              className='mr-2 text-5xl'
            />
            Bitcoin:{' '}
            <span className='font-semibold text-5xl'>
              ${prices.bitcoin?.usd?.toLocaleString() || 'Loading...'}
            </span>
          </p>
          <p>
            <FontAwesomeIcon
              icon={faEthereum}
              id='faEthereum'
              className='mr-2 text-5xl'
            />
            Ethereum:{' '}
            <span className='font-semibold text-5xl'>
              ${prices.ethereum?.usd?.toLocaleString() || 'Loading...'}
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
          <FontAwesomeIcon
            icon={faGithub}
            className='w-6 h-6 hover:text-gray-400'
          />
        </a>
        <a
          href='https://linkedin.com/in/v3nd3tti'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FontAwesomeIcon
            icon={faLinkedin}
            className='w-6 h-6 hover:text-gray-400'
          />
        </a>
        <a
          href='https://x.com/v3nd3tti'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FontAwesomeIcon
            icon={faXTwitter}
            className='w-6 h-6 hover:text-gray-400'
          />
        </a>
      </footer>
    </div>
  );
}
