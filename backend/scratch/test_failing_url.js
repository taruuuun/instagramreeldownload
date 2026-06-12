const axios = require("axios");

const url = "https://instagram.fsgn5-15.fna.fbcdn.net/o1/v/t16/f2/m86/AQNVYz399Zry8TxA5gNyJPRPbxfp13IHxy38szfq2-9LsLTY4uRyknRgTsCuLEINmP6EaswcvPq5yTJyPRm8lvf4inl7O8OUrba72kE.mp4?stp=dst-mp4&efg=eyJxZV9ncm91cHMiOiJbXCJpZ193ZWJfZGVsaXZlcnlfdnRzX290ZlwiXSIsInZlbmNvZGVfdGFnIjoidnRzX3ZvZF91cmxnZW4uY2xpcHMuYzIuMzYwLmJhc2VsaW5lIn0&_nc_cat=111&vs=703999238688039_2259354005&_nc_vs=HBksFQIYUmlnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC8yNjQ4Qjk3NzdFNUE3NkQ5NDQ5QzU5QUVGODc0OUM4Nl92aWRlb19kYXNoaW5pdC5tcDQVAALIARIAFQIYR2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC8xNjgwNzY4OTMyNzk4ODE3XzI1NjExNDU0NDU3MDkxMzYxMDcubXA0FQICyAESACgAGAAbABUAACbMwM28sZi5PxUCKAJDMywXQEVzMzMzMzMYEmRhc2hfYmFzZWxpbmVfM192MREAdf4HZeadAQA=&ccb=9-4&oh=00_Af_p-5YdJ_vjxS5-2ZT0PrGoif4PZ2qycWx86YENu_gx0g&oe=6A2C6D34&_nc_sid=10d13b";

async function run() {
  try {
    const res = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });
    console.log("Success! Status:", res.status);
  } catch (err) {
    console.log("Failed with message:", err.message);
    if (err.response) {
      console.log("Status:", err.response.status);
      console.log("Headers:", JSON.stringify(err.response.headers, null, 2));
      console.log("Data type:", typeof err.response.data);
      if (typeof err.response.data === "string") {
        console.log("Data:", err.response.data.substring(0, 1000));
      } else if (err.response.data) {
        console.log("Data:", JSON.stringify(err.response.data).substring(0, 1000));
      }
    }
  }
}

run();
