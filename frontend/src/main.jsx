import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import  {createBrowserRouter , RouterProvider }from 'react-router-dom'
import ErrorPage from './pages/error-page/ErrorPage.jsx'
import SignUp from './pages/Signup/Signup.jsx'
import Login from './pages/Login/Login.jsx'
import UserProvider from './context/UserContext.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'


import Protected from './components/Private/Private.jsx'
import Logout from './pages/logout/Logout.jsx'
import Details from './pages/details/Details.jsx'
import AddContact from './pages/add-contact/AddContact.jsx'
import EditContact from './pages/edit-contact/EditContact.jsx'



const router = createBrowserRouter([
  {
    path: "/directory",
    element: <UserProvider><App /></UserProvider>,
    errorElement: <ErrorPage />,
    children: [
     { path: "signup", index: true, element: <SignUp />},
     {path: "login", element: <Login />},
     {path: "dashboard", element:  <Dashboard /> },
     {path: "logout", element: <Logout />},
      {path: "c/:id", element: <Details />},

      {path: "create", element: <AddContact />},
      {path: "edit_contact/:id", element: <EditContact /> },
     
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)




