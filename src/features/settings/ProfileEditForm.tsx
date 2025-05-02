import { useContext, useEffect, useState } from "react";
import { ToastContext } from "../../contexts/ToastContextProvider";
import { SubmitHandler, useForm } from "react-hook-form";
import { BASEURL } from "../../ApiConfig";
import ProfileImageForm from "./ProfileImageForm";

export type ProfileSetting = {
  avatar: File;
  name: string;
};

export default function ProfileEditForm() {
  const { register, handleSubmit } = useForm<ProfileSetting>();
  const { setToast } = useContext(ToastContext);
  const [Profile, setProfile] = useState<ProfileSetting | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${BASEURL}/settings/profile`, {
          credentials: "include",
        });

        if (!response.ok) {
          setToast({ type: "error", message: response.statusText });
          return;
        }

        const data = await response.json();
        setProfile(data);
      } catch (e) {
        setToast({
          type: "error",
          message: "予期せぬサーバーエラーが発生しました。",
        });
      }
    };

    const getImageSrc = async () => {
      const imageBase64 = localStorage.getItem("uploadedImage");
      if (imageBase64) {
        // setImageSrc(imageBase64);
      }
    };

    getImageSrc();

    fetchProfile();
  }, []);

  const onSubmit: SubmitHandler<ProfileSetting> = async (formData) => {
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
        <legend className="text-3xl">ユーザー情報</legend>

        <div className="mt-8">
          <ProfileImageForm register={register} avatar={Profile?.avatar} />
        </div>

        <div>
          <label htmlFor="name" className="label">
            名前
          </label>
          <input
            type="text"
            {...register("name")}
            className="input inline-block"
            value={Profile?.name}
          />
        </div>
      </fieldset>

      <div className="mt-10 text-right">
        <input type="submit" className="btn btn-main" value="更新する" />
      </div>
    </form>
  );
}
