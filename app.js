const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(morgan('common'));
app.use(cors());

const googleApps = require('./googleplay-data');


app.get('/apps', (req, res) => {
    const { sort, genres } = req.query;
    //sort has values of 'rating' and 'app'
    //genre has values of 'action', 'puzzle','strategy','casual','arcade','card'

    if(sort){
       if(!['rating', 'app'].includes(sort)){
           res.status(400).send('Sort must be one of rating or app');
       }
    }

    let results = googleApps.filter(app =>
                    app
                        .app
                        .includes(sort));

    if (sort) {
        results.sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        });
    }
    
    res.json(results);

});


app.listen(8000, () => {
    console.log('Server started on PORT 8000');
});