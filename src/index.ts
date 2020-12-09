import express, { json, NextFunction, Request, Response } from 'express';
import HttpError from './error/HttpError';
import routes from './routes/routes';

// rest of the code remains same
const app = express();
const PORT = 5000;

app.use(json())
const cache = {
    acconts: [
        {
            id: 1,
            money: 100
        },
        {
            id: 2,
            money: 100
        },
        {
            id: 3,
            money: 100
        }
    ]
}

// Start Middleware
app.use((request: Request, response: Response, next: NextFunction) => {
    response.locals = cache;
    next();
})

app.use(routes)

// Error Middleware
app.use((error: HttpError | any, request: Request, response: Response,  next: NextFunction) => {
    let message =  'Internal Error';
    let statusCode = 500;

    if(error.isHttpError){
        statusCode = error.statusCode
        message = error.message
    }

    response.status(statusCode).json({
        message
    })

    next();
})

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});