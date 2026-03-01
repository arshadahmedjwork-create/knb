
import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Google Sheets Auth
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: SCOPES,
});

const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;

app.post('/api/submit', async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            consultationMode,
            projectType,
            location,
            area,
            floorplan,
            projectStage,
            budget,
            requirements,
            material,
            timeline,
            projectBrief
        } = req.body;
        const date = new Date().toISOString();

        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Sheet1!A:P', // Adjust Sheet name if necessary
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [
                        date,
                        firstName,
                        lastName,
                        email,
                        phone || '',
                        projectType || '',
                        location || '',
                        area || '',
                        floorplan || '',
                        projectStage || '',
                        budget || '',
                        requirements || '',
                        material || '',
                        timeline || '',
                        consultationMode || '',
                        projectBrief || ''
                    ]
                ],
            },
        });

        res.status(200).json({ message: 'Saved to Sheets successfully' });
    } catch (error) {
        console.error('Error saving to Sheets:', error);
        res.status(500).json({ error: 'Failed to save to Sheets' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
