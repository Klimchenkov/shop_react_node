import { $authHost, $host } from ".";
import jwt_decode from "jwt-decode";


export const addToBasket = async (deviceId) => {
    const token = localStorage.getItem('token')
    if(token===null){
        return("Авторизуйтесь, чтобы добавить товар в коризну")
    }
    const userId = jwt_decode(token).id
    const {data} = await $host.post('api/basket', {userId, deviceId})
    return data
} 

export const getBasket = async () => {
    const token = localStorage.getItem('token')
    
    const userId = jwt_decode(token).id
    const {data} = await $host.get('api/basket', {params: {
        userId
    }})
    return data
}

export const checkBasket = async () => {
    const token = localStorage.getItem('token')
    if(token===null){
        return 
    }
    const userId = jwt_decode(token).id
    const {data} = await $host.get('api/basket/check', {params: {
        userId
    }})
    return data

}

export const deleteBasket = async (deviceId) => {
    const token = localStorage.getItem('token')
    const userId = jwt_decode(token).id
    const {data} = await $host.delete('api/basket', {params: 
                        {userId, deviceId}})
    return data
}

