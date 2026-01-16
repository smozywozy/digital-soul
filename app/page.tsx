'use client';

import { useState, useEffect } from 'react';
import {
  WagmiProvider,
  createConfig,
  useAccount,
  useConnect,
  useDisconnect,
  useWriteContract,
} from 'wagmi';
import { injected } from 'wagmi/connectors';
import { base } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const CONTRACT_ADDRESS = '0x0e726e4B5d97f1D48B0dCAde6f47eB2b2c449007';

const CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: 'string',
        name: 'tokenURI',
        type: 'string',
      },
    ],
    name: 'mintSoul',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const config = createConfig({
  chains: [base],
  connectors: [injected()],
});

const queryClient = new QueryClient();

function DigitalSoulApp() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { writeContract } = useWriteContract();

  const [birthDate, setBirthDate] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleMint = async () => {
    if (!birthDate) {
      alert('Select your birth date');
      return;
    }

    const metadata = {
      name: 'Digital Soul',
      description: 'Your onchain digital soul',
      attributes: [
        {
          trait_type: 'Soul Archetype',
          value: 'Ethereal Mind',
        },
        {
          trait_type: 'Birth Date',
          value: birthDate,
        },
      ],
    };

    const tokenURI =
      'data:application/json,' +
      encodeURIComponent(JSON.stringify(metadata));

    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'mintSoul',
        args: [tokenURI],
      });
    } catch (e) {
      console.error(e);
      alert('Mint failed. Check console.');
    }
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0b0b0f',
        color: 'white',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          width: 380,
          padding: 24,
          borderRadius: 16,
          background: 'rgba(255,255,255,0.05)',
          boxShadow: '0 0 40px rgba(0,0,0,0.4)',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: 28, marginBottom: 16 }}>Digital Soul</h1>

        {!isConnected ? (
          <button
            onClick={() => connect({ connector: injected() })}
            style={{
              width: '100%',
              padding: 12,
              borderRadius: 10,
              background: '#4f46e5',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Connect Wallet
          </button>
        ) : (
          <>
            <p style={{ fontSize: 12, opacity: 0.7, marginBottom: 8 }}>
              {address}
            </p>

            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 8,
                marginBottom: 12,
              }}
            />

            <button
              onClick={handleMint}
              style={{
                width: '100%',
                padding: 12,
                borderRadius: 10,
                background: '#22c55e',
                border: 'none',
                color: 'black',
                cursor: 'pointer',
                marginBottom: 8,
              }}
            >
              Reveal & Mint
            </button>

            <button
              onClick={() => disconnect()}
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 10,
                background: 'transparent',
                border: '1px solid #555',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              Disconnect
            </button>
          </>
        )}
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <DigitalSoulApp />
      </WagmiProvider>
    </QueryClientProvider>
  );
}
