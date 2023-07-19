import { useQuery } from "@apollo/client";
import axios from "axios";
import React, { useEffect } from "react";
import { GET_ALL_QUOTES } from "../gqloperations/queries";
import { relayStylePagination } from "@apollo/client/utilities";
import { NavLink } from "react-router-dom";

const Home = () => {
  const { loading, error, data } = useQuery(GET_ALL_QUOTES);

  if (loading) {
    return (
      <div className="container mx-auto mt-5">
        <h3>Loading....</h3>
      </div>
    );
  }
  if (error) {
    console.log(error.message);
  }
  if (data.quotes.length == 0) {
    return (
      <div className="container mx-auto mt-5 ">
        <h2 style={{ fontSize: "50px" }}>No Quotes Available </h2>
      </div>
    );
  }

  // console.log(data, "datas");
  return (
    <>
      <div className="mt-5 container mx-auto">
        <h1
          className="text-center bg-sky-500/75"
          style={{
            fontSize: "30px",
            border: "2px solid gray",
            color: "white",
            borderRadius: "10px",
          }}
        >
          All Quotes
        </h1>
        <div className="mt-5 text-center justify-start">
          {data.quotes.map((item, index) => {
            return (
              <>
                <div className="mt-5">
                  <h2 className="font-bold text-2xl">{item.name}</h2>
                  <NavLink to={`/profile/${item.by._id}`}> 
                    <p style={{color:"blue"}}>
                      {item.by.firstName} {item.by.lastName}
                    </p>
                  </NavLink>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
