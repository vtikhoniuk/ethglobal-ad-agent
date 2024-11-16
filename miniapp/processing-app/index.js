const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/process', (req, res) => {
  const campaign = req.body;
  // Simulate processing
  const generatedCampaign = {
    text: `Generated advertising text for ${campaign.campaignName}`,
    estimatedReach: 10000,
  };
  res.status(200).send(generatedCampaign);
});

app.listen(4000, () => {
  console.log('Processing app listening on port 4000');
});