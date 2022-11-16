import Button from '@/ui/Button';
import Image from 'next/image';

const posts = [1, 2, 3, 4, 5, 6, 7, 8];
const members = [1, 2, 3, 4];

export default function Page() {
  const getPost = () => {
    return (
      <div className="flex flex-col gap-5 border-b border-solid border-zinc-100 p-6">
        {/* Header */}
        <div className="flex justify-between">
          {/* Header Left */}
          <div className="flex gap-3">
            <div>
              <Image
                className="rounded-full"
                src="/profile.jpeg"
                unoptimized
                alt="Profile"
                width={40}
                height={40}
              />
            </div>
            {/* Name + Time */}
            <div className="flex flex-col justify-center">
              <div className="font-bold">Juancito</div>
              <div className="text-xs text-zinc-400">4 hours ago</div>
            </div>
          </div>
          {/* Header Right */}
          <div className="flex items-center">
            <Button>Follow</Button>
          </div>
        </div>
        {/* Body */}
        <div className="leading-6">
          Today I'm releasing Lens Lists. Discover people on Lens, create lists
          and customize your feed!
        </div>
      </div>
    );
  };

  const getMember = () => {
    return (
      <div className="flex justify-between px-5 py-3">
        {/* Header Left */}
        <div className="flex gap-3">
          <div>
            <Image
              className="rounded-full"
              src="/profile.jpeg"
              unoptimized
              alt="Profile"
              width={40}
              height={40}
            />
          </div>
          {/* Name */}
          <div className="flex flex-col justify-center">
            <div className="font-bold">Juancito</div>
            <div className="text-zinc-500">@juancito.lens</div>
          </div>
        </div>
        {/* Header Right */}
        <div className="flex items-center">
          <Button>Follow</Button>
        </div>
      </div>
    );
  };

  const getMembersCard = () => {
    return (
      <div>
        <div className="mb-3 ml-5 font-bold text-zinc-400">MEMBERS</div>
        <div className="flex flex-col rounded-xl bg-white pt-2">
          {members.map(() => getMember())}
          <div className="cursor-pointer p-5 text-blue-500 hover:rounded-b-xl hover:bg-zinc-50">
            Show more
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-12 gap-10 text-sm">
      <div className="col-span-7">
        {/* Card */}
        <div className="flex flex-col rounded-xl bg-white">
          {/* Post */}
          {posts.map(() => getPost())}
        </div>
      </div>
      <div className="col-span-5">{getMembersCard()}</div>
    </div>
  );
}
