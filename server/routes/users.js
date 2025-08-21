// server/routes/users.js
const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');


router.post('/register', async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
    }

    const ALLOWED_DOMAIN = 'spit.ac.in';
    if (!email.endsWith('@' + ALLOWED_DOMAIN)) {
        return res.status(400).json({ error: `Registration is restricted to SPIT emails with domain @${ALLOWED_DOMAIN}` });
    }

    try {
        console.log("Validation passed. Attempting to create user for: ", email);
        const newUser = await prisma.user.create({
            data: {
                email: email,
            },
        });
        console.log("User created successfully: ", newUser.id);

        res.status(201).json(newUser);
    } catch (error) {
        // Unique constraint violation code of prisma is P2002.
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'A user with this email already exists.' });
        }

        // For other errors.
        console.error(error);
        res.status(500).json({ error: 'An unknown error occurred while creating the user.' });
    }
});

module.exports = router;