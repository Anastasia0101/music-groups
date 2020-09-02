const express = require('express');
const app = express();
const port = 3001;

const merchant_model = require('./merchant_model');

app.use(express.json());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

function getSortParams(query) {
    if (!query.sort_by) return 'default';
    return query.sort_by
}

app.get('/', (req, res) => {
    const sortField = getSortParams(req.query);
    merchant_model.getSortedGroups(sortField).then(response => {
        res.status(200).send(response);
    }).catch(error => {
        res.status(500).send(error);
    });
});

app.listen(port, () => {
    console.log(`App running on port ${ port }.`);
});

