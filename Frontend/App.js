import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './src/components/Header';
import SignUp from './src/components/SignUp';
import Login from './src/components/Login'
import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom';


const AppLayout = () => {
    return(
        <>
        <Header/>
        <Outlet/>
        </>
    );
}



const appRouter = createBrowserRouter([
    {
        path:'/',
        element:<AppLayout/>,
        children:[
            {
            path:'/login',
            element:<Login/>
            },
            {
            path:'/signup',
            element:<SignUp/>
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);