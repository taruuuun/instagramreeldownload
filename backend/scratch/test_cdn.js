const axios = require("axios");
require("dotenv").config({ path: "../.env" });

const cdnUrl = "https://instagram.fsgn8-3.fna.fbcdn.net/o1/v/t2/f2/m367/AQMudo95J4CPr262PJ7YKdtSTKP4IwJ1AGm6tjqJ-aGi8SiNfEiH9l0kGxkLPrVs_mqPa05RvV4OhG0fAe6uGm_SVDO5yPGmP0S1k4M.mp4?_nc_cat=111&_nc_oc=AdoNftepveSfVcuBMI5-e03bdYb5OuP9zHonxD6NX8QQc85Ey_bwWCsxlesx7gDu9SI&_nc_sid=5e9851&_nc_ht=instagram.fsgn8-3.fna.fbcdn.net&_nc_ohc=GBm1OIFi9cgQ7kNvwGcUs4d&efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uQ0xJUFMuQzMuNTc2LmRhc2hfYmFzZWxpbmVfMV92MSIsInhwdl9hc3NldF9pZCI6MjE0NDc3MjUzMjYxODU1MiwiYXNzZXRfYWdlX2RheXMiOjM5NSwidmlfdXNlY2FzZV9pZCI6MTAwOTksImR1cmF0aW9uX3MiOjQyLCJ1cmxnZW5fc291cmNlIjoid3d3In0%3D&ccb=17-1&vs=ac15701bc69ef63e&_nc_vs=HBksFQIYQGlnX2VwaGVtZXJhbC84RDQ0MTJDNDY3Nzg0MjQ1MDFBQzQyNjU0ODdDMzZBRF92aWRlb19kYXNoaW5pdC5tcDQVAALIARIAFQIYR2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC8xNjgwNzY4OTMyNzk4ODE3XzI1NjExNDU0NDU3MDkxMzYxMDcubXA0FQICyAESACgAGAAbAogHdXNlX29pbAExEnByb2dyZXNzaXZlX3JlY2lwZQExFQAAJvCU8s6Yqs8HFQIoAkMzLBdARXul41P3zxgSZGFzaF9iYXNlbGluZV8xX3YxEQB1_gdl5p0BAA&_nc_gid=LL6irETvsH9oDlGKpnUzZw&_nc_zt=28&_nc_ss=7a120&oh=00_Af-NCQe2WdTJf7HHG4zKozkrmmvEdHII_QAZDOJPaeFHoQ&oe=6A304A14";

async function test() {
  const configs = [
    {
      name: "Default axios headers",
      headers: {}
    },
    {
      name: "Standard browser User-Agent",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    },
    {
      name: "Referer set to instagram.com",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://www.instagram.com/"
      }
    },
    {
      name: "Only custom Referer",
      headers: {
        "Referer": "https://www.instagram.com/"
      }
    }
  ];

  for (const config of configs) {
    try {
      console.log(`Testing: ${config.name}`);
      const res = await axios({
        method: "get",
        url: cdnUrl,
        headers: config.headers,
        timeout: 5000
      });
      console.log(`=> SUCCESS! Status: ${res.status}`);
    } catch (err) {
      console.log(`=> FAILED: ${err.message}`);
      if (err.response) {
        console.log(`   Status: ${err.response.status}`);
      }
    }
  }
}

test();
