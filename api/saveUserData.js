// api/saveUserData.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, whatsapp, referralId } = req.body;

        // Validate input
        if (!name || !email || !whatsapp || !referralId) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        try {
            // Fetch existing data from JSONBin.io
            const binId = 'YOUR_BIN_ID'; // Replace with your Bin ID
            const apiKey = 'YOUR_API_KEY'; // Replace with your API Key
            const getResponse = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
                headers: {
                    'X-Master-Key': apiKey,
                },
            });

            const { record: existingData = [] } = await getResponse.json();

            // Add new user data
            const newData = [...existingData, { name, email, whatsapp, referralId, timestamp: new Date() }];

            // Save updated data to JSONBin.io
            const putResponse = await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': apiKey,
                },
                body: JSON.stringify(newData),
            });

            const result = await putResponse.json();

            if (result.metadata) {
                // Return the referral link
                const referralLink = `https://yourwebsite.com/form.html?ref_id=${referralId}`;
                return res.status(200).json({ success: true, referralLink });
            } else {
                throw new Error('Failed to save data to JSONBin.io');
            }
        } catch (error) {
            console.error('Error saving data:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    } else {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}
