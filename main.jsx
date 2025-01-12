import { ChakraProvider } from '@chakra-ui/react';

import ReactDOM from 'react-dom/client';
import { EventPage, loader as eventPageLoader } from './pages/EventPage';
import { EventsPage, loader as eventsPageLoader } from './pages/EventsPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './components/Root';
import { Users, loader as usersLoader } from './pages/Users';
import { AddForm, loader as addFormLoader, action as addForm } from './pages/AddForm';
import { EditEvent, loader as editEventLoader } from './pages/EditEvent';
import React from 'react';

// import { App } from "./pages/App";
// import "./index.css";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/events',
        element: <EventsPage />,
        loader: eventsPageLoader,
      },
      {
        path: '/event/:eventId',
        element: <EventPage />,
        loader: eventPageLoader,
        //action: addComment,
      },
      {
        path: '/users',
        element: <Users />,
         loader: usersLoader,
         //action: addComment,
      },
      {
        path: '/event/addform',
        element: <AddForm />,
         loader: addFormLoader,
         action: addForm,
      },
      {
        path: '/editevent/:eventId',
        element: <EditEvent />,
         loader: editEventLoader,
         //action: addComment,
      },
    ],
  },
]);

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
