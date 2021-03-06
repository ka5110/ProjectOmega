import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import * as fromApp from '../../reducers';
import { JwtToken } from '../../shared/model/dto/jwt-token';
import * as AuthActions from '../store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
      private jwtHelperService: JwtHelperService,
      private store$: Store<fromApp.State>
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot
  ):
      Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree {
    const canRedirect = this.isAuthenticated();
    if (!canRedirect) {
      this.store$.dispatch(AuthActions.loginRejected({errorMessage: 'Session expired or not logged in. Please log-in again.'}));

      return false;
    }

    return true;
  }

  isAuthenticated = (): boolean => {
    // Decode token once token is implemented
    // Check if token expired or not
    // Return true or false
    let token: JwtToken;

    // Check if we have Jwt Token stored
    try {
      token = this.jwtHelperService.decodeToken(localStorage.getItem(environment.ACCESS_TOKEN));
    } catch (e) {
      // Failed to decode either invalid or null
      if (!environment.production) {
        console.warn('AuthGuard rejected redirect due to failure of decoding token');
      }

      return false;
    }

    return !this.jwtHelperService.isTokenExpired(localStorage.getItem(environment.ACCESS_TOKEN));
  };
}
