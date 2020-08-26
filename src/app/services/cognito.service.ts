import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserPool, ICognitoUserPoolData, CookieStorage, CognitoUserSession, ICognitoUserData, IAuthenticationDetailsData, CognitoUserAttribute } from "amazon-cognito-identity-js";
import { environment } from 'src/environments/environment';


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
      UserPoolId : environment.UserPoolId,
      ClientId : environment.ClientId
  };
  
  private userPool = new CognitoUserPool(this.userPoolData);

  public session : CognitoUserSession

  public user;

    confirmSignIn(mail: string, code: string) {
        let user = new CognitoUser({
            Pool : this.userPool,
            Username: mail
        });

        return new Promise( (resolve, reject) => {
            user.confirmRegistration(code, true, (err, res) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log(res);
                    resolve(res)
                }
            })
        })
    }

    signIn(mail: string, pass: string) {
        let dataEmail = new CognitoUserAttribute({
            Name: 'email',
            Value: mail,
        });
        let dataPass = new CognitoUserAttribute({
            Name: 'pass',
            Value: pass,
        });
        let data = [];
        data.push(dataEmail);
        return new Promise( (resolve, reject) => {
            this.userPool.signUp(mail, pass, data, null, (err, res) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log(res);
                    resolve(res)
                }
            })
        })
  }

  isAuthenticated() {
      return this.session ? this.session.isValid() : false;
  }

  changePassword(mail: string, oldPass: string, newPass: string) {
    return new Promise( (resolve, reject) => {
        this.user.changePassword(oldPass, newPass, (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log(res);
                resolve(res)
            }
        })
    })
  }

  resetPassword(mail: string, code: string, pass: string) {
    let user = new CognitoUser({
        Pool : this.userPool,
        Username: mail
    });
    return new Promise( (resolve, reject) => {
        user.confirmPassword(code, pass, {
            onSuccess: () => {
                console.log("resetPassword success");
                resolve();
            },
            onFailure: (err: CognitoErr) => {
                console.log("err");
                reject(err);
            }
        })
    })
  }

  sendConfirmCode (email: string) {
    let user = new CognitoUser({
        Pool : this.userPool,
        Username: email
    });
    return new Promise( (resolve, reject) => {
        user.forgotPassword({
            onSuccess: (res) => {
                console.log(res);
                resolve(res)
            },
            onFailure: (err: CognitoErr) => {
                console.log(err);
                reject(err)
            }
        })
    })
  }

  login(id: string, pass: string) {
    let authenticationDetail = new AuthenticationDetails({
        Username : id,
        Password : pass
    });
    this.user = new CognitoUser({
        Pool : this.userPool,
        Username: id
    });
    
    return new Promise( (resolve, reject) => {
        this.user.authenticateUser(authenticationDetail, {
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
                this.user.completeNewPasswordChallenge('mekiep', {}, {
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
