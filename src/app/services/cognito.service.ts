import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserPool, ICognitoUserPoolData, CookieStorage, CognitoUserSession, ICognitoUserData, IAuthenticationDetailsData } from "amazon-cognito-identity-js";


export interface CognitoErr {
    code: string,
    name: string,
    message: string
}

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  constructor() { }

  private userPoolData : ICognitoUserPoolData = {
      UserPoolId : 'ap-northeast-1_cCWF9ahMN',
      ClientId : '307pcqq8sesacbb8j7i7v1mhhn'
  };
  
  private userPool = new CognitoUserPool(this.userPoolData);

  public session : CognitoUserSession

  login(id, pass) {
    let authenticationDetail = new AuthenticationDetails({
        Username : id,
        Password : pass
    });
    let user = new CognitoUser({
        Pool : this.userPool,
        Username: id
    });
    
    return new Promise( (resolve, reject) => {
        user.authenticateUser(authenticationDetail, {
            onSuccess: (res) => {
                this.session = res;
                console.log(res);
                resolve(res);
            },
            onFailure: (err : CognitoErr) => {
                console.log(err);
                reject(err);
            },
            newPasswordRequired: (res) => {
                user.completeNewPasswordChallenge('mekiep', {}, {
                    onSuccess: (res) => {
                        this.session = res;
                        console.log(res);
                        resolve(res);
                    },
                    onFailure: (err) => {
                        console.log(err);
                        reject(err);
                    },
                });
            }
        })
    })

  }
}
