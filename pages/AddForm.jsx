import React from "react";
// import { useState } from "react";
import { Form, useLoaderData, Link, redirect } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
// import { render } from "react-dom";
// import { useForm } from "react-hook-form";

export const action = async ({ request }) => {

  const formData = Object.fromEntries(await request.formData());
  const newId = await fetch("http://localhost:3000/events", {
    method: "POST",	
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json"},
     })
    .then((res) => res.json())
    .then((json) => json.id);

    localStorage.setItem("showToast", true);

  return redirect(`/event/${newId}`);
};

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

//Chakra UI + React Hook Form
export const AddForm = () => {
  const { users, categories } = useLoaderData();
  
  
  return (
    <>
      <Center fontSize="4xl" bgColor="teal" h="100px" color="white">
        Add new Event
      </Center>
    

      <Container maxW="5xl" h="100%" bg="blue.400" p="4" >
        <Box w="100%">
            <Form method="post" id="addform-new-event" >
              <FormControl isRequired mb="48px">
                <FormLabel>Is required:</FormLabel>
                <Select
                  w="md" 
                  bg="white" 
                  name="createdBy" 
                  placeholder="Select a user">
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                </Select>
              </FormControl>
            </Form>

              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input 
                  type="text" 
                  placeholder="Title" 
                  name="title"
                  bg="white"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Input 
                  type="text" 
                  placeholder="Description" 
                  name="description"
                  bg="white"
                />
              </FormControl>
              
              <FormControl mb="20px" isRequired> 
                <FormLabel >First Name</FormLabel>
                <Input 
                  placeholder="First Name" 
                  name="first-name"
                  bg="white"
                  />
              </FormControl>
            
              <FormControl mb="20px" isRequired> 
                <FormLabel >Last Name</FormLabel>
                <Input 
                  placeholder="Last Name"
                  name="last-name"
                  bg="white"                  
                  />
              </FormControl>

                <FormControl mb="20px" isRequired>
                  <FormLabel>Category</FormLabel>
                  <Select 
                    placeholder="Category"
                    name="category"
                    bg="white"
                    >
                    {categories.map((category) => ( 
                      <option key={categories.id} value={categories.id}>
                        {category.name}
                      </option>
                      
                    ))}
                    <option value={1}>music</option>
                  </Select>
                </FormControl>

                <FormControl mb="20px" isRequired>
                  <FormLabel>Location</FormLabel>
                  <Input 
                  placeholder="Location"
                  name="category"
                  bg="white"
                  />
                </FormControl>

                <FormControl mb="40px" isRequired>
                  <FormLabel>Start Time</FormLabel>
                  <Input 
                  placeholder="StartTime"
                  name="startTime"
                  bg="white"
                  />
                </FormControl>
              
                <FormControl mb="40px" isRequired>
                  <FormLabel>End Time</FormLabel>
                  <Input 
                  placeholder="endTime"
                  name="endTime"
                  bg="white"
                  />
                </FormControl>

                <FormControl mb="40px" isRequired> 
                  <FormLabel>Description New Event</FormLabel>
                <Textarea
                  placeholder="enter a new event"
                  name="description"
                  bg="white"
                />
                </FormControl>



             <Box>
              <Stack spacing={4} direction="row" align="center" >
             
             
             <Button
              type="submit"

              >
               Add Event
              </Button>
              
              <Link to={'/editevent'}>
              <Button
               type="submit"
              >
                Go To Edit Event
              </Button>
              </Link>
              <Button
               type="submit"

              >
                Delete Event
              </Button>
              <Checkbox size="md" >Checkbox</Checkbox>
              </Stack>
              </Box>

          </Box>

      </Container>
      <br />

      <br />

      <Link to={`/events`}>
        <Button m="5px" p="15px">
          Click to go home
        </Button>
      </Link>
      <br />
     
    </>
  );
}


  // const [ quotes, setQuotes ] = useState({
  //    quote:
  //     "My biggest fear is that people will attribute fake quotes to me and millions of morons on the internet will believe it.",
  //     name: "Albert Einstein",
  //  },
  // });

  // const

  // Textarea

 {/* Quotes example zie exercise*/}
              {/* <div className="App">
            <h1>Add a Famous Quote</h1>
            <form onSubmit={addQuote}>
              <textarea
                onChange={(e) => setQuote(e.target.value)}
                value={quote}
                rows={4}
              />
              <input
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <button type="submit">Add Quote</button>
            </form>
            <h1>Famous Quotes:</h1>
            {quotes.map((quote) => {
              return (
                <div className="quote" key={quote.quote}>
                  <p>{quote.quote}</p>- <span>{quote.name}</span>
                  <hr />
                </div>
              );
            })}
          </div> */}

  //import { useForm } from "react-hook-form";
//   let renderCount = 0;

//   const { register, handleSubmit } = useForm();
//   renderCount++;

//   <Button renderCount = {renderCount}>
//   Render count: 1
// </Button>


// <Form onSubmit={handleSubmit((data) => {
// console.log(data);
// })} 
// >
// <Input {...register("firstName")} placeholder="First Name"/>
// <Input {...register("lastName")} placeholder="Last Name"/>
// <Button type="submit">Submit</Button>
// {/* <Input type="submit" /> */}
// </Form>