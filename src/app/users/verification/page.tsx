import { SubmitHandler, useForm } from "react-hook-form";
import { BASEURL } from "../../../ApiConfig";
import { useNavigate } from "react-router";

export default function UserVerification() {
  type UserVerificationForm = {
    email: string;
  };

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserVerificationForm>();

  const onSubmit: SubmitHandler<UserVerificationForm> = async (
    formData: UserVerificationForm,
  ) => {
    const response = await fetch(`${BASEURL}/users/verification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ user_verification: formData }),
    });

    if (!response.ok) {
      throw new Error("Error occurred.");
    }

    navigate("/users/verification/token");
  };

  return (
    <div className="lg:w-1/2 mx-auto bg-white py-8 lg:px-16 px-4  mt-16 rounded-md text-gray-800">
      <div className="mt-2">
        <h1 className="lg:text-3xl text-2xl font-semibold">新規ユーザー登録</h1>

        <div className="w-full mt-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-6 lg:gap-8 gap-1">
              <div className="col-span-2 h-full flex items-center lg:text-xl">
                <label htmlFor="email">Email</label>
              </div>
              <div className="col-span-4 p-2 h-full flex flex-col items-center ">
                <input
                  type="email"
                  autoComplete="email"
                  className={`border border-black rounded-sm h-8 w-full p-2 ${errors.email ? "bg-red-200" : ""}`}
                  {...register("email", { required: "必須です" })}
                />
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
        </div>
      </div>
    </div>
  );
}
