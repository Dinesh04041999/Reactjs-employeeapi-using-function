import axios from "axios";

const instance=axios.create({
    baseURL : 'https://my-json-server.typicode.com/dineshkumar0404/demo'
});

instance.defaults.headers.common['Authorization']="Auth from instance";

export default instance;