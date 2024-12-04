import { useState } from "react";
import { ICONS } from "../../assets";
import InputBox from "../../components/Login/InputBox";
import Button from "../../components/Shared/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

  const Login = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
  
    const handleLogin = async () => {
      try {
        // Configure Axios to send cookies
        const response = await axios.post(
          "https://interior-design-backend-nine.vercel.app/api/v1/login",
          {
            email: userName,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // This enables cookies
          }
        );
  
        console.log(response.status);
        if (response.data.success === true) {
          console.log("Login successful");
          navigate("/dashboard"); // Navigate to the dashboard
        } else {
          setErrorMessage("Login failed: " + response.data.message);
        }
      } catch (error: any) {
        console.error("Error details:", error);
        if (error.response) {
          // The server responded with a status code other than 2xx
          console.log("Response error:", error.response);
          setErrorMessage("Login failed: " + error.response.data.message);
        } else if (error.request) {
          // The request was made but no response was received
          setErrorMessage("Network error, please try again.");
        } else {
          // Something happened while setting up the request
          setErrorMessage("An error occurred: " + error.message);
        }
      }
    };
    
  
  return (
    <div className="bg-primary-10 w-screen h-svh pt-16 justify-center flex ">
      <div className="bg-primary-20 p-16 h-fit rounded-3xl items-center flex-col flex w-[888px]">
        <div>
          <img src={ICONS.logo} className="h-[128px] w-[128px]" />
        </div>
        <h2 className="text-text-accent font-normal text-[32px] leading-[32px]">
          Dashboard Login
        </h2>
        <div className="space-y-6 pb-9">
          <InputBox
            label="User name"
            placeholder="Enter your user name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <InputBox
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {errorMessage && (
          <div className="text-red-500 text-sm">{errorMessage}</div>
        )}

        <Button
          text="Login"
          textClass="text-[20px] leading-[24px] text-white flex justify-center"
          color="bg-accent-10 w-[515px] h-[64px]"
          onClick={handleLogin} // Trigger the login when button is clicked
        />
      </div>
    </div>
  );
};

export default Login;
