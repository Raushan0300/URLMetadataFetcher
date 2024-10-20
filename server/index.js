const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.post('/api/fetch-metadata', async(req, res)=>{
    const {url} = req.body;

    try {
        const {data} = await axios.get(url);
        const $ = cheerio.load(data);

        const metadata = {
            title: $('head title').text() || '',
            description: $('meta[name="description"]').attr('content') || '',
            image: $('meta[property="og:image"]').attr('content') || $('meta[name="twitter:image"').attr('content') || ''
        };

        res.json(metadata);
    } catch (error) {
        console.log('Error', error);
        res.status(500).json({msg: 'Error While Fetching Metadata'});
    }
});


app.listen(PORT, ()=>{
    console.log(`Server is running on Port: ${PORT}`)
});
