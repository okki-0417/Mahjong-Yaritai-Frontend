import { useRef, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { ProfileSetting } from "./ProfileEditForm";

export default function ProfileImageForm({
  register,
  avatar,
}: {
  register: UseFormRegister<ProfileSetting>;
  avatar?: File;
}) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result as string;
        setImageSrc(base64);
        localStorage.setItem("uploadedImage", base64);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-full aspect-square w-52 overflow-hidden border border-white">
          {imageSrc ? (
            <img src={imageSrc} className="w-full h-full object-cover" />
          ) : (
            <img src="/no-image.webp" className="w-full h-full object-cover" />
          )}
        </div>

        <input
          hidden
          type="file"
          {...register("avatar")}
          ref={fileRef}
          accept="image/*"
          onChange={handleFileChange}
        />

        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="btn btn-base btn-sm"
        >
          画像を選択する
        </button>
      </div>
    </div>
  );
}
