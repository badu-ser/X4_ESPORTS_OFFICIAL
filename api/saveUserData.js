// api/saveUserData.js
   import fs from 'fs';
   import path from 'path';

   export default async function handler(req, res) {
       if (req.method === 'POST') {
           const { name, email, whatsapp, referralId } = req.body;

           // Validate input
           if (!name || !email || !whatsapp || !referralId) {
               return res.status(400).json({ success: false, message: 'Missing required fields' });
           }

           try {
               // Define the path to the JSON file
               const filePath = path.join(process.cwd(), 'data', 'users.json');

               // Read existing data from the file
               let users = [];
               if (fs.existsSync(filePath)) {
                   const fileData = fs.readFileSync(filePath, 'utf8');
                   users = JSON.parse(fileData);
               }

               // Add new user data
               users.push({ name, email, whatsapp, referralId, timestamp: new Date() });

               // Write updated data back to the file
               fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

               // Return the referral link
               const referralLink = `https://yourwebsite.com/form.html?ref_id=${referralId}`;
               return res.status(200).json({ success: true, referralLink });
           } catch (error) {
               console.error('Error saving data:', error);
               return res.status(500).json({ success: false, message: 'Internal server error' });
           }
       } else {
           return res.status(405).json({ success: false, message: 'Method not allowed' });
       }
   }
