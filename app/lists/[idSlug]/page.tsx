import Image from 'next/image';

export default function Page() {
  return (
    <div className="grid grid-cols-3 gap-10 text-sm">
      <div className="col-span-2">
        {/* Card */}
        <div className="flex flex-col rounded-xl bg-white">
          {/* Post */}
          <div className="flex flex-col gap-5 border-b border-solid border-zinc-100 p-6">
            {/* Header */}
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
              {/* Body */}
              <div className="flex flex-col justify-center">
                <div className="font-bold">Juancito</div>
                <div className="text-xs text-zinc-400">4 hours ago</div>
              </div>
            </div>
            <div className="leading-6">
              Today I'm releasing Lenscover. Discover people on Lens, create
              lists and customize your feed!
            </div>
          </div>

          {/* Post */}
          <div className="flex flex-col gap-5 border-b border-solid border-zinc-100 p-6">
            {/* Header */}
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
              {/* Body */}
              <div className="flex flex-col justify-center">
                <div className="font-bold">Juancito</div>
                <div className="text-xs text-zinc-400">4 hours ago</div>
              </div>
            </div>
            <div className="leading-6">
              Any recommendation on some analytic tool to track events that
              makes it easy to share as a public web page?
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <div className="rounded-xl bg-white p-5">sidebar</div>
      </div>
    </div>
  );
}
