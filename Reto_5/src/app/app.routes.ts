import { Routes } from '@angular/router';
import { Login } from './features/pages/login/login';
import { SignUp } from './features/pages/sign-up/sign-up';
import { Home } from './features/pages/home/home';
import { Upload } from './features/pages/upload/upload';

export const routes: Routes = [
    {
        path:"",
        component:Login,
        pathMatch:"full"
    },
    {
        path:"sign-up",
        component:SignUp,
        pathMatch:"full"
    },
     {
        path:"home",
        component:Home,
        pathMatch:"full"
    },
    {
        path:"upload",
        component:Upload,
        pathMatch:"full"
    },
    {
        path:"**",
        redirectTo:""
    }
];
