import { Component, OnInit } from '@angular/core';
import { MessageService } from "../../services/message.service";
import { FormGroup, FormControl } from '@angular/forms';
import { CognitoService } from '../../services/cognito.service';
import { DialogService } from '../../services/dialog.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../common-component/confirm-dialog/confirm-dialog.component';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

    constructor(
        public messageService: MessageService,
        public cognito: CognitoService,
        public dialog: DialogService,
        private dialo: MatDialog,
        private router: Router
    ) { }
    isOpen = 'display';
    isDisplayForgotPassword: boolean;
    isDisplaySignUp: boolean = false;

    score = 0;
    formData;
    public titleLogin = {
        top: `Your score is ${this.score}`,
        bottom: 'Login to see your ranking',
        button: 'Login'
    }
    public titleForgot = {
        top: `You forgot your password?`,
        bottom: 'Please enter your email or phone number to search for your account.',
        button: 'Search'
    }

    public title = this.titleLogin;

    ngOnInit(): void {
        this.formData = new FormGroup(
            {
                email: new FormControl(""),
                pass: new FormControl("")
            }
        );
    }

    toggle() {
    }
    onClickForgot() {
        this.router.navigate(['/forgot']);

    }

    onClickSignIn() {
        this.router.navigate(['/signIn']);
    }

    onClickSubmit(data) {
        let dialogConfig = new MatDialogConfig();
        dialogConfig.data = { title: "login ok", content: "haha" };
        this.cognito.login(data.email, data.pass).then((res) => {
            console.log("done");
            const dialogRef = this.dialog.confirmDialog(dialogConfig);
        }).catch((err) => {
            console.log("err");
            dialogConfig.data = { title: "login err", content: "huhu" };
            const dialogRef = this.dialog.confirmDialog(dialogConfig);
        })
        console.log("data" + data);
    }
}
