import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../auth-context/auth.context';
import { useHistory } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';

export const ProtectedRoute = ({ ...rest }) => {
  const history = useHistory();
  let { user } = useAuth();
  const is_active = true;

  // Check if the user is not authenticated
  if (!user || !user.token || user.token === '') {
    return (
      <SweetAlert
        title='You must be signed in!'
        onCancel={() => history.push('/auth/sign-in')}
        onConfirm={() => history.push('/auth/sign-in')}
        confirmBtnCssClass={'px-5'}
      />
    );
  }
  console.log(rest.location.pathname, 'wwewewewe', user, user.is_active);
  // Check if the user is inactive and trying to access /user-servys
  if (user.is_active && rest.location.pathname === '/admin/user-servys') {
    return (
      <SweetAlert
        title='Access Denied!'
        onCancel={() => history.push('/admin/unauthorized')}
        onConfirm={() => history.push('/admin/unauthorized')}
        confirmBtnCssClass={'px-5'}
        showCancel={false}>
        You do not have access to this page.
      </SweetAlert>
    );
  }

  // If the user is authenticated and has access, render the route
  return <Route {...rest} />;
};
