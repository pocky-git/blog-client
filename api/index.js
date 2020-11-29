import axios from 'axios'

// const BASE_URL = 'http://localhost:4000'

const BASE_URL = 'http://114.215.179.76:4000'

export const reqBlog = tagId => axios.get(BASE_URL + '/getBlog',{params:{tagId}})

export const reqTag = () => axios.get(BASE_URL + '/getTag')

export const reqSearch = searchText => axios.get(BASE_URL + '/searchBlog',{params:{searchText}})

export const reqBlogDetail = id => axios.get(BASE_URL + '/getBlogDetail',{params:{id}})

export const reqAbout = () => axios.get(BASE_URL + '/getAbout')

export const reqLike = id => axios.post(BASE_URL + '/like',{id})