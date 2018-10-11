import axios from 'axios'

export const http = axios.create({
  baseURL: 'http://rest-laravel-blog.prj:8888/public/api/'/* ,
  headers: {
    Authorization: 'Bearer {token}'
  } */
})
export default http
