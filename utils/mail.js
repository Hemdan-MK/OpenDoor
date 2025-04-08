const nodemailer = require('nodemailer');
require('dotenv').config();

const sendMail = async (formData) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail', // Change if using a different email provider
            auth: {
                user: process.env.ADMIN_EMAIL, // Admin email from .env
                pass: process.env.ADMIN_EMAIL_PASSWORD // Admin email password from .env
            }
        });

        // Get readable program type and course
        const programTypeText = formData.programType === 'ug' ? 'Undergraduate (UG)' : 'Postgraduate (PG)';

        let mailOptions = {
            from: 'NoReply <no-reply@example.com>', // No actual user email
            to: process.env.ADMIN_EMAIL, // Admin email
            subject: 'New Student Enrollment',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            color: #333;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            border: 1px solid #ddd;
                            border-radius: 5px;
                        }
                        .header {
                            background-color: #0d6efd;
                            color: white;
                            padding: 15px;
                            text-align: center;
                            border-radius: 5px 5px 0 0;
                            margin-bottom: 20px;
                        }
                        .content {
                            padding: 0 15px;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        th, td {
                            padding: 10px;
                            border-bottom: 1px solid #ddd;
                            text-align: left;
                        }
                        th {
                            background-color: #f8f9fa;
                            width: 40%;
                        }
                        .footer {
                            margin-top: 20px;
                            text-align: center;
                            color: #6c757d;
                            font-size: 0.9em;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2>New Student Registration</h2>
                        </div>
                        <div class="content">
                            <p>A new student has submitted a registration form. Details are as follows:</p>
                            
                            <table>
                                <tr>
                                    <th>Full Name</th>
                                    <td>${formData.name}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>${formData.email}</td>
                                </tr>
                                <tr>
                                    <th>Phone Number</th>
                                    <td>${formData.phone}</td>
                                </tr>
                                <tr>
                                    <th>Place</th>
                                    <td>${formData.place}</td>
                                </tr>
                                <tr>
                                    <th>Gender</th>
                                    <td>${formData.gender}</td>
                                </tr>
                                <tr>
                                    <th>Parent Contact</th>
                                    <td>${formData.parentContact}</td>
                                </tr>
                                <tr>
                                    <th>Program Type</th>
                                    <td>${programTypeText}</td>
                                </tr>
                                <tr>
                                    <th>Course</th>
                                    <td>${formData.course}</td>
                                </tr>
                                <tr>
                                    <th>Preferred College</th>
                                    <td>${formData.college}</td>
                                </tr>
                            </table>
                            
                            <p>This information has been recorded in the system. Please follow up with the student accordingly.</p>
                        </div>
                        <div class="footer">
                            <p>This is an automated message. Please do not reply to this email.</p>
                            <p>&copy; ${new Date().getFullYear()} Your Institution Name. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

module.exports = sendMail;