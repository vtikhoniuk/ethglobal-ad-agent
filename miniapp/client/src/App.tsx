import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import CampaignForm from './components/CampaignForm';
import GeneratedCampaign from './components/GeneratedCampaign';
import axios from 'axios';

interface User {
  token: string;
}

interface Campaign {
  id: number;
  generatedText: string;
  estimatedReach: number;
}

declare global {
    interface Window {
      Telegram: {
        WebApp: any;
      };
    }
  }
export function App() {
  const [user, setUser] = useState<User | null>(null);
  const [generatedCampaign, setGeneratedCampaign] = useState<Campaign | null>(
    null
  );

  useEffect(() => {
    const tg = (window as any).Telegram.WebApp;
    tg.ready();
  }, []);

  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
  };

  const handleCampaignSubmit = async (formData: FormData) => {
    try {
      const response = await axios.post('/api/campaigns', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setGeneratedCampaign(response.data);
    } catch (error) {
      console.error('Error submitting campaign:', error);
    }
  };

  const handleEdit = (text: string) => {
    if (generatedCampaign) {
      setGeneratedCampaign({ ...generatedCampaign, generatedText: text });
    }
  };

  const handlePayment = async (amount: number) => {
    try {
      const response = await axios.post(
        '/api/campaigns/pay',
        {
          campaignId: generatedCampaign?.id,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      // Handle payment response
      alert('Payment initiated successfully!');
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };

  return (
    <div className="App">
      {!user ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : generatedCampaign ? (
        <GeneratedCampaign
          campaign={generatedCampaign}
          onEdit={handleEdit}
          onSubmit={handlePayment}
        />
      ) : (
        <CampaignForm onSubmit={handleCampaignSubmit} />
      )}
    </div>
  );
}

export default App;