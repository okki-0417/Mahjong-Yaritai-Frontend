import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthStateContext } from "../../contexts/AuthStateContextProvider";

export default function Dashboard() {
  const { auth } = useContext(AuthStateContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth === false) {
      navigate("/auth/login");
    }
    console.log(`Dashboard: ${auth}`);
  }, [auth]);

  return <div className="bg-red-200"></div>;
}
