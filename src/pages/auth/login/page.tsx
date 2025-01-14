import { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import RenderErrors, { Errors } from "../../../components/render-errors";
import { AuthContext } from "../../../App";
import { BASEURL } from "../../../api-config";

export type Session = {
  id: number;
  email: string;
};

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const [passVisible, setPassVisible] = useState<boolean>(false);

  useEffect(() => {
    if(auth === true) {
      navigate("/dashboard");
    }
    console.log(`Login: ${auth}`)
  }, [auth]);

  const [resErrors, setResErrors] = useState<Errors[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = async (formData: LoginForm) => {
    const response = await fetch(`${BASEURL}/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      setResErrors([...resErrors, (await response.json())?.errors]);
    } else {

      setAuth(true);
      navigate("/dashboard");
    }
  };

  return (
    <>
      { auth === false &&
        <div className="lg:w-1/2 mx-auto bg-white py-8 lg:px-16 px-4  mt-16 rounded-md text-gray-800">
          <div>
            <h1 className="lg:text-3xl text-2xl text-gray-800 font-semibold">ログインする</h1>
            <div className="w-full mt-4">
              {resErrors[0] && (
                <RenderErrors errors={resErrors[resErrors.length - 1]} />
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-6 lg:gap-8 gap-1">
                  <div className="col-span-2 flex items-center lg:text-2xl text-gray-800">
                    <label htmlFor="name">Email</label>
                  </div>
                  <div className="col-span-4 p-2">
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
                    {errors.email && (
                      <span className="text-red-500">{errors.email.message}</span>
                    )}
                  </div>
                </div>

                <div>
                  <div className="grid grid-cols-6 lg:gap-8 gap-1">
                    <div className="col-span-2 flex items-center lg:text-2xl text-gray-800">
                      <label htmlFor="name">パスワード</label>
                    </div>
                    <div className="col-span-4 p-2">
                      <input
                        type={passVisible ? "text" : "password"}
                        autoComplete="password"
                        className={`border border-black rounded-sm h-8 w-full p-2 ${errors.password ? "bg-red-200" : ""}`}
                        {...register("password", {required: "必須です"})}
                      />
                      {errors.password && (
                        <span className="text-red-500">{errors.password.message}</span>
                      )}
                    </div>
                  </div>

                  <div className="text-end text-gray-800">
                    <button type="button" className="bg-gray-300 text-sm py-1 px-3 rounded-full" onClick={()=>setPassVisible(!passVisible)}>
                      パスワードを{passVisible && "非"}表示
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex lg:gap-4 gap-2">
                  <div>
                    <input
                      type="submit"
                      value="ログインする"
                      className="btn btn-main"
                    />
                  </div>
                </div>
              </form>
              <div className="mt-6">
                <p className="text-lg">
                <Link to="/users/new" className="text-blue-500 hover:text-blue-300 underline">新規会員登録はこちら</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}
