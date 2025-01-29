import { useContext, useEffect, useState } from "react";
import RenderErrors, { Errors } from "../../../components/render-errors";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthContext } from "../../../App";
import { useNavigate } from "react-router";
import { BASEURL } from "../../../api-config";

type ForumThread = {
  topic: string;
};

export default function NewForumThread() {
  const { auth } = useContext(AuthContext);
  const [resErrors, setResErrors] = useState<Errors[]>([]);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForumThread>({ mode: "onChange" });

  useEffect(() => {
    if (auth === false) {
      navigate("/auth/login");
    }
    console.log(`ForumThreadNew: ${auth}`);
  }, [auth]);

  const onSubmit: SubmitHandler<ForumThread> = async (formData) => {
    const csrfToken = document
      .querySelector("meta[name='csrf-token']")
      ?.getAttribute("content");

    const response = await fetch(`${BASEURL}/forum_threads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken || "",
      },
      credentials: "include",
      body: JSON.stringify({ forum_thread: formData }),
    });

    if (!response.ok) {
      setResErrors([...resErrors, (await response.json())?.errors]);
    }

    const data = await response.json();

    navigate(`/forum-threads/${data.forum_thread.id}`);
  };

  return (
    <div className="lg:w-1/2 mx-auto bg-white py-8 lg:px-16 px-4  mt-16 rounded-md">
      <div>
        <h1 className="lg:text-3xl text-2xl font-semibold">スレッドを作る</h1>
        <div className="w-full mt-4">
          {resErrors[0] && (
            <RenderErrors errors={resErrors[resErrors.length - 1]} />
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-6 lg:gap-8 gap-1">
              <div className="col-span-2 flex items-center lg:text-lg">
                <label htmlFor="name">タイトル</label>
              </div>
              <div className="col-span-4 p-2">
                <input
                  type="text"
                  {...register("topic", {
                    required: "必須です",
                  })}
                  className={`border border-black rounded-sm h-8 w-full p-2 ${errors.topic ? "bg-red-200" : ""}`}
                />
                {errors.topic && (
                  <span className="text-red-500">{errors.topic?.message}</span>
                )}
              </div>
            </div>

            <div className="mt-8 flex lg:gap-4 gap-2">
              <div>
                <input
                  type="submit"
                  value="スレッドを作る"
                  className="btn btn-main"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
