const sendMail = require('../utils/mail');

export default async function handler(req, res) {
    // Enable CORS if necessary
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const formData = req.body;
        
        const requiredFields = ['name', 'email', 'phone', 'place', 'gender',
            'parentContact', 'programType', 'course', 'college'];

        for (const field of requiredFields) {
            if (!formData[field]) {
                return res.status(400).json({
                    success: false,
                    message: `Missing required field: ${field}`
                });
            }
        }

        const emailSent = await sendMail(formData);

        if (emailSent) {
            return res.status(200).json({
                success: true,
                message: 'Registration successful! We will contact you shortly.'
            });
        } else {
            return res.status(500).json({
                success: false,
                message: 'Failed to send notification email. Please try again.'
            });
        }
    } catch (error) {
        console.error('Error processing form submission:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
}
