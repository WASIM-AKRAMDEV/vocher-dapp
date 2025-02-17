"use client";
import { useState } from "react";
import QRCode from "qrcode";

export default function GenerateVouchers({ token, signer }) {
  const [amount, setAmount] = useState("");
  const [count, setCount] = useState("");
  const [vouchers, setVouchers] = useState([]);

  const generateVouchers = async () => {
    if (!token || !signer || !amount || !count) return;

    let newVouchers = [];
    for (let i = 0; i < parseInt(count); i++) {
      const claimLink = `https://yourdomain.com/claim/${crypto.randomUUID()}`;
      const qr = await QRCode.toDataURL(claimLink);
      newVouchers.push({ claimLink, qr });
    }
    setVouchers(newVouchers);
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Token Amount Per Voucher"
        className="border p-2 mr-2"
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="number"
        placeholder="Number of Vouchers"
        className="border p-2"
        onChange={(e) => setCount(e.target.value)}
      />
      <button onClick={generateVouchers} className="bg-green-500 text-white px-4 py-2 ml-2">
        Generate Vouchers
      </button>
      <div className="mt-4">
        {vouchers.map((voucher, idx) => (
          <div key={idx} className="flex gap-4 items-center mb-2">
            <img src={voucher.qr} alt="QR Code" className="w-20 h-20" />
            <p>{voucher.claimLink}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
