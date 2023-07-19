import React from "react";
import { NavLink } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { LinkContainer } from "react-router-bootstrap";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../gqloperations/mutation";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { GET_ALL_QUOTES } from "../gqloperations/queries";

const Login = () => {
  const navigate = useNavigate()
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
const [signinUser,{ data, error, loading}] = useMutation(LOGIN_USER,{
  refetchQueries:[
    GET_ALL_QUOTES,
    "findquotes"
  ]
})

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

if(data){
  console.log("login data", data)
  localStorage.setItem("token",data.user.token)
  navigate("/")
}

  const postData = (user) => {
    signinUser({
      variables:{
        userlogin:user
      }
    })
    console.log("login daataa",data);
    reset()
  };

  return (
    <>
      <div className="container mx-auto mt-5 ">
        <div
          className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-600 text-center"
          role="alert"
        >
          <span className="font-medium">User Login</span>
        </div>
        
        {error && (
          <div style={{ color: "red" }} className="m-5 text-red-600">
            {error.message}
          </div>
        )}

        {data && data.user && (
          <div className="text-green-400 m-5">
            user is Login successfully{" "}
          </div>
            
        )}
        <div className="mt-5" style={{width:"50%" , margin:"auto"}}>
          <form onSubmit={handleSubmit(postData)}>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="email"
                name="email"
                id="email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                {...register("email", { required: true })}
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
              {errors.email && (
                <p className="mt-3" style={{ color: "red" }}>
                  Email is required
                </p>
              )}
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="password"
                name="password"
                id="password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                {...register("password", { required: true })}
              />
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
              {errors.password && (
                <p className="mt-3" style={{ color: "red" }}>
                  Password is required
                </p>
              )}
            </div>
            <LinkContainer to="/sign-up">
            <NavLink>
               <p style={{color:"blue"}}>Don't have an account ?</p>
            </NavLink>
            </LinkContainer>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-3"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      
    </>
  );
};

export default Login;
