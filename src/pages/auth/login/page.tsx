import { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import ErrorMessage, {
  ErrorMessageType,
} from "../../../components/ErrorMessage";
import { BASEURL } from "../../../ApiConfig";
import { AuthStateContext } from "../../../contexts/AuthStateContextProvider";

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
  const { auth, setAuth } = useContext(AuthStateContext);
  const [passVisible, setPassVisible] = useState<boolean>(false);

  useEffect(() => {
    if (auth === true) {
      navigate("/dashboard");
    }
    console.log(`Login: ${auth}`);
  }, [auth]);

  const [resErrors, setResErrors] = useState<ErrorMessageType[]>([]);
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
      {auth === false && (
        <div className="max-w-screen-sm mx-auto mt-40 px-4">
          <div>
            <div className="w-full mt-8">
              <h1 className="lg:text-4xl text-2xl font-semibold mb-3">
                ログイン
              </h1>
              <hr />

              <form onSubmit={handleSubmit(onSubmit)}>
                {resErrors[0] && (
                  <ErrorMessage
                    message={resErrors[resErrors.length - 1]?.message}
                  />
                )}

                <fieldset>
                  <div className="mt-8">
                    <div className="label">
                      <label htmlFor="name">Email</label>
                    </div>
                    <div className="mt-1">
                      <input
                        type="email"
                        autoComplete="email"
                        className={`input ${errors.email ? "bg-red-200" : ""}`}
                        {...register("email", {
                          required: "必須です",
                          pattern: {
                            value: /[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "不正なパターンです",
                          },
                        })}
                      />
                    </div>
                    {errors.email && (
                      <span className="text-red-500">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <div className="mt-8">
                    <div>
                      <div className="label">
                        <label htmlFor="name">パスワード</label>
                      </div>
                      <div>
                        <input
                          type={passVisible ? "text" : "password"}
                          autoComplete="password"
                          className={`input ${errors.password ? "bg-red-200" : ""}`}
                          {...register("password", { required: "必須です" })}
                        />
                        {errors.password && (
                          <span className="text-red-500">
                            {errors.password.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-end">
                      <button
                        type="button"
                        className="bg-white text-black text-sm mt-2 py-1 px-3 rounded-full"
                        onClick={() => setPassVisible(!passVisible)}
                      >
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
                </fieldset>
              </form>
              <div className="mt-6">
                <p className="text-lg">
                  <Link
                    to="/users/new"
                    className="text-blue-200 hover:text-blue-50 underline"
                  >
                    新規会員登録はこちら
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
