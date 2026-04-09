const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Security: Only allow your frontend to talk to this API
// In Hatch, set FRONTEND_URL to your frontend domain
const frontendUrl = process.env.FRONTEND_URL;;
app.use(cors({ origin: frontendUrl }));

app.use(express.json());

// 1. Health Check Endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'Backend is live, bhai! 🚀', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// 2. Data Endpoint for Testing
app.get('/api/data', (req, res) => {
    res.json({ 
        user: 'Uttkarsh',
        items: [
            'IAM Permissions Fixed ✅',
            'EBS Volume Resized ✅',
            'Docker Build Successful ✅',
            'Full Stack Connection Pending 🐣'
        ]
    });
});

// Port Management for Hatch/Fargate
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`CORS enabled for: ${frontendUrl}`);
});