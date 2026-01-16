'use client';

import { useState } from 'react';

const CONTRACT_ADDRESS = '0x68fDEfeC02cB0a25cDf7a7943c4661BCC29c16f1';

const ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "tokenURI", "type": "string" }
    ],
    "name": "mintSoul",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export default function Page() {
  const [status, setStatus] = useState<string>('');

  const mintSoul = async () => {
    if (!(window as any).ethereum) {
      alert('Wallet not found');
      return;
    }

    try {
      setStatus('Waiting for wallet...');

      const provider = (window as any).ethereum;
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      const from = accounts[0];

      const tokenURI =
        'data:application/json,' +
        encodeURIComponent(
          JSON.stringify({
            name: 'Digital Soul',
            description: 'Your onchain digital soul',
            attributes: [
              { trait_type: 'Soul Archetype', value: 'Ethereal Mind' },
              { trait_type: 'Birth Date', value: '1986-04-09' }
            ]
          })
        );

      const data =
        '0xbb02845d' +
        tokenURI.length.toString(16).padStart(64, '0') +
        Buffer.from(tokenURI).toString('hex');

      setStatus('Confirm transaction in wallet...');

      await provider.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from,
            to: CONTRACT_ADDRESS,
            data
          }
        ]
      });

      setStatus('✨ Soul minted successfully!');
    } catch (e: any) {
      console.error(e);
      setStatus('❌ Mint cancelled or failed');
    }
  };

  return (
    <main style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>Digital Soul</h1>
      <button
        onClick={mintSoul}
        style={{
          padding: '12px 24px',
          fontSize: 18,
          cursor: 'pointer'
        }}
      >
        Mint Soul
      </button>
      <p>{status}</p>
    </main>
  );
}
