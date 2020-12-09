export default class HttpError{
    message = '';
    statusCode = 500;
    isHttpError = true;
    
    constructor(message: string, statusCode?: number){
        this.message = message;
        if(statusCode){
            this.statusCode = statusCode;
        }
    }
}