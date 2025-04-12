export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  // Set CORS headers for actual request
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { amount, upiId } = req.body;

  if (!amount || !upiId) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    const binId = '67fa64a08960c979a58396de';
    const apiKey = '$2a$10$jB57pOyAbeCEdv6ovXThfO3MVUw88TvzC9EsUj6.XsZyRIewLpiUS';

    const getResponse = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
      headers: { 'X-Master-Key': apiKey }
    });

    if (!getResponse.ok) {
      throw new Error('Failed to fetch existing data');
    }

    const jsonResponse = await getResponse.json();
    const existingData = Array.isArray(jsonResponse.record) ? jsonResponse.record : [];

    const newData = [
      ...existingData,
      {
        amount,
        upiId,
        timestamp: new Date().toISOString()
      }
    ];

    const putResponse = await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': apiKey
      },
      body: JSON.stringify(newData)
    });

    if (!putResponse.ok) {
      throw new Error('Failed to save data');
    }

    return res.status(200).json({
      success: true,
      message: 'Payout request saved successfully!'
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}
