import { useContext, useEffect } from "react";
import { AuthContext } from "../../../App";
import { useNavigate, useParams } from "react-router";
import { BASEURL } from "../../../api-config";

export default function ShowForumThread() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (auth === false) {
      navigate("/auth/login");
    }
    console.log(`ForumThreadNew: ${auth}`);

    const getForumThread = async () => {
      const response = await fetch(`${BASEURL}/forum_threads/${id}`);

      const data = await response.json();
      console.log(`DATA: ${JSON.stringify(data)}`);
    };

    getForumThread();
  }, [auth]);

  return <div></div>;
}
