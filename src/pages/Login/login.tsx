import { useState } from "react";
import { ICONS } from "../../assets";
import InputBox from "../../components/Login/InputBox";
import Button from "../../components/Shared/button";
import { useNavigate } from "react-router-dom";

const login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="bg-primary-10 w-screen h-screen justify-center p-[86px] flex ">
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
        <Button
          text="Login"
          textClass="text-[20px] leading-[24px] text-white flex justify-center"
          color="bg-accent-10 w-[515px] h-[64px]"
          onClick={() => navigate("/dashboard")}
        />
      </div>
    </div>
  );
};

export default login;
