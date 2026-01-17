"use client";

import React, { useState } from "react";
import { useAccount, usePrepareContractWrite, useContractWrite } from "wagmi";
import { contractAbi } from "@/lib/contract";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

export default function Page() {
  const { isConnected } = useAccount();
  const [tokenURI, setTokenURI] = useState("");

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: "mintSoul",
    args: [tokenURI],
  });

  const { write, isLoading, isSuccess } = useContractWrite(config);

  if (!isConnected) {
    return <div>Please connect your wallet to mint.</div>;
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Mint your Soul NFT</h1>
      <input
        type="text"
        placeholder="Enter tokenURI (e.g. ipfs://...)"
        value={tokenURI}
        onChange={(e) => setTokenURI(e.target.value)}
        style={{
          padding: "0.5rem",
          width: "100%",
          maxWidth: "400px",
          marginBottom: "1rem",
          fontSize: "1rem",
        }}
      />
      <button
        onClick={() => write?.()}
        disabled={!write || isLoading}
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          cursor: write && !isLoading ? "pointer" : "not-allowed",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        {isLoading ? "Minting..." : "Mint Soul"}
      </button>
      {isSuccess && <p style={{ color: "green", marginTop: "1rem" }}>Mint successful!</p>}
    </main>
  );
}
