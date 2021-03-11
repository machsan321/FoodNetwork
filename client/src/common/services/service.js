import axios from 'axios'
const baseUrl = "http://localhost:5000/";
export const PostBaseUrl = async (url, body) => {
    try {
        var res = await axios.post(baseUrl + url, body)
        console.log(res);
    }
    catch{
        return null;
    }
  return res.data;
}