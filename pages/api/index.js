import axios from 'axios'

const BASE_URL = 'http://localhost:4000'

export const reqBlog = () => axios.get(BASE_URL + '/getBlog')

export const reqTag = () => axios.get(BASE_URL + '/getTag')
