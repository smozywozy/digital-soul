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

const CONTRACT_ADDRESS = '0x68fDEfeC02cB0a25cDf7a7943c4661BCC29c16f1';

const CONTRACT_ABI = [
  {
    inputs: [{ name: 'tokenURI', type: 'string' }],
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

const SOULS = [
  'Ethereal Mind',
  'Solar Core',
  'Lunar Echo',
  'Void Walker',
  'Neural Flame',
  'Astral Weaver',
  'Chrono Seed',
  'Quantum Tide',
  'Celestial Root',
  'Digital Oracle',
  'Stellar Nomad',
  'Infinity Spark',
];

function getSoul(date: string) {
  const seed = new Date(date).getTime();
  return SOULS[seed % SOULS.length];
}

function DigitalSoulApp() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { writeContractAsync, isPending } = useWriteContract();

  const [mounted, setMounted] = useState(false);
  const [birthDate, setBirthDate] = useState('');
  const [soul, setSoul] = useState<string | null>(null);
  const [minted, setMinted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const mint = async () => {
    if (!soul || !address) return;

    const metadata = {
      name: 'Digital Soul',
      description: 'Your onchain digital soul',
      attributes: [
        { trait_type: 'Soul Archetype', value: soul },
        { trait_type: 'Birth Date', value: birthDate },
      ],
    };

    const encoded = `data:application/json,${encodeURIComponent(
      JSON.stringify(metadata)
    )}`;

    try {
      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'mintSoul',
        args: [encoded],
      });

      setMinted(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main style={styles.main}>
      <div style={styles.card}>
        <h1>Digital Soul</h1>

        {!isConnected && (
          <button style={styles.button} onClick={() => connect({ connector: injected() })}>
            Connect Wallet
          </button>
        )}

        {isConnected && (
          <>
            {!soul && (
              <>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  style={styles.input}
                />
                <button
                  style={styles.button}
                  disabled={!birthDate}
                  onClick={() => setSoul(getSoul(birthDate))}
                >
                  Reveal Soul
                </button>
              </>
            )}

            {soul && !minted && (
              <>
                <h2>{soul}</h2>
                <button style={styles.button} onClick={mint} disabled={isPending}>
                  {isPending ? 'Minting...' : 'Mint Soul NFT'}
                </button>
              </>
            )}

            {minted && <p>✨ Soul successfully minted</p>}

            <button style={styles.link} onClick={() => disconnect()}>
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

const styles: any = {
  main: {
    minHeight: '100vh',
    background: '#0b0b12',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
  card: {
    width: 380,
    padding: 24,
    borderRadius: 18,
    background: '#15151d',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    width: '100%',
    padding: 12,
    borderRadius: 10,
    background: '#6c5ce7',
    border: 'none',
    color: '#fff',
    fontWeight: 600,
    marginBottom: 10,
  },
  link: {
    background: 'none',
    border: 'none',
    color: '#aaa',
    marginTop: 10,
  },
};
