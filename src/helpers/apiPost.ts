import axios from 'axios'

interface Params {
    baseUrl: string
    headers: any
    method: string
}
const postConfig: Params = {
    baseUrl: "http://127.0.0.1:8000/api",
    headers: {
        'content-type': 'multipart/form-data'
    },
    method: 'post'
}

export const postAPI = async (url: string, data: any): Promise<any> => {
    return await axios({
        ...postConfig,
        url: `${postConfig.baseUrl}/${url}`,
        data
    }).then((response) => {
        console.log("Success response:", response)
        return {
            status: response.status,
            data: response.data
        }
    }).catch((error) => {
        console.log('Error: ', error)
        return {
            status: error.status,
            data: error.response
        }
    })
}