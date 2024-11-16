import React, { useState } from 'react';

interface GeneratedCampaignProps {
  campaign: {
    id: number;
    generatedText: string;
    estimatedReach: number;
  };
  onEdit: (text: string) => void;
  onSubmit: (amount: number) => void;
}

const GeneratedCampaign: React.FC<GeneratedCampaignProps> = ({
  campaign,
  onEdit,
  onSubmit,
}) => {
  const [usdcAmount, setUsdcAmount] = useState<number | ''>('');

  const handlePayment = () => {
    if (usdcAmount && usdcAmount > 0) {
      onSubmit(usdcAmount);
    } else {
      alert('Please enter a valid amount.');
    }
  };

  return (
    <div>
      <h2>Your Advertising Campaign</h2>
      <textarea
        value={campaign.generatedText}
        onChange={(e) => onEdit(e.target.value)}
      />
      <p>Estimated Reach: {campaign.estimatedReach}</p>
      <input
        type="number"
        placeholder="Amount in USDC"
        value={usdcAmount}
        onChange={(e) => setUsdcAmount(Number(e.target.value))}
      />
      <button onClick={handlePayment}>Initiate Payment</button>
    </div>
  );
};

export default GeneratedCampaign;