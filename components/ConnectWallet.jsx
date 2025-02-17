"use client";
import { useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";

export default function ConnectWallet({ onWalletConnected }) {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("Please install MetaMask!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
      onWalletConnected(signer); // Pass signer to parent
      toast.success("Wallet connected!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to connect wallet");
    }
  };

  return (
    <button
      onClick={connectWallet}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...` : "Connect Wallet"}
    </button>
  );
}
