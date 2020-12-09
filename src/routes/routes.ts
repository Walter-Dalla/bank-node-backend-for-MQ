import { Router, Request, Response } from "express";
import IAccont from '../interfaces/IAccont'
import { findAccontById } from "../services/AccontServices";
import HttpError from '../error/HttpError';

const routes = Router();

routes.get('/accont/:id', (request: Request, response: Response) => {
    const myId =  Number(request.params.id);

    response.json(findAccontById(myId, response.locals.acconts))
});

routes.post('/pay', (request: Request, response: Response) => {
    const body: IPay = request.body;
    
    const myAccontId =  body.myId;
    const myAccont = findAccontById(myAccontId, response.locals.acconts);
    
    const payToAccontId =  body.payToId;
    const payToAccont = findAccontById(payToAccontId, response.locals.acconts);
    
    if(myAccont?.money - body.money < 0){
        throw new HttpError('Insufficient money', 400);
    }

    myAccont.money = myAccont.money - body.money;
    payToAccont.money = payToAccont.money + body.money;

    response.json({
        message:"Payment accepted"
    })
});

interface IPay{
    payToId: number;
    myId: number;
    
    money: number;
}

export default routes;