import { SubmitHandler, useForm } from "react-hook-form"
import { BASEURL } from "../../api-config";
import { useNavigate } from "react-router";

type AuthorizationForm = {
  token: string;
}

export default function Authorization() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorizationForm>()

  const onSubmit: SubmitHandler<AuthorizationForm> = async (formData) => {
    try {
      const response = await fetch(`${BASEURL}/authorization`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      })

      if(!response.ok) {throw new Error("Error fetching authorization session") }

      navigate("/users/new");
    }
    catch (error) {
      console.error(error)
    }
  }

  return(
    <div className="lg:w-1/2 mx-auto bg-white py-8 lg:px-16 px-4  mt-16 rounded-md text-gray-700">
      <h1 className="text-2xl font-bold">認証メールを送信しました。</h1>
      <p className="mt-2">メール内の「認証コードを入力してください」</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <div className="mt-4">
            {errors.token && <p className="input-error">{errors.token.message}</p>}
            <input
              type="number"
              autoComplete="number"
              className="input mt-1 font-sans text-lg tracking-widest"
              required={true}
              {...register("token", {
                required: "メールアドレスを入力してください",
                minLength: {
                  value: 6,
                  message: "認証コードは6桁です",
                },
                maxLength: {
                  value: 6,
                  message: "認証コードは6桁です",
                }
              })}
            />
          </div>
        </fieldset>

        <input type="submit" value="認証を完了する" className="btn btn-main mt-6" />
      </form>
    </div>
  )
}
