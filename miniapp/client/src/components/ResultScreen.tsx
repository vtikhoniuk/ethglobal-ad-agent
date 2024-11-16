import React, { useState } from 'react';
import { ProcessingResult } from '../types';

interface ResultScreenProps {
  result: ProcessingResult;
  onConfirm: (usdcAmount: number) => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ result, onConfirm }) => {
  const [campaignText, setCampaignText] = useState(result.generatedCampaign);
  const [usdcAmount, setUsdcAmount] = useState<number>(0);

  const handleConfirm = () => {
    onConfirm(usdcAmount);
  };

  return (
    <div>
      <h2>Результат обработки</h2>
      <label>
        Сгенерированная рекламная кампания:
        <textarea
          value={campaignText}
          onChange={(e) => setCampaignText(e.target.value)}
        />
      </label>
      <p>Предполагаемый охват = Стоимость: {result.estimatedReach}</p>
      <label>
        Сумма в USDC для отправки на рекламу:
        <input
          type="number"
          value={usdcAmount}
          onChange={(e) => setUsdcAmount(Number(e.target.value))}
        />
      </label>
      <button onClick={handleConfirm}>Отправить</button>
    </div>
  );
};

export default ResultScreen;