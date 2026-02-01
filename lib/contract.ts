export const contractAddress =
  "0x0e726e4B5d97f1D48B0dCAde6f47eB2b2c449007" as const;

export const contractAbi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "tokenURI",
        type: "string",
      },
    ],
    name: "mintSoul",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
