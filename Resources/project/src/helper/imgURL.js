const API_URL = process.env.VUE_APP_API_URL
let imgURL = (value) => {{
    if(!value) {
        return '/assets/no-image-found.jpg'
    }
    if (value.provider === 'local' || value.provider === 'local-watermark') {
        return API_URL + value.url;
    } else  {
        return value.url;
    }
}}
export default imgURL