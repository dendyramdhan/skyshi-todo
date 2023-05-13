import { SUCCESS } from "../constanta/response"

const successRes = (data: any): Object => {
    return {
        status: SUCCESS,
        message: SUCCESS,
        data: data
    }
}

export {
    successRes
}