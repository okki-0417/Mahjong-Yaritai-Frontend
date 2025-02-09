import { SubmitHandler, useForm } from "react-hook-form"
import { BASEURL } from "../../ApiConfig";
import { useNavigate } from "react-router";

type AuthorizationSessionForm = {
  email: string;
}

export default function AuthorizationSession() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorizationSessionForm>()

  const onSubmit: SubmitHandler<AuthorizationSessionForm> = async (formData: AuthorizationSessionForm) => {
    try {
      const response = await fetch(`${BASEURL}/authorization_session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      })

      if(!response.ok) {throw new Error("Error fetching authorization session") }

      navigate("/authorization");
    }
    catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="lg:w-1/2 mx-auto bg-white py-8 lg:px-16 px-4  mt-16 rounded-md text-gray-700">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-2xl font-bold">メールアドレス認証する</h1>
        <fieldset>
          <div className="mt-4">
            <label htmlFor="email" className="label">
              Email
            </label>
            {errors.email && <p className="input-error">{errors.email.message}</p>}
            <input
              type="email"
              placeholder="test@mahjong-yaritai.com"
              autoComplete="email"
              className="input mt-1"
              required={true}
              {...register("email", {
                required: "メールアドレスを入力してください"
              })}
            />
          </div>
        </fieldset>

        <input type="submit" value="確認メールを送信する" className="btn btn-main mt-6" />
      </form>
    </div>
  )
}
