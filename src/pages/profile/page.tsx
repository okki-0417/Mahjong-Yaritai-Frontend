import { useEffect, useState } from "react";
import { pageApiClient } from "../../ApiConfig";
import { Link } from "react-router";
import { MdOutlineEdit } from "react-icons/md";

type Profile = {
  name: string;
  avatar_url: string;
};

export default function Profile() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await pageApiClient.get("/profile");
      setProfile(response.data.profile);
    };

    fetchProfile();
  }, []);

  return (
    <div className="max-w-xl sm:mx-auto mx-4 mt-36">
      <div className="text-right flex justify-end">
        <Link to="/profile/edit">
          <MdOutlineEdit size={30} />
        </Link>
      </div>

      <div className="flex flex-col items-center gap-5 mt-4">
        <div className="rounded-full aspect-square w-52 overflow-hidden border border-white">
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              className="w-full h-full object-cover"
            />
          ) : (
            <img src="/no-image.webp" className="w-full h-full object-cover" />
          )}
        </div>

        <span className="text-3xl mt-4">{profile?.name}</span>
      </div>
    </div>
  );
}
