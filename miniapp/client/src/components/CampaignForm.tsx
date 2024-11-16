import React, { useState, ChangeEvent, FormEvent } from 'react';

interface CampaignFormProps {
  onSubmit: (formData: FormData) => void;
}

const CampaignForm: React.FC<CampaignFormProps> = ({ onSubmit }) => {
  const [campaignName, setCampaignName] = useState('');
  const [websiteLink, setWebsiteLink] = useState('');
  const [description, setDescription] = useState('');
  const [documents, setDocuments] = useState<FileList | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('campaignName', campaignName);
    formData.append('websiteLink', websiteLink);
    formData.append('description', description);

    if (documents) {
      for (let i = 0; i < documents.length; i++) {
        formData.append('documents', documents[i]);
      }
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Advertising Campaign</h2>
      <input
        type="text"
        placeholder="Campaign Name"
        value={campaignName}
        onChange={(e) => setCampaignName(e.target.value)}
        required
      />
      <input
        type="url"
        placeholder="Website Link"
        value={websiteLink}
        onChange={(e) => setWebsiteLink(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="file"
        multiple
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setDocuments(e.target.files)
        }
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default CampaignForm;