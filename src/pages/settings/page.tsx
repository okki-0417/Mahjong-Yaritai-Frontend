import { SubmitHandler, useForm } from "react-hook-form";
import DefaultContainer from "../../components/layout/DefaultContainer";

type ProfileSetting = {
  name: string;
  notification: boolean;
};

export default function Settings() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileSetting>();

  const onSubmit: SubmitHandler<ProfileSetting> = async (data) => {
    // submit to the server
  };

  return (
    <DefaultContainer heading="設定">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend className="text-3xl">ユーザー情報</legend>

          <div className="mt-1">
            <label htmlFor="name" className="label">
              名前
            </label>
            <input type="text" {...register("name")} className="input" />
          </div>
        </fieldset>

        <fieldset className="mt-8">
          <legend className="text-3xl">通知設定</legend>

          <div className="mt-1">
            <label
              htmlFor="notification"
              className="label flex gap-2 items-center"
            >
              <span>通知</span>
              <input
                type="checkbox"
                {...register("notification")}
                className="size-4"
              />
            </label>
          </div>
        </fieldset>
      </form>
    </DefaultContainer>
  );
}
