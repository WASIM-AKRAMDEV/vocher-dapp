"use client";
import { useState } from "react";
import ConnectWallet from "@/components/ConnectWallet";
import SelectToken from "@/components/SelectToken";
import GenerateVouchers from "@/components/GenerateVouchers";

export default function Home() {
  const [signer, setSigner] = useState(null);
  const [selectedToken, setSelectedToken] = useState("");

  return (
    <div className=" w-full h-screen flex justify-center items-center bg-white text-black">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">
          Admin Panel - Token Vouchers
        </h1>
        <ConnectWallet onWalletConnected={setSigner} />
        {signer && (
          <SelectToken signer={signer} onSelectToken={setSelectedToken} />
        )}
        {selectedToken && (
          <GenerateVouchers token={selectedToken} signer={signer} />
        )}
      </div>
    </div>
  );
}
