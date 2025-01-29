import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { BASEURL } from "../../../api-config";
import RenderErrors, { Errors } from "../../../components/render-errors";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthContext } from "../../../App";
import AlreadyLoggedIn from "../../../components/already-logged-in";
import { FaAngleRight } from "react-icons/fa6";

export default function UserCreate() {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const [passVisible, setPassVisible] = useState<boolean>(false);
  const [passConfVisible, setPassConfVisible] = useState<boolean>(false);

  type UserForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  };

  const [resErrors, setResErrors] = useState<Errors[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>();

  const onSubmit: SubmitHandler<UserForm> = async (formData: UserForm) => {
    const response = await fetch(`${BASEURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ user: formData }),
    });

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      setResErrors([...resErrors, (await response.json())?.errors]);
    } else {
      setAuth(true);
      navigate("/dashboard");
    }
  };

  return (
    <>
      {auth === false ? (
        <div className="lg:w-1/2 mx-auto bg-white py-8 lg:px-16 px-4  mt-16 rounded-md text-gray-800">
          <div className="mt-2">
            <h1 className="lg:text-3xl text-2xl font-semibold">
              新規ユーザー登録
            </h1>

            <div className="w-full mt-6">
              {resErrors[0] && (
                <RenderErrors errors={resErrors[resErrors.length - 1]} />
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <div className="grid grid-cols-6 lg:gap-8 gap-1">
                    <div className="col-span-2 h-full flex items-center lg:text-xl">
                      <label htmlFor="name">ハンドルネーム</label>
                    </div>
                    <div className="col-span-4 p-2 h-full flex flex-col items-center ">
                      <input
                        type="text"
                        autoComplete="name"
                        className={`border border-black rounded-sm h-8 w-full p-2 ${errors.email ? "bg-red-200" : ""}`}
                        {...register("name", {
                          required: "必須です",
                        })}
                      />
                    </div>
                  </div>
                  {errors.name && (
                    <div className="text-red-500 w-full text-sm text-end">
                      {errors.name.message}
                    </div>
                  )}
                </div>

                <div>
                  <div className="grid grid-cols-6 lg:gap-8 gap-1">
                    <div className="col-span-2 h-full flex items-center lg:text-xl">
                      <label htmlFor="name">Email</label>
                    </div>
                    <div className="col-span-4 p-2 h-full flex flex-col items-center ">
                      <input
                        type="email"
                        autoComplete="email"
                        className={`border border-black rounded-sm h-8 w-full p-2 ${errors.email ? "bg-red-200" : ""}`}
                        {...register("email", {
                          required: "必須です",
                          pattern: {
                            value: /[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "不正なパターンです",
                          },
                        })}
                      />
                    </div>
                  </div>

                  {errors.email && (
                    <div className="text-red-500 w-full text-sm text-end">
                      {errors.email.message}
                    </div>
                  )}
                </div>

                <div>
                  <div className="grid grid-cols-6 lg:gap-8 gap-1">
                    <div className="col-span-2 h-full flex items-center lg:text-xl text-gray-800">
                      <label htmlFor="name">パスワード</label>
                    </div>
                    <div className="col-span-4 p-2 h-full flex flex-col items-center">
                      <input
                        type={passVisible ? "text" : "password"}
                        autoComplete="password"
                        className={`border border-black rounded-sm h-8 w-full p-2 ${errors.password ? "bg-red-200" : ""}`}
                        {...register("password", { required: "必須です" })}
                      />
                      {errors.password && (
                        <div className="text-red-500 w-full text-sm text-end">
                          {errors.password.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-end">
                    <button
                      type="button"
                      className="bg-gray-300 text-sm py-1 px-3 rounded-full"
                      onClick={() => setPassVisible(!passVisible)}
                    >
                      パスワードを{passVisible && "非"}表示
                    </button>
                  </div>
                </div>

                <div>
                  <div className="grid grid-cols-6 lg:gap-8 gap-1">
                    <div className="col-span-2 h-full flex items-center lg:text-xl text-gray-800">
                      <label htmlFor="name">パスワード（確認）</label>
                    </div>
                    <div className="col-span-4 p-2 h-full flex flex-col items-center">
                      <input
                        type={passConfVisible ? "text" : "password"}
                        autoComplete="password-confirmation"
                        className={`border border-black rounded-sm h-8 w-full p-2 ${errors.password ? "bg-red-200" : ""}`}
                        {...register("password_confirmation", {
                          required: "必須です",
                        })}
                      />
                      {errors.password_confirmation && (
                        <div className="text-red-500 w-full text-sm text-end">
                          {errors.password_confirmation.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-end">
                    <button
                      type="button"
                      className="bg-gray-300 text-sm py-1 px-3 rounded-full"
                      onClick={() => setPassConfVisible(!passConfVisible)}
                    >
                      パスワードを{passConfVisible && "非"}表示
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex lg:gap-4 gap-2">
                  <div>
                    <input
                      type="submit"
                      value="確認メールを送信する"
                      className="btn btn-main"
                    />
                  </div>
                </div>
              </form>

              <div className="mt-6">
                <p className="text-lg text-gray-800">
                  <Link
                    to="/auth/login"
                    className="text-blue-500 hover:text-blue-300 underline flex items-center"
                  >
                    <span>ログインはこちら</span>
                    <FaAngleRight size={16} />
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <AlreadyLoggedIn />
      )}
    </>
  );
}
