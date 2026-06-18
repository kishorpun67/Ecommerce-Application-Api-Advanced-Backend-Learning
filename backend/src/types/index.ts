export type ApiReponse<T> = {
    success: boolean
    message:string
    data?:T
}