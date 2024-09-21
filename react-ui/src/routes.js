import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdLogout,
  MdOutlineShoppingCart,
} from 'react-icons/md';

// Admin Imports
import MainDashboard from 'views/admin/default';
import NFTMarketplace from 'views/admin/marketplace';
import Profile from 'views/admin/profile';
import DataTables from 'views/admin/dataTables';
import userServys from 'views/admin/userServys';
import RTL from 'views/admin/rtl';

// Auth Imports
// import SignInCentered from "views/auth/signIn";
import SignIn from 'views/auth/signIn/index.jsx';
import SignUp from 'views/auth/signUp/index.jsx';

const routes = [
  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: 'NFT Marketplace',
    layout: '/admin',
    path: '/nft-marketplace',
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: 'User Surveys',
    layout: '/admin',
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: '/user-servys',
    component: userServys,
  },
  {
    name: 'Data Tables',
    layout: '/admin',
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: '/data-tables',
    component: DataTables,
  },
  {
    name: 'Profile',
    layout: '/admin',
    path: '/profile',
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },
  {
    name: 'Signin',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdHome} width='16px' height='16px' color='inherit' />,
    component: SignIn,
    hide: true,
  },
  {
    name: 'Sign up',
    layout: '/auth',
    path: '/sign-up',
    icon: <Icon as={MdHome} width='16px' height='16px' color='inherit' />,
    component: SignUp,
    hide: true,
  },
  {
    name: 'RTL Admin',
    layout: '/rtl',
    path: '/rtl-default',
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: RTL,
  },
];

export const Logout = [
  {
    name: 'Log Out',
    layout: '/auth',
    path: '/sign-out',
    icon: <Icon as={MdLogout} width='16px' height='16px' color='inherit' />,
    component: SignIn,
  },
];
export default routes;
