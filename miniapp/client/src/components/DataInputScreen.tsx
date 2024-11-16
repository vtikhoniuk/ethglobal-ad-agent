import React, { useState } from 'react';
import axios from '../services/api';
import { ProcessingResult } from '../types';

interface DataInputScreenProps {
  onSubmit: (result: ProcessingResult) => void;
}

const DataInputScreen: React.FC<DataInputScreenProps> = ({ onSubmit }) => {
  const [campaignName, setCampaignName] = useState('');
  const [websiteLink, setWebsiteLink] = useState('');
  const [documents, setDocuments] = useState<FileList | null>(null);
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', campaignName);
    formData.append('websiteLink', websiteLink);
    formData.append('description', description);

    if (documents) {
      Array.from(documents).forEach((file) => {
        formData.append('documents', file);
      });
    }

    try {
      // Send data to server
      const response = await axios.post('/campaigns/process', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // Receiving results
      onSubmit(response.data);
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Создание рекламной кампании</h2>
      <label>
        Название кампании:
        <input
          type="text"
          value={campaignName}
          onChange={(e) => setCampaignName(e.target.value)}
          required
        />
      </label>
      <label>
        Ссылка на сайт:
        <input
          type="url"
          value={websiteLink}
          onChange={(e) => setWebsiteLink(e.target.value)}
          required
        />
      </label>
      <label>
        Описание:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Ссылки на документы:
        <input
          type="file"
          multiple
          onChange={(e) => setDocuments(e.target.files)}
        />
      </label>
      <button type="submit">Отправить</button>
    </form>
  );
};

export default DataInputScreen;