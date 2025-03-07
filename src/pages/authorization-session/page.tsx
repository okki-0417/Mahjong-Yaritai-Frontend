import { SubmitHandler, useForm } from "react-hook-form";
import { BASEURL } from "../../ApiConfig";
import { useNavigate } from "react-router";

type AuthorizationSessionForm = {
  email: string;
};

export default function AuthorizationSession() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorizationSessionForm>();

  const onSubmit: SubmitHandler<AuthorizationSessionForm> = async (
    formData: AuthorizationSessionForm
  ) => {
    try {
      const response = await fetch(`${BASEURL}/authorization_session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error fetching authorization session");
      }

      navigate("/authorization");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-screen-sm mx-auto mt-40">
      <h1 className="lg:text-4xl text-2xl font-semibold mb-3">ユーザー登録</h1>
      <hr />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <fieldset>
          <div className="mt-4">
            <div className="label">
              <label htmlFor="email">Email</label>
            </div>

            {errors.email && (
              <p className="input-error">{errors.email.message}</p>
            )}
            <div className="mt-1">
              <input
                type="email"
                placeholder="test@mahjong-yaritai.com"
                autoComplete="email"
                className="input"
                required={true}
                {...register("email", {
                  required: "メールアドレスを入力してください",
                })}
              />
            </div>
          </div>
        </fieldset>

        <input
          type="submit"
          value="確認メールを送信する"
          className="btn btn-main mt-6"
        />
      </form>
    </div>
  );
}
