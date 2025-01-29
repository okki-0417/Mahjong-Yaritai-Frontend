import { useContext, useEffect } from "react";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth === false) {
      navigate("/auth/login");
    }
    console.log(`Dashboard: ${auth}`);
  }, [auth]);

  return <div className="bg-red-200"></div>;
}
