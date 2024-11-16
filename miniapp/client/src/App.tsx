import React, { useState } from 'react';
import AuthScreen from './components/AuthScreen';
import DataInputScreen from './components/DataInputScreen';
import ResultScreen from './components/ResultScreen';
import { ProcessingResult } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [processingResult, setProcessingResult] = useState<ProcessingResult | null>(null);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleDataSubmit = (result: ProcessingResult) => {
    setProcessingResult(result);
  };

  const handleConfirm = (usdcAmount: number) => {
    // Логика отправки USDC и подтверждения
    console.log(`Пользователь подтвердил отправку ${usdcAmount} USDC`);
  };

  if (!isAuthenticated) {
    return <AuthScreen onAuthSuccess={handleAuthSuccess} />;
  }

  if (!processingResult) {
    return <DataInputScreen onSubmit={handleDataSubmit} />;
  }

  return <ResultScreen result={processingResult} onConfirm={handleConfirm} />;
};

export default App;