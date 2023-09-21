import { CalendarDays } from "lucide-react";
import dayjs from "dayjs";

type ProfileInfoProps = {
  name: string | undefined;
  username: string | undefined;
  bio?: string | undefined | null;
  createdAt: Date | undefined;
  followers?: string[];
  following?: string[];
};

const ProfileInfo = ({
  name,
  username,
  bio,
  createdAt,
  followers,
  following,
}: ProfileInfoProps) => {
  const formmatedDate = dayjs(createdAt).format("MMMM YYYY");

  return (
    <div className="mt-10">
      <div className="flex flex-col">
        <p className="text-xl font-semibold">{name}</p>
        <p className="text-neutral-600">@{username}</p>
      </div>

      {bio && (
        <div className="mt-4">
          <p className="text-sm">{bio}</p>
        </div>
      )}

      <div className="flex flex-col mt-4">
        <div className="flex items-center space-x-1">
          <CalendarDays className="h-4 w-4 text-neutral-600" />
          <p className="text-neutral-600 text-sm">Joined {formmatedDate}</p>
        </div>
      </div>

      <div className="flex space-x-6 mt-4">
        <div className="flex items-center space-x-1">
          <p className="text-sm font-semibold">{following?.length}</p>
          <span className="text-sm text-neutral-600">Following</span>
        </div>
        <div className="flex items-center space-x-1">
          <p className="text-sm font-semibold">{followers?.length}</p>
          <span className="text-sm text-neutral-600">Followers</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
