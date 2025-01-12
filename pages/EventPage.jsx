import React from "react";
import { 
  Button,
  // Card, 
  // CardBody, 
  Center, 
  Heading, 
  Image, 
  // Stack, 
  Text,
  useToast,
  Box,
  Flex,
  Tag,
  Spacer
  
} from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";

// params??
export const loader = async ({ params} ) => {
  const users = await fetch ("http://localhost:3000/users");
  //const event = await fetch("http://localhost:3000/event");
  const event = await fetch(`http://localhost:3000/event/${params.id}`);
  const categories = await fetch ("http://localhost:3000/categories");
  // const categories = await fetch (`http://localhost:3000/categories/${params.id}`);

  return {
    users: await users.json(), 
    event: await event.json(), 
    categories: await categories.json() };
};

//dit is de 2de pagina na click

export const EventPage = () => {
  const { users, event, categories } = useLoaderData();
  const toast = useToast();

  const showToast = JSON.parse(localStorage.getItem("showToast"));

  if(showToast){
    toast({
      title: "Event has been updated",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    localStorage.setItem("showToast", false);
  }

  const handleDeleteClick = async () => {
    if(window.confirm("Do you want to delete this event?")){
      await fetch(`http://localhost:3000/event/${event.id}`, {
        method: "DELETE",
      })
        .then(() => {
          toast({
            title: "Event has been deleted",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        })
          .catch((error) => {
            console.error("Error:", error);
          });
    }
  };

  return (
    <Center>
      <Box>
        <Box
          key={event.id}
          bg="white"
          border={"1px"}
          borderColor="black"
          borderRadius="0.5rem"
          margin={"2rem"}
          w={{ base: "95%", md: "90%", lg: "80%" }}
          mx="auto"
        >
          <Box p={6}>
            <Flex alignItems={"center"}>
              {categories.map((category) =>
                event.categoryIds.includes(category.id) ? (
                  <Box key={event.categoryIds}>
                    <Tag
                      fontSize={"sm"}
                      fontWeight="medium"
                      key={category.id}
                      color="white"
                      bg="purple"
                      borderRadius="0.5rem"
                      p={2}
                      marginRight={3}
                      marginBottom={3}
                    >
                      {category.name}
                    </Tag>
                  </Box>
                ) : null
              )}
              <Spacer />
              {users.map((user) =>
                user.id == event.createdBy ? (
                  <Box key={user.id}>
                    <Image boxSize="33px" src={user.image} />
                  </Box>
                ) : null
              )}
              {users.map((user) =>
                user.id == event.createdBy ? (
                  <Box key={user.id}>
                    <Tag color="white" bg="purple" borderRadius="0rem" p={2}>
                      <Text>{user.name}</Text>
                    </Tag>
                  </Box>
                ) : null
              )}
            </Flex>

            <Heading marginBottom={"0.5rem"} as="h1" size="2xl" noOfLines={1}>
              {event.title}
            </Heading>

            <Text marginBottom={"1rem"}>
              {new Date(event.startTime).toLocaleString([], {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              {"-"}
              {new Date(event.endTime).toLocaleString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>

            <Text fontSize="4xl" noOfLines={2}>{`${event.description}`}</Text>
            <Text>location: {event.location}</Text>

            <Box marginTop={"1rem"}>
              <Link to={"/"}>
                <Button
                  margin={"0.5rem"}
                  variant="outline"
                  borderRadius="0.5rem"
                  bg={"white"}
                  borderColor="black"
                >
                  Back to all events
                </Button>
              </Link>

              <Link to={"/"}>
                <Button
                  onClick={handleDeleteClick}
                  margin={"0.5rem"}
                  variant="outline"
                  borderRadius="0.5rem"
                  bg={"red"}
                  color="white"
                  borderColor="black"
                >

                  Delete event
  
                </Button>
              </Link>

              <Link to={`/editevent/${event.id}`}>
                <Button
                  margin={"0.5rem"}
                  variant="outline"
                  borderRadius="0.5rem"
                  bg={"blue.400"}
                  color="white"
                  borderColor="black"
                >

                  Edit event
                  
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Center>
  );
};



//   return (
//     <>
//       <div className="event-page">
//         <Center 
//           fontSize="4xl"
//            bg="teal" 
//           //  w={{ base: "100%", md: "90%", lg: "80%" }}
//            h="100px" 
//            mx="auto"
//            color="white"
//            >
//             Event
//           </Center>
//         <Heading>Hier komt 2de pag na klik</Heading>

//         <Center>
//           <Card 
//             borderRadius="xl" 
//             w="3xl" 
//             h="3xl" 
//             bg="green.300"
//           >
//             <CardBody>
//             {event.map((events) => (
//               <div key={events.id}>
              
//                   <Image 
//                     src={event.image}
//                     key={event.id} 
//                     h="md" 
//                     w="100%" 
//                     p="1em" 
//                     borderRadius="30px" />
              
              
//               <Stack>
//                 <p>Created by: {users.id}</p>  
//                 <Text 
//                   mt={2} 
//                   mb={2}>Category: {categories.name}</Text>
//               </Stack>              
//               </div>
//               ))}
//             </CardBody>
//           </Card>
          
//         </Center>
        
//         {/* <Card 
//           m="5px"
//           bg="blue.200" 
//           borderRadius="xl" 
//           w="sm" h="30rem"
//           //cursor="pointer"
//           >
//             <CardBody>
//               {events.map((events) => ( 
//                 <div key={events.id}>
//               <Image h={64} w="sm" src={events.image}/>
//               </div>
//             ))}
//             </CardBody>
         
//         </Card> */}

//               <Link to={"/"}>
//                 <Button
//                   onClick={handleDeleteClick}
//                   margin={"0.5rem"}
//                   variant="outline"
//                   borderRadius="0.5rem"
//                   bg={"red"}
//                   color="white"
//                   borderColor="black"
//                 >

//                   Delete event
  
//                 </Button>
//               </Link>
        
//         <Link to={`/events`}>
//           <Button m="5px" p="5px">
//             Click to go back
//           </Button>
//         </Link>
//       </div>
//     </>
//   );
// };

{/* <Center w="100%" h="100vh" p="2px">
<form action=""></form>
</Center> */}

// Event page:

// - Start working in the <EventPage /> component and show the following 
//   details on the screen: title, description, image, startTime & endTime, 
//   categories and by who it’s created (name, image)

// - Create an “Edit” button that allows the user to edit the details shown 
//   on the page. You can open it in a modal, or the same page, etc. 
//   Use a form to edit the data.

// - Update the data on the server after saving newly made edits.

// - Show a message on success or on failure. This can be done e.g. in the form of a toast: 	
	
// 	https://v2.chakra-ui.com/docs/components/toast

// - Add a delete button that allows the user to delete the event.

// - Add an extra check and warning to make sure that the user is 100% sure 
//   they want to delete the event

// - Sent a delete request to the server after confirmation. 

// - Redirect the user back to the events page