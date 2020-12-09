import HttpError from "../error/HttpError";
import IAccont from "../interfaces/IAccont"

export function findAccontById(id: number, acconts: IAccont[]): IAccont{

    const accont = acconts.find((accont: IAccont) => {
        return accont.id === id;
    })

    if(!accont){
        throw new HttpError('No accont found', 400);
    }

    return accont
}