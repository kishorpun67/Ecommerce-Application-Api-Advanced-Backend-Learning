
export type ApiReponse<T> = {
    success: boolean
    message:string
    data?:T
}


export interface JWTPayload {
    userId:string
}