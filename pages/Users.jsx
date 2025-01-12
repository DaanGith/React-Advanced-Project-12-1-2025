//import React from "react";

import { useLoaderData, Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Center,
  Heading,
  Image,
  Text,
  Spacer,
  Container,
  SimpleGrid
} from "@chakra-ui/react";

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

export const Users = () => {
  const { users, categories } = useLoaderData();
  
  return (
    <>
      <Center fontSize="4xl" bg="teal" h="100px" color="white">
        Users
      </Center>
      
      <Container maxW="100%" centerContent>
        <SimpleGrid 
         justifyItems="center"
         m="5"
         spacing={10}
        >
        <Card 
          bgColor="green.100"  
          h="3xl" 
          mt="5" >
          <div className="users">
           
              <CardBody w="xl" bg="red.300">
                <Spacer />
                {users.map((users) => (
                  <div key={users.id} className="users">
                    <Heading mb="4" >{users.name}</Heading>
                    <Image
                      boxSize="150"
                      borderRadius="full"
                      src={users.image}
                      alt="users-images"
                    />
                      <Spacer />
                    <Text 
                      mt="3rem"
                      fontWeight="semibold"
                      >
                      <Link to={`/categories`}>More info
                      <Text>Categories:</Text>
                      </Link>
                      {categories.map(categories => (  
                        <ul key={categories.id}>
                          <li>{categories.name}</li>
                        </ul>
                      ))}
                      {/* {categories.map(categories => (  
                        <ul key={categories.id}>
                          <li>{categories.name}</li>
                        </ul>
                      ))} */}
                      <Spacer />
                    </Text>
                  </div>
                ))}
              </CardBody>
            
          </div>
        </Card>
        </SimpleGrid>
      </Container>


      <Link to={`/events`}>
        <Button m="5px" p="5px" bg="blue.300">
          Click to go home
        </Button>
      </Link>
    </>
  );
};



// <Center>
//         <Card bgColor="green.100"  h="3xl" mt="5" >
//           <div className="users">
//             <Stack >
//               <CardBody w="xl" bg="red.300">
//                 {users.map((users) => (
//                   <div key={users.id} className="users">
//                     <Heading>{users.name}</Heading>
//                     <Image
//                       boxSize="150"
//                       borderRadius="full"
//                       src={users.image}
//                       alt="users-images"
//                     />
//                       <Spacer />
//                     <Text mt="1rem">
//                       <Link to={`/categories`}>More info
//                       <h2>Categories:</h2>
//                       </Link>
//                       {categories.map(categories => (  
//                         <ul key={categories.id}>
//                           <li>{categories.name}</li>
//                         </ul>
//                       ))}
//                       {/* {categories.map(categories => (  
//                         <ul key={categories.id}>
//                           <li>{categories.name}</li>
//                         </ul>
//                       ))} */}
//                     </Text>
//                   </div>
//                 ))}
//               </CardBody>
//             </Stack>
//           </div>
//         </Card>
//       </Center>











{/* <CardBody w="md" bg="purple.200">
                {users.map((users) => (
                  <div key={users.id} className="users">
                    <Heading>{users.name}</Heading>
                    <Image
                      boxSize="150"
                      borderRadius="full"
                      src={users.image}
                      alt="users-images"
                    />
                     </div>
                ))}
                    <Stack>
                    <Text>
                      Categories:
                      {categories.map((categories) => {
                        <ul>
                          <li>{}</li>
                          <li>{categories.name}</li>
                          <li>{categories.name}</li>
                        </ul>;
                      })}
                    </Text>
                 
                </Stack>
              </CardBody> */}