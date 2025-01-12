import React, { useState } from "react";
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
// Textarea,
 useToast,
 
 } from "@chakra-ui/react";
 import { Form, Link, useLoaderData } from "react-router-dom";

export const loader = async ({ params } ) => {
    const users = await fetch ("http://localhost:3000/users");
    // const events = await fetch("http://localhost:3000/events");
    const event = await fetch(`http://localhost:3000/event/${params.eventId}`);
    const categories = await fetch ("http://localhost:3000/categories");
    // const categories = await fetch (`http://localhost:3000/categories/${params.id}`);
  
    return {
      users: await users.json(), 
      event: await event.json(), 
      categories: await categories.json() };
  };
  

export const EditEvent = () => {

    const toast = useToast();
    const { users, categories, event } = useLoaderData();
    const [ updatedEvent, setUpdatedEvent ] = useState({
      ...event,
      startTime: new Date(event.startTime),
      endTime: new Date(event.endTime),
    });
    
    const handleInputChange = (event) => {
        setUpdatedEvent({ ...updatedEvent, [event.target.name]: event.target.value });
      };
    
      const handleEditSubmit = (event) => {
        event.preventDefault();
    
        fetch(`http://localhost:3000/events/${updatedEvent.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEvent),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            toast({
              title: "Event Edited Succesfully.",
              status: "success",
              duration: 5000,
              position: "top-right",
              isClosable: true,
            });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      };

    return (
        <>
        <div className="event-page">
            <Center 
              fontSize="4xl"
              bg="teal" 
              h="100px" 
              color="white"
              >
                Edit your Event
            </Center>
                        
            <Container 
              maxW="5xl" 
              h="100%" 
              bg="red.400" 
              p="4" >
            <Box w="100%">
            <Form method="post" id="add-new-event" >
          
          <Form method="PUT" id="new-event-form" onSubmit={handleEditSubmit}>
            <FormControl FormControl isRequired mb="48px">
             <FormLabel Is required>Select user</FormLabel>
                <Select 
                w="md" 
                bg="white" 
                name="createdBy" 
                placeholder="Select a user"
                onClick={handleInputChange}
                >
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
                placeholder="An exciting title..."
                type="text"
                name="title"
                value={updatedEvent.title}
                onChange={handleInputChange}
                />
            </FormControl>

                <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Input
                name="description"
                placeholder="Description"
                type="text"
                value={updatedEvent.description}
                onChange={handleInputChange}
                />
            </FormControl>

               <FormControl mb="20px" isRequired>
                <FormLabel>Category</FormLabel>
                <Select 
                  placeholder="Category"
                  name="category"
                  bg="white"
                  value={updatedEvent.categoryIds}
                  onChange={handleInputChange}
                  >
                  {categories.map((category) => ( 
                   <option key={category.id} value={category.id}>
                     {category.name}
                   </option>
                   ))}
                 </Select>
                </FormControl>

                <FormControl mb="20px" isRequired>
                 <FormLabel>Location</FormLabel>
                 <Input 
                  placeholder="Location"
                  name="location"
                  type="text"
                  bg="white"
                  value={updatedEvent.location}
                  onChange={handleInputChange}
                 />
                </FormControl> 

                <FormControl mb="40px" isRequired>
                 <FormLabel>Start Time</FormLabel>
                  <Input 
                   placeholder="StartTime"
                   name="startTime"
                   type="datetime-local"
                   bg="white"
                   value={updatedEvent.startTime}
                   onChange={handleInputChange}
                 />
                </FormControl>
            
                <FormControl mb="40px" isRequired>
                 <FormLabel>End Time</FormLabel>
                  <Input 
                   placeholder="endTime"
                   name="endTime"
                   type="datetime-local"
                   bg="white"
                   value={updatedEvent.endTime}
                   onChange={handleInputChange}
                  />
                </FormControl>

                {/* <FormControl mb="40px" isRequired> 
                 <FormLabel>Description New Event</FormLabel>
                  <Textarea
                   placeholder="enter a new event"
                   name="description"
                   bg="white"
                 />
                </FormControl> */}

             </Form>

             <Box>
              <Stack spacing={4} direction="row" align="center" >
             
              <Button
               type="submit"

              >
                Edit Event
              </Button>

             <Link to={`/addform`}>
                <Button
                type="submit"

                >
                Back to Add Event
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
           
        </div>
        </>
    );
};