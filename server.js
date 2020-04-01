const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

app.use(cors());

const port = process.env.PORT || 5000;

app.get('/guardian', (req, res) => {

    const url = "https://content.guardianapis.com/search?api-key=591a92b9-9797-407f-96ee-41cd7dbb3532&section=(sport|business|technology|politics)&show-blocks=all";

    fetch(url)
        .then(result => result.json())
        .then(data => {
            console.log(data);
            res.json(data)
        });
});

app.listen(port, () => console.log(`Server started on port ${port}`));
