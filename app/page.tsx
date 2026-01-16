'use client';

import { useState } from 'react';
import { createConfig, WagmiProvider, useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { base } from 'wagmi/chains';
import { http } from 'viem';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { writeContract } from 'wagmi/actions';

const config = createConfig({
  chains: [base],
  connectors: [injected()],
  transports: {
    [base.id]: http(),
  },
});

const queryClient = new QueryClient();

const CONTRACT_ADDRESS = '0x68fDEfeC02cB0a25cDf7a7943c4661BCC29c16f1';

const ABI = [
  {
    inputs: [{ internalType: 'string', name: 'tokenURI', type: 'string' }],
    name: 'mintSoul',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

function DigitalSoulApp() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const [birthDate, setBirthDate] = useState('');
  const [status, setStatus] = useState('');

  const buildTokenURI = () => {
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

    return `data:application/json,${encodeURIComponent(
      JSON.stringify(metadata)
    )}`;
  };

  const mint = async () => {
    if (!birthDate) {
      alert('Select birth date');
      return;
    }

    try {
      setStatus('Minting...');
      await writeContract(config, {
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: 'mintSoul',
        args: [buildTokenURI()],
      });
      setStatus('Minted successfully ✨');
    } catch (e) {
      console.error(e);
      setStatus('Mint failed');
    }
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#0b0b0b',
        color: '#fff',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div
        style={{
          width: 400,
          padding: 24,
          borderRadius: 16,
          background: '#111',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: 28, marginBottom: 12 }}>Digital Soul</h1>
        <p style={{ opacity: 0.7, marginBottom: 20 }}>
          Reveal your onchain archetype
        </p>

        {!isConnected ? (
          <button
            onClick={() => connect({ connector: injected() })}
            style={{
              padding: '12px 20px',
              borderRadius: 12,
              border: 'none',
              cursor: 'pointer',
              fontSize: 16,
            }}
          >
            Connect Wallet
          </button>
        ) : (
          <>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              style={{
                width: '100%',
                padding: 12,
                borderRadius: 8,
                border: 'none',
                marginBottom: 12,
              }}
            />

            <button
              onClick={mint}
              style={{
                width: '100%',
                padding: 12,
                borderRadius: 12,
                border: 'none',
                cursor: 'pointer',
                fontSize: 16,
              }}
            >
              Mint Digital Soul
            </button>

            <p style={{ marginTop: 12, fontSize: 14 }}>{status}</p>

            <button
              onClick={() => disconnect()}
              style={{
                marginTop: 12,
                background: 'transparent',
                color: '#888',
                border: 'none',
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
