'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ListModal from '@/ui/ListModal';
import { useState } from 'react';
import ImageWithFallback from '@/ui/ImageWithFallback';

export type IListCard = {
  name: string;
  description: string;
  coverPictureUrl: string;
  totalFollowers: number;
  totalMembers: number;
  listId: string;
  ownerId: string;
  ownerHandle: string;
  editable?: boolean;
};

export default function ListCard({
  name: initialName,
  description: initialDescription,
  coverPictureUrl: initialCoverPictureUrl,
  ownerHandle,
  totalFollowers,
  totalMembers: initialTotalMembers,
  listId,
  ownerId,
  editable = false,
}: IListCard) {
  const router = useRouter();

  const [showListModal, setShowListModal] = useState(false);

  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [coverPictureUrl, setCoverPictureUrl] = useState(
    initialCoverPictureUrl,
  );
  const [totalMembers, setTotalMembers] = useState(initialTotalMembers);

  const onUpdate = (card: Partial<IListCard>) => {
    if (card.name !== undefined) {
      setName(card.name);
    }
    if (card.description !== undefined) {
      setDescription(card.description);
    }
    if (card.coverPictureUrl !== undefined) {
      setCoverPictureUrl(card.coverPictureUrl);
    }
    if (card.totalMembers !== undefined) {
      setTotalMembers(card.totalMembers);
    }
  };

  return (
    <Link href={`/lists/${listId}`}>
      <div className="flex cursor-pointer flex-col rounded-xl bg-white shadow-lg hover:shadow-xl">
        {/* Cover Picture */}
        <div>
          <ImageWithFallback
            fallbackImage="/fallback.png"
            src={coverPictureUrl}
            height={450}
            width={800}
            className="aspect-video rounded-t-xl object-cover object-center"
            alt="Cover Picture"
          />
        </div>

        {/* Body */}
        <div
          className="flex w-full grow flex-col gap-3 px-4 pb-4"
          style={{ wordBreak: 'break-word' }}
        >
          {/* Name + Handle */}
          <div className="mt-2 w-full">
            <div className="flex justify-center overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold text-black sm:text-xl xl:text-lg">
              {name}
            </div>
            <div className="flex w-full justify-center gap-1 text-xs">
              by
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  window.open(`https://lenster.xyz/u/${ownerHandle}`, '_blank');
                }}
              >
                <span className="cursor-pointer font-bold hover:underline">
                  @{ownerHandle}
                </span>
              </div>
            </div>
          </div>

          {/* Followers + Members */}
          <div className="flex justify-center gap-4 text-xs">
            <span>
              <span className="flex gap-1">
                <span className="font-bold">{totalMembers}</span>
                <span>{totalMembers === 1 ? 'member' : 'members'}</span>
              </span>
            </span>
            {/* <span>
              <span className="flex gap-1">
                <span className="font-bold">{totalFollowers}</span>
                <span>{totalFollowers === 1 ? 'follower' : 'followers'}</span>
              </span>
            </span> */}
          </div>

          {/* Description */}
          <div className="grow text-center text-sm">
            <div className="overflow-hidden" style={{ maxHeight: '60px' }}>
              {description}
            </div>
          </div>

          {/* Update List - Follow */}
          {editable ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setShowListModal(true);
              }}
              className="mt-2 mb-1 cursor-pointer rounded-2xl bg-sky-600 px-4 py-2 text-white shadow-md hover:bg-sky-700"
            >
              EDIT LIST
            </button>
          ) : (
            ''
            // <button
            //   onClick={(e) => e.stopPropagation()}
            //   className="mt-2 mb-1 cursor-pointer rounded-2xl bg-lens-lime px-4 py-2 text-black shadow-md hover:bg-lens-lime-hover"
            // >
            //   FOLLOW
            // </button>
          )}
        </div>
      </div>
      {showListModal && (
        <ListModal
          name={name}
          description={description}
          coverPictureUrl={coverPictureUrl}
          listId={listId}
          close={() => {
            setShowListModal(false);
          }}
          onUpdate={onUpdate}
        ></ListModal>
      )}
    </Link>
  );
}
