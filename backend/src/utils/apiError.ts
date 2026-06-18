type HttpStatusCode = 400 | 401 | 403 | 404 | 409 | 422 | 429 | 500;


type ApiErrorDetail = {
    field?: string
    message:string
}


class ApiError extends Error {
    public statusCode: number
    public errors:ApiErrorDetail[]
    public isOperational : boolean
    constructor(
        message:string,
        statusCode:HttpStatusCode,
        errors : ApiErrorDetail[] = [],
        stack? :string
    )
    {
        super(message)
        Object.setPrototypeOf(this, ApiError.prototype);
        this.statusCode = statusCode
        this.errors = errors
        this.isOperational = true
        if(stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
 
    }
}