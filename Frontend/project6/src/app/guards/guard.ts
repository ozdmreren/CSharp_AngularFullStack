import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanActivateFn,
  CanDeactivateFn,
  CanMatchFn,
  RouterStateSnapshot,
} from '@angular/router';

export const canActivatedGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  console.log('CanActivatedGuard');
  return true;
};

export const canActivedChildGuard: CanActivateChildFn = (
  childRoute: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  console.log('CanActivedChildFn');
  return false;
};

export const canDeactiveGuard: CanDeactivateFn<any> = (
  component: any,
  currentRoute: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
  nextState: RouterStateSnapshot
) => {
  console.log('canDeactiveGuard');
  return true;
};
// ! Bu guardda kaldım  1:00:13
// export const canMatchGuard: CanMatchFn;
