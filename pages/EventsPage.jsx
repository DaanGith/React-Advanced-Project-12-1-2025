//import { useRef } from "react";
import {
  Button,
  Box,
  Card,
  CardBody,
  Center,
  Image,
  Text,
  Stack,
  Input,
  Select,
  SimpleGrid,
  Tag,
  Container
} from "@chakra-ui/react";
import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
//import { EventItemCard } from "../components/ui/EventItemCard";

export const loader = async () => {
  const users = await fetch("http://localhost:3000/users");
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");

  return {
    users: await users.json(),
    events: await events.json(),
    categories: await categories.json(),
  };
};

//1ste pagina -->  PostList
export const EventsPage = () => {
  const { users, events, categories } = useLoaderData();

  
  const [searchInput, setSearchInput] = useState("");
  const [selectCategory, setSelectCategory] = useState("");

  {/* searchbar */}
  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  {/* dropbox */}
  const handleCategoryChange = (event) => {
    setSelectCategory(event.target.value);
  };

  const filterEvents = events.filter((event) => {
    if (selectCategory) {
      const category = event.categoryIds;
      return (
        (category == selectCategory &&
          event.title.toLowerCase().includes(searchInput.toLowerCase())) ||
        event.description.toLowerCase().includes(searchInput.toLowerCase())
      );
    } else {
      return (
        event.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        event.description.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
  });
  
  return (
    <> 
     {/* heading */}
      <Center fontSize="4xl" bg="teal" h="100px" color="white">
        1ste pag Events Page
      </Center>
      
      {/* searchbar */}
      <Center bg="teal">
        <Input 
         placeholder="Search event" 
         borderColor="black"
         bg="white"
         w="50%"
         m="3"
         borderRadius="md"
         onChange={handleSearchInput}
         />
      
      </Center>
      
      {/* dropbox */}
      <Center bg="teal">
       <Select
         placeholder="Select category"
         borderColor="black"
         bg="white"
         w="50%"
         m="3"
         borderRadius="md"
         onChange={handleCategoryChange}
        >
        <option value={1}>sports</option>
        <option value={2}>games</option>
        <option value={3}>relaxation</option>
       </Select>
      </Center>
      
      <Container maxW="100%" p="4" bg="teal">
        <SimpleGrid 
          columns={{ sm: 1, md: 2, lg: 3, xl: 4}} 
          justifyItems="center" 
          m="5" 
          spacing={10}>
        {filterEvents.map((event) => (
          <Box 
           key={event.id}
           className="events-list"
           p={5}
           spacing={4}
           align="center"
           bg={"teal.100"}
          
           > 
            <Card 
              mt={5} 
              w={"100%"}              
              >
                <CardBody mt={5}>
                  <Stack 
                   direction="row" 
                   spacing={5} 
                   align="center">
                  
                  <div>
                    <Text
                     fontSize="3xl" 
                     fontWeight="semibold" 
                     p="5" 
                     align="center" 
                     >
                      {event.title}
                    </Text>
                        <Link to={`/event`}>
                        <Image h="md" w="xl" src={event.image} 
                        />
                        </Link>
                        
                        <Box 
                         bg="white"
                         
                         >
                        <Text 
                          fontSize="lg" 
                          fontWeight="semibold" 
                          mt={5}
                        >
                          {event.description}
                        </Text>
                        <Text 
                          mt={1} 
                          fontWeight="semibold"
                          >
                          {event.location}
                        </Text>

                        <Text 
                          mt={1} 
                          fontWeight="semibold"
                          > 
                          Start Time: 
                          {new Date(event.startTime).toLocaleString([], {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                         })}{""}
                         {" - "}
                         {new Date(event.endTime).toLocaleString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                         })}
                        </Text>  

                        {/* <Text mt={1}>End Time: {event.endTime}</Text> */}
                        {categories.map((category) => 
                          event.categoryIds.includes(category.id) ? (
                        <Tag
                          key={category.id}
                          mt={2}  
                          mb={2} 
                          fontWeight="semibold"
                        >
                          Category:
                          {categories.name}
                          
                          </Tag>
                          ) : null
                        )}
                       
                      
                        </Box>
                        Created by:{" "}
                    <Link to={`/users`}> 
                      {users.find((users) => users.id === users.id).name}
                    </Link>
                </div>  
              
                </Stack>
            </CardBody>
          </Card>
      
                      
       
        </Box>
      ))}
        </SimpleGrid>
    
        </Container>
      <Link to={`/`}>
        <Button bgColor="red.400" m="5px" p="5px">
          Click to go back
        </Button>
      </Link>
    </>
    
  );
};


//===================================================

  {/* <Text mt={2} mb={2}>Category: 
                                        {categories.find((category) => category.id === event.categoryId)?.name}</Text> */}

                                      {/* <Text>Created by: {users.name}</Text> */}

                                      {/* </Box>
                                  Created by:{" "}
                                  <Link to={`/users`}> 
                                    {users.find((user) => user.id === event.userId)?.name}
                                  </Link>
                              </div>  
                              ))} */}


// Hook.Exercise: scroll effect using the useRef hook

// import { useRef } from 'react';

// export const App = () => {

//   const helloRef = useRef(null);
//   const topRef = useRef(null);
  
  
//   const executeScroll = (ref) => 
//     ref.current.scrollIntoView({ behavior: "smooth"});
  


//   return (
//     <>
//       <div ref={topRef} className="fullscreen-height">
//         <h1>Ref exercise starter</h1>
//         <button onClick={() => executeScroll(helloRef)}> Click to scroll </button>
//       </div>

//       <div ref={helloRef} className="fullscreen-height lightblue-background">
//         <h3>See up!!</h3>
//         <h1>Hello</h1>
//         <button onClick={() => executeScroll(topRef)}>Click to scroll back up</button>
//       </div>
//     </>
//   );
// };

//===================================================

// opmaak card

 {/* <Center w="100vw" bg="blue.300">
        <div className="events-list">
          {events.map((event) => (
            <div key={event.id} className="event">
                  <Center fontSize="3xl" >{event.title}</Center>
                  {events.map((events) => (
                    <div key={events.image}>
                      <Image h="64" w="md" src={events.image} />
                     
                        <Heading size="md">{events.title}</Heading>
                        <Text>{events.description}</Text>  
                    </div>
                  ))}

                  <Link to={`event/${event.id}`}>
                    <h2>{categories.name}</h2>
                  </Link>
                
              
            </div>
          ))}
        </div>
      </Center> */}


//===================================================



// A list of events:

// - We would like to display a list of all events in <EventsPage/>.
//   Start by retrieving all the events from the back-end using a query.

// - Display the fetched events on the users’ screen.

// - Add the following details when displaying an event: title, description,
//   image, startTime & endTime, categories

// - Make an event item clickable that leads the user to a separate
//   event page by using React Router.

// - Add an “Add event” button that either opens a pop-up/modal or leads
//   you to a new screen where you can add new events by using a form.

// - Connect the add events feature with the back-end so that new events
//   get uploaded to the server as well.

// - Add a Search Function. We want a way for users to search for specific
//   events on the page that displays all the events.

// - Add a Filter Function. We need a feature that lets users filter the
//   displayed results based on different categories.
