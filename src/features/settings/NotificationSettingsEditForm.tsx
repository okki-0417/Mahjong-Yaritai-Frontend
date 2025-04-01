import { useContext } from "react";
import { ToastContext } from "../../contexts/ToastContextProvider";
import { SubmitHandler, useForm } from "react-hook-form";
import { BASEURL } from "../../ApiConfig";

type NotificationSettings = {
  email: boolean;
  push: boolean;
};

export default function NotificationSettingsEditForm() {
  const { register, handleSubmit } = useForm<NotificationSettings>();
  const { setToast } = useContext(ToastContext);

  const onSubmit: SubmitHandler<NotificationSettings> = async (formData) => {
    try {
      const response = await fetch(`${BASEURL}/settings/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setToast({
          type: "error",
          message: response.statusText,
        });
      }
    } catch (e) {
      setToast({
        type: "error",
        message: "予期せぬエラーが発生しました。",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend className="text-3xl">通知設定</legend>

        <div className="mt-8 flex flex-col gap-4">
          <label htmlFor="email" className="text-xl flex items-center gap-3">
            <input type="checkbox" {...register("email")} className="size-5" />
            <span>Emailの送信</span>
          </label>

          <label htmlFor="push" className="text-xl flex items-center gap-3">
            <input type="checkbox" {...register("push")} className="size-5" />
            <span>プッシュ通知</span>
          </label>
        </div>
      </fieldset>

      <div className="mt-8 text-right">
        <input type="submit" value="更新する" className="btn btn-main" />
      </div>
    </form>
  );
}
