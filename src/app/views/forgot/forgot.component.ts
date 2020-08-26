import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog.service';
import { CognitoService } from 'src/app/services/cognito.service';
import { MessageService } from 'src/app/services/message.service';
import { Router } from '@angular/router';

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
  }

  
  toggle() {
}
onClickForgot() {
    this.title = this.titleForgot;
    this.isDisplaySignUp = false;
    this.isOpen = 'flyIn';
    this.router.navigate(['/forgot']);

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
