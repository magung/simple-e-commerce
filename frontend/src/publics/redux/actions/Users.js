import Axios from 'axios'
import {URL} from '../../config'
 Axios.defaults.baseURL = `${URL}`;
export const login = (data) => {
    return {
        type:'LOGIN',
        payload: Axios.post(`/login`, data)
    }
}

export const register = (data) => {
    return {
      type:'REGISTER',
      payload: Axios.post(`/register`, data)
    }
}
export const getProfile = (headers) => {
    return {
      type:'GET_PROFILE',
      payload: Axios.get(`/users`,{
          headers:headers
        }
      )
    }
}
