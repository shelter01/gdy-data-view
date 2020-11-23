import axios from 'axios'

const http = axios.create()

http.interceptors.response.use(
  response => {
    const { Flag, FlagString, list } = response.data
    if (Flag !== 100) {
      return Promise.reject(FlagString)
    }
    return list
  },
  error => {
    return Promise.reject(error)
  }
)

export default http
