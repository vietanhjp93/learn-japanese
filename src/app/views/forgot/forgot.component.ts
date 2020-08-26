import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog.service';
import { CognitoService } from 'src/app/services/cognito.service';
import { MessageService } from 'src/app/services/message.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
    isOpen;
    constructor(
        public messageService: MessageService,
        public cognito: CognitoService,
        public dialog: DialogService,
        private dialo: MatDialog,
        private router: Router
    ) { }
    isDisplayForgotPassword: boolean;
    isDisplaySignUp: boolean = false;
    isDisplayCodeInput: boolean = false;
    isMailErr: boolean = false;
    isConfirmSuccess: boolean = false;
    isConfirmErr: boolean = false;
    isCodeErr: boolean = false;
    isMailOk: boolean = false;
    isPassErr: boolean = false;
    score = 0;
    formData;
    randomPass = Math.random().toString(36).slice(-8);

    public titleSendConfirm = {
        top: `Please enter your email or phone number`,
        bottom: 'to reset your password',
        button: 'Send confirm code'
    }

    public title = this.titleSendConfirm;
    codeElement = document.getElementById("code");
    passElement = document.getElementById("pass");
    confirmElement = document.getElementById("confirmPass");

  ngOnInit(): void {
    this.formData = new FormGroup(
        {
            email: new FormControl(""),
            code: new FormControl(""),
            pass: new FormControl(""),
            confirmPass: new FormControl(""),
        }
    );
  }

  
    toggle() {
    
    }
    
    onClickForgot() {

    }

    onClickSubmitEmail(data) {
        this.isCodeErr = false;
        this.isMailErr = false;
        if (!this.isMailOk) {
            this.cognito.sendConfirmCode(data.email).then((res) => {
                this.isMailOk = true;
                this.title =  {
                    top: `We just sen a email with a verification code to ${data.email}`,
                    bottom: 'Please enter the code to continue',
                    button: 'Confirm'
                }
                let mailElement = document.getElementById("mail");
                mailElement.classList.remove('inputInvalid');
                mailElement.classList.add('inputValid');
            }).catch((err) => {
                this.isMailErr = true;
                let mailElement = document.getElementById("mail");
                mailElement.classList.remove('inputValid');
                mailElement.classList.add('inputInvalid');
            })
        } else {
            this.cognito.resetPassword(data.email, data.code, this.randomPass).then((res) => {
                this.isConfirmSuccess = true;
                let codeElement = document.getElementById("code");
                codeElement.classList.remove('inputInvalid');
                codeElement.classList.add('inputValid');
            }).catch((err) => {
                this.isCodeErr = true;
                let codeElement = document.getElementById("code");
                codeElement.classList.remove('inputValid');
                codeElement.classList.add('inputInvalid');
            })
        }
    }

    async onClickSubmitCode(data) {
        this.isPassErr = false;
        let confirmPassElement = document.getElementById("confirmPass");
        let passElement = document.getElementById("pass");
        if (data.pass !== data.confirmPass) {
            this.isConfirmErr = true;
            confirmPassElement.classList.remove('inputValid');
            confirmPassElement.classList.add('inputInvalid');
            return;
        }
        
        this.isConfirmErr = false;
        confirmPassElement.classList.remove('inputInvalid');
        confirmPassElement.classList.add('inputValid');
        passElement.classList.remove('inputInvalid');
        passElement.classList.add('inputValid');
        
        if (!this.cognito.isAuthenticated()) {
            await this.cognito.login(data.email, this.randomPass);
        }
        this.cognito.changePassword(data.email, this.randomPass, data.pass).then((res) => {
            this.router.navigate(['/rank']);
        }).catch((err) => {
            this.isPassErr = true;
            confirmPassElement.classList.remove('inputValid');
            confirmPassElement.classList.add('inputInvalid');
        })
    }
}
