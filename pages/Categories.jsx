// import React from 'react'
import { useLoaderData, Link } from "react-router-dom";
import { Users } from './Users'
import { Button } from '@chakra-ui/react';

export const loader = async () => {
  const users = await fetch(`http://localhost:3000/users`);
  const events = await fetch(`http://localhost:3000/events`);
  const categories = await fetch(`http://localhost:3000/categories`);

  // const users = await fetch(`http://localhost:3000/users/${params.usersId}`);
  // const events = await fetch(`http://localhost:3000/events/${params.usersId}`);
  // const categories = await fetch(`http://localhost:3000/categories/${params.usersId}`);

  return {
    users: await users.json(),
    events: await events.json(),
    categories: await categories.json(),
  };
};

export const Categories = () => {
  return (
    <>
    <h1>Categories</h1>
    <Link to={`/events`}>
        <Button m="5px" p="5px" bg="blue.300">
          Click to go home
        </Button>
      </Link>
    </>
    
  )
}




