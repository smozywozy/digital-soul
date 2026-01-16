'use client';

import { useState } from 'react';

const CONTRACT_ADDRESS = '0x68fDEfeC02cB0a25cDf7a7943c4661BCC29c16f1';

const ABI_SIGNATURE = 'mintSoul(string)';

function stringToHex(str: string) {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export default function Page() {
  const [status, setStatus] = useState('');

  const mintSoul = async () => {
    const ethereum = (window as any).ethereum;
    if (!ethereum) {
      alert('Wallet not found');
      return;
    }

    try {
      setStatus('Waiting for wallet...');

      const [from] = await ethereum.request({
        method: 'eth_requestAccounts'
      });

      const metadata = {
        name: 'Digital Soul',
        description: 'Your onchain digital soul',
        attributes: [
          { trait_type: 'Soul Archetype', value: 'Ethereal Mind' },
          { trait_type: 'Birth Date', value: '1986-04-09' }
        ]
      };

      const tokenURI =
        'data:application/json,' +
        encodeURIComponent(JSON.stringify(metadata));

      const functionSelector = '0xbb02845d'; // keccak("mintSoul(string)") first 4 bytes
      const encodedArg = stringToHex(tokenURI);
      const lengthHex = tokenURI.length.toString(16).padStart(64, '0');

      const data =
        functionSelector +
        lengthHex +
        encodedArg.padEnd(Math.ceil(encodedArg.length / 64) * 64, '0');

      setStatus('Confirm transaction in wallet...');

      await ethereum.request({
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
    } catch (err) {
      console.error(err);
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
