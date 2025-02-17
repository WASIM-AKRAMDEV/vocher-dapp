"use client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function SelectToken({ signer, onSelectToken }) {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    if (!signer) return;
    async function loadTokens() {
      const address = await signer.getAddress();
      const provider = signer.provider;
      const balance = await provider.getBalance(address);
      setTokens([{ symbol: "ETH", balance: ethers.formatEther(balance) }]); // Default ETH
      // Add logic to fetch ERC20 tokens here (using contract calls)
    }
    loadTokens();
  }, [signer]);

  return (
    <select
      onChange={(e) => onSelectToken(e.target.value)}
      className="border p-2 rounded"
    >
      <option value="">Select Token</option>
      {tokens.map((token, idx) => (
        <option key={idx} value={token.symbol}>
          {token.symbol} - {token.balance} available
        </option>
      ))}
    </select>
  );
}
