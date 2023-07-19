import { useQuery } from "@apollo/client";
import React from "react";
import { GET_MY_PROFILE, GET_USER_BY_ID } from "../gqloperations/queries";
import {useParams} from 'react-router-dom'


const OtherUserProfile = () => {
  const {userId} = useParams()
//   console.log("userId", userId)

  const { loading, error, data } = useQuery(GET_USER_BY_ID,{
    variables:{
        userid:userId
    }
  });

  if (error) {
    console.log("profile page error", error);
  }

  
  if (loading) {
    return (
      <div className="container mx-auto mt-5">
        <h3>Profile is Loading....</h3>
      </div>
    );
  }
  if (data) {
    console.log(data);
  }

  return (
    <>
      <div className="mt-5 container mx-auto">
        <div style={{ display: "block", margin: "auto" }}>
          <div>
            <img
              style={{ border: "2px solid gray" }}
              className="rounded-full w-96 h-80"
              src={`https://robohash.org/${data.user}.png`}
              alt="image description"
            />
          </div>
          <div style={{ width: "75%", margin: "auto" }}>
            <h1
              className="mt-5"
              style={{ fontWeight: "bold", fontSize: "20px" }}
            >
              {data.user.firstName} {data.user.lastName}
            </h1>
            <h4 className="">{data.user.email}</h4>
            <br />
            <br />
            <br />

            <h3 style={{ fontSize: "50px" }}>Your Quotes</h3>
            {data.user &&
              data.user.quotes.map((item, index) => {
                return (
                  <>
                    <blockquote>
                      <h6>{item.name}</h6> <hr />
                    </blockquote>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default OtherUserProfile;
