import { Injectable } from '@angular/core';

@Injectable()
export class CookiesService {

    setCoockie(key:string, coockie: any) {
        document.cookie = key+"=" + coockie;
    }

    getCookie(name: string) {
        let arrCookie: Array<string> = document.cookie.split(';');
        console.log(arrCookie);
        let arrLen: number = arrCookie.length;
        let cookieName = `${name}=`;
        let c: string;

        for (let i: number = 0; i < arrLen; i += 1) {
            c = arrCookie[i].replace(/^\s+/g, '');
            console.log(c)
            if (c.indexOf(cookieName) == 0) {
                return c.substring(cookieName.length, c.length);
            }
        }
        return '';
    }

     deleteCookie(name: string){
     document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}
