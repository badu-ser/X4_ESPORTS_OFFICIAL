// api/saveUserData.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, whatsapp, referralId } = req.body;

        // Validate input
        if (!name || !email || !whatsapp || !referralId) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Save user data (for now, we'll log it to the console)
        console.log('User Data:', { name, email, whatsapp, referralId });

        // In a real application, save the data to a database (e.g., Firebase, MongoDB, etc.)
        // Example: await db.collection('users').insertOne({ name, email, whatsapp, referralId });

        // Return the referral link
        const referralLink = `https://yourwebsite.com/form.html?ref_id=${referralId}`;
        return res.status(200).json({ success: true, referralLink });
    } else {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}
