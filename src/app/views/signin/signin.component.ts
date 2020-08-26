import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog.service';
import { CognitoService } from 'src/app/services/cognito.service';
import { MessageService } from 'src/app/services/message.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

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

    score = 0;
    formData;
    public titleSendConfirm = {
        top: `You must input email or phone number`,
        bottom: 'to confirm your account',
        button: 'Send confirm code'
    }
    public titleForgot = {
        top: `You forgot your password?`,
        bottom: 'Please enter your email or phone number to search for your account.',
        button: 'Confirm'
    }

    public title = this.titleSendConfirm;

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
        this.router.navigate(['/forgot']);

    }

    onClickSubmitEmail(data) {
        console.log(data);
        // if (this.titleSendConfirm) {
        //     this.title = this.titleForgot;
        // } 
        // this.title = this.title.confirm ? this.titleForgot : this.titleSendConfirm;
        let dialogConfig = new MatDialogConfig();
        this.cognito.signIn(data.email, data.pass).then((res) => {
            console.log("done");
            dialogConfig.data = { title: "login ok", content: res };
            const dialogRef = this.dialog.confirmDialog(dialogConfig);
        }).catch((err) => {
            console.log("err");
            dialogConfig.data = { title: "login err", content: err.message };
            const dialogRef = this.dialog.confirmDialog(dialogConfig);
        })
        // console.log("data" + data);
    }
    onClickSubmitCode(data) {
        let dialogConfig = new MatDialogConfig();
        this.cognito.confirmSignIn(data.email, data.code).then((res) => {
            console.log("done");
            dialogConfig.data = { title: "login ok", content: res };
            const dialogRef = this.dialog.confirmDialog(dialogConfig);
        }).catch((err) => {
            console.log("err");
            dialogConfig.data = { title: "login err", content: err.message };
            const dialogRef = this.dialog.confirmDialog(dialogConfig);
        })
        console.log(data);
    }
}
