import { IronSessionOptions } from "iron-session";

export const sessionOptions: IronSessionOptions = {
    password: String(process.env.SECRET_COOKIE_PASSWORD),
    cookieName: 'ferrari-hcodelabe/iron-session',
    cookieOptions: {
        secure: process.env.NODE_ENV === "production", //se não for production retornará false e a key secure não funcionará nos dando assim mais desepenho na hora de desenvolver
    }
}


declare module 'iron-session' {
    interface IronSessionData {
        token: string
    }
}// descobri o por que disso