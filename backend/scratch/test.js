const axios = require('axios');

async function test() {
    try {
        const data = new URLSearchParams();
        data.append('q', 'https://www.instagram.com/reel/C7_2Wz7g1L1/');
        data.append('t', 'media');
        data.append('lang', 'en');

        const config = {
            method: 'post',
            url: 'https://v3.saveig.app/api/ajaxSearch',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded', 
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/javascript, */*; q=0.01'
            },
            data : data
        };

        const res = await axios(config);
        console.log(res.data);
    } catch (e) {
        console.error(e.message);
    }
}
test();
