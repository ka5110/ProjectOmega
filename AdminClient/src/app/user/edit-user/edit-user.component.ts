import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import * as fromApp from '../../reducers/index';
import { UserModel } from '../../shared/model/user.model';
import * as fromUser from '../../user/store/user.reducer';
import * as UserActions from './../store/user.actions';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit, AfterContentInit, OnDestroy {
  userForm: FormGroup;

  private subscription: Subscription;

  constructor(
    private store: Store<fromApp.State>
  ) {
    this.subscription = new Subscription();
    this.userForm = this.formInitialization();
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.subscription.add(
      this.store.select(fromUser.selectFocusedUser).subscribe(user => {
        if (user) {
          this.email.setValue(user.email);
          this.role.setValue(user.role);
          this.company.setValue(user.companyId);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(): void {
    this.store.select(fromUser.selectFocusedUser)
      .pipe(take(1))
      .subscribe(user => this.store.dispatch(UserActions.editUser({
        user: {
          ...user,
          email: this.email.value,
          role: this.role.value,
          companyId: this.company.value
        }
      })));
  }

  /**
   * Check if email is in the correct format
   *
   * @returns true if the email is invalid, false if it is valid
   */
  get emailHasError(): boolean {
    return this.userForm.get('email').invalid;
  }

  protected isFormValid(): boolean {
    return this.userForm.valid;
  }

  get email(): AbstractControl {
    return this.userForm.get('email');
  }

  get role(): AbstractControl {
    return this.userForm.get('role');
  }

  get company(): AbstractControl {
    return this.userForm.get('company');
  }

  /**
   * @returns string with the appropriate error message for email validation
   */
  get emailErrorMessage(): string {
    const emailCtrl = this.userForm.get('email');

    return emailCtrl.hasError('required') // Check if email has been filled
      ? 'Email is required!'
      : emailCtrl.hasError('email') // If yes check if valid email
        ? 'Not a valid email'
        : '';
  }

  get roleHasError(): boolean {
    return this.userForm.get('role').invalid;
  }

  get roleErrorMessage(): string {
    return this.userForm.get('email').hasError('required') ? 'Role cannot be empty' : '';
  }

  private formInitialization = (): FormGroup =>
    new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      role: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required])
    });

  get companyHasError(): boolean {
    return this.company.hasError('required');
  };

  get companyErrorMessage(): string {
    return this.company.getError('required');
  }
}
