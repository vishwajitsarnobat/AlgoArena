const express = require('express')
const app = express();
const PORT = process.env.PORT || 3001; // Get port from env or use 3001 if not available

app.get('/', (req, res) => {
    res.send('Hello from the Algo Arena Server!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});