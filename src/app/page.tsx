import ClientHome from './ClientHome';

async function getCoinPrices() {
  const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');

  return res.json();
}

export default async function HomePage() {
  const prices = await getCoinPrices();

  return (
    <div>
      <ClientHome prices={prices} />
    </div>
  );
}
