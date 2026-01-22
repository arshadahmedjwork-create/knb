import { google } from 'googleapis';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { firstName, lastName, email, projectType, projectBrief } = req.body;

        if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SPREADSHEET_ID) {
            console.error('Missing Google Sheets credentials');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            },
            scopes: SCOPES,
        });

        const sheets = google.sheets({ version: 'v4', auth });
        const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
        const date = new Date().toISOString();

        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Sheet1!A:F',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [date, firstName, lastName, email, projectType, projectBrief]
                ],
            },
        });

        return res.status(200).json({ message: 'Saved to Sheets successfully' });
    } catch (error) {
        console.error('Error saving to Sheets:', error);
        return res.status(500).json({ error: 'Failed to save to Sheets', details: error.message });
    }
}
