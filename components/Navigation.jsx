import { Box } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
//import { NavBar } from "./NavBar";

export const Navigation = () => {
  return (
    <>
    <Box className="navbox" p="20px" bgColor="blue.300">
      <section className="events-nav">
        <div className="events-list-items">
          <nav>
            <ul>
              <ol>
                <Link to="/">Home</Link>
              </ol>
              <ol>
                <Link to="/events">Events</Link>
              </ol>
              <ol>
                <Link to="/event">Event</Link>
              </ol>
              <ol>
                <Link to="/users">Users</Link>
              </ol>
              <ol>
                <Link to="/event/addform">Add Event</Link>
              </ol>
              <ol>
                <Link to="/event/editevent">Edit Event</Link>
              </ol>
            </ul>
          </nav>
        </div>
      </section>
      </Box>
    </>
  );
};
