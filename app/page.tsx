"use client";

import { useEffect, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { contractAbi, contractAddress } from "@/lib/contract";

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const { isConnected } = useAccount();
  const { writeContract, isPending } = useWriteContract();

  const [birthDate, setBirthDate] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const tokenURI = birthDate
    ? `ipfs://digital-soul/${birthDate}.json`
    : "";

  const mint = () => {
    writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: "mintSoul",
      args: [tokenURI],
    });
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        background: "linear-gradient(180deg, #050505, #0f0f1a)",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: 36 }}>Digital Soul</h1>

      {!isConnected && <p>Подключи кошелёк</p>}

      {isConnected && (
        <>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            style={{
              padding: 12,
              borderRadius: 8,
              border: "none",
              width: 220,
            }}
          />

          <button
            onClick={mint}
            disabled={!birthDate || isPending}
            style={{
              padding: "12px 24px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              background: "#6b6bff",
              color: "white",
            }}
          >
            {isPending ? "Minting…" : "Mint Soul"}
          </button>
        </>
      )}
    </main>
  );
}
