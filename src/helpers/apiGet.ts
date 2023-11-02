import axios from 'axios'

interface Params {
    baseUrl: string
    headers: any
    method: string
}
const getConfig: Params = {
    baseUrl: "http://127.0.0.1:8000/api",
    headers: {
        "Authorization": "",
    },
    method: 'get'
}
export const getAPI = async (url: string): Promise<any> => {
    return await axios({
        ...getConfig,
        url: `${getConfig.baseUrl}/${url}`,
    }).then((response) => {
        console.log(response)
        return {
            status: response.status,
            data: response.data
        }
    }).catch((error) => {
        console.log(error)
        return {
            status: error.status,
            data: error.response
        }
    })
}