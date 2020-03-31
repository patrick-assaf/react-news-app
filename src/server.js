const express = require('express');
var cors = require('cors');
const app = express();

app.use(cors());

const port = process.env.PORT || 5000;

app.get('/api/test', (req, res) => {
    const customers = [
        {id: 1, firstName: 'John', lastName: 'Doe'},
        {id: 2, firstName: 'Patrick', lastName: 'Assaf'},
        {id: 3, firstName: 'Yara', lastName: 'Naufal'}
    ]
    res.json(customers);
});

app.listen(port, () => console.log(`Server started on port ${port}`));
