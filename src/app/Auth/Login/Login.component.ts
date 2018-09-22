import { Component, OnInit, ElementRef, OnDestroy } from "@angular/core";
import { UserService } from "../../Services/User.service";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { IResponse } from "../../models/Response";
import swal from "sweetalert2";
import { Router } from "@angular/router";
import { CookieService } from "angular2-cookie/services/cookies.service";
declare var $: any;

@Component({
  selector: "app-login-cmp",
  templateUrl: "./Login.component.html"
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  test: Date = new Date();
  private toggleButton: any;
  private sidebarVisible: boolean;
  private nativeElement: Node;
  private userName: string;
  private password: string;
  userNameFormControl: FormControl;
  passwordFormControl: FormControl;
  isSubmitted: boolean;
  constructor(
    private element: ElementRef,
    private userService: UserService,
    private route: Router,
    private cookieService: CookieService
  ) {
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
    this.form = new FormGroup({});
    this.userNameFormControl = new FormControl("", [Validators.required]);
    this.passwordFormControl = new FormControl("", [Validators.required]);
    this.form.addControl("userNameFormControl", this.userNameFormControl);
    this.form.addControl("passwordFormControl", this.passwordFormControl);
  }

  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggle")[0];
    const body = document.getElementsByTagName("body")[0];
    body.classList.add("login-page");
    body.classList.add("off-canvas-sidebar");
    const card = document.getElementsByClassName("card")[0];
    setTimeout(function() {
      // after 1000 ms we add the class animated to the login/register card
      card.classList.remove("card-hidden");
    }, 700);
  }
  sidebarToggle() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName("body")[0];
    const sidebar = document.getElementsByClassName("navbar-collapse")[0];
    if (this.sidebarVisible === false) {
      setTimeout(function() {
        toggleButton.classList.add("toggled");
      }, 500);
      body.classList.add("nav-open");
      this.sidebarVisible = true;
    } else {
      this.toggleButton.classList.remove("toggled");
      this.sidebarVisible = false;
      body.classList.remove("nav-open");
    }
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName("body")[0];
    body.classList.remove("login-page");
    body.classList.remove("off-canvas-sidebar");
  }

  logIn() {
    this.isSubmitted = true;
    if (this.form.status === "INVALID") {
      return;
    }

    this.userService
      .logIn({
        UserName: this.userNameFormControl.value,
        Password: this.passwordFormControl.value
      })
      .subscribe(result => {
        const response = <IResponse>result;
        if (response.success === true) {
          this.cookieService.put("adminInfo", response.AdminInfo.Name);
          this.route.navigate(["/dashboard"]);
        } else {
          swal({
            title: "Failed",
            text: "Invalid User Name Or Password",
            type: "error",
            confirmButtonClass: "btn btn-info",
            buttonsStyling: false
          }).catch(swal.noop);
        }
      });
  }
}
