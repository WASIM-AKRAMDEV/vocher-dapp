"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";

export default function ClaimTokens() {
  const router = useRouter();
  const { voucherId } = router.query;
  const [wallet, setWallet] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask required!");
      return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    setWallet(signer);
  };

  const claimTokens = async () => {
    if (!wallet) return;
    alert(`Claiming tokens for Voucher: ${voucherId}`);
    // Add blockchain transaction logic here
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Claim Your Tokens</h1>
      <button onClick={connectWallet} className="bg-blue-500 text-white px-4 py-2">
        {wallet ? "Wallet Connected" : "Connect Wallet"}
      </button>
      {wallet && (
        <button onClick={claimTokens} className="bg-green-500 text-white px-4 py-2 ml-2">
          Claim Tokens
        </button>
      )}
    </div>
  );
}
