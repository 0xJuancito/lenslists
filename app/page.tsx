import Image from 'next/image';

const card = (
  title = 'Lens Protocol',
  description = 'A permissionless, composable, & decentralized social graph that makes building a Web3 social platform easy.',
) => (
  <div className="flex flex-col items-center rounded-xl bg-white shadow-lg">
    {/* Cover Picture */}
    <div>
      <Image
        unoptimized
        src="https://lens.infura-ipfs.io/ipfs/bafkreifcrzlxswmv2isffdfnsl2pjd2hph5wem5c4vxlypugtrzf3gagrq"
        height={300}
        width={900}
        className="h-32 rounded-t-xl object-cover object-center"
        alt="Cover Picture"
      />
    </div>
    {/* Profile Picture */}
    <div className="absolute">
      <Image
        unoptimized
        src="https://lens.infura-ipfs.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX"
        height={150}
        width={150}
        alt="Profile Picture"
        className="relative top-12 rounded-full border-4 border-zinc-50"
      />
    </div>
    {/* Body */}
    <div
      className="mt-16 flex w-full grow flex-col items-center gap-3 p-4 text-center"
      style={{ wordBreak: 'break-word' }}
    >
      {/* Title */}
      <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold text-black">
        {title}
      </div>
      {/* Followers / Members */}
      <div className="flex gap-4 text-xs">
        <span className="flex gap-1">
          <span className="font-bold">41086</span>
          <span>followers</span>
        </span>
        <span className="flex gap-1">
          <span className="font-bold">22</span>
          <span>members</span>
        </span>
      </div>
      {/* Description */}
      <div
        className="flex grow items-center overflow-hidden text-center text-sm"
        style={{ maxHeight: '60px' }}
      >
        {description}
      </div>
      {/* Button */}
      <div>
        <button className="mt-2 mb-1 cursor-pointer rounded-2xl bg-sky-700 px-3 py-2 text-white shadow-md hover:bg-sky-800">
          EXPLORE
        </button>
      </div>
    </div>
  </div>
);

export default function Page() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {card()}
      {card('Lens Protocol Developers')}
      {card('LENS PROTOCOL', 'Creator of @lenster.lens 🌸')}
      {card()}
      {card()}
      {card()}
      {card()}
      {card()}
      {card()}
    </div>
  );
}
