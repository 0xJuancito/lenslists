'use client';

import { getAuthenticationToken } from '@/lib/apollo-client';
import { useScrollBlock } from '@/lib/useScrollBlock';
import DeleteListModal from '@/ui/DeleteListModal';
import UserListItem from '@/ui/UserListItem';
import { ChangeEvent, useEffect, useState } from 'react';
import { IListCard } from './ListCard';

const suggestedUsers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export type IListModal = {
  name?: string;
  description?: string;
  coverPictureUrl?: string;
  close: () => void;
  onUpdate?: (card: Partial<IListCard>) => void;
  listId?: string;
};

export default function ListModal({
  close,
  listId,
  name: initialName,
  description: initialDescription,
  coverPictureUrl: initialCoverPictureUrl,
  onUpdate,
}: IListModal) {
  const [isManagingMembers, setIsManagingMembers] = useState(false);
  const [isSuggested, setIsSuggested] = useState(false);
  const [showDeleteListModal, setShowDeleteListModal] = useState(false);

  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [coverPictureUrl, setCoverPictureUrl] = useState(
    initialCoverPictureUrl,
  );

  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    blockScroll();
  });

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleCoverPictureUrlChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setCoverPictureUrl(event.target.value);
  };

  const EditList = (
    <div className="relative flex flex-auto flex-col justify-between gap-2 py-6">
      <div className="px-6">
        <div className="mb-3 flex flex-col gap-2 pt-0">
          <label className="text-sm font-bold">Name</label>
          <input
            value={name}
            onChange={handleNameChange}
            type="text"
            maxLength={25}
            placeholder="My Awesome List"
            className="relative w-full rounded border bg-white px-3 py-3 text-sm placeholder-zinc-400 shadow outline-none focus:outline-none focus:ring"
          />
        </div>
        <div className="mb-3 flex flex-col gap-2 pt-0">
          <label className="text-sm font-bold">Description</label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            rows={3}
            maxLength={100}
            placeholder="Top 100 influencers on Lens Protocol"
            className="relative w-full resize-none rounded border bg-white px-3 py-3 text-sm placeholder-zinc-400 shadow outline-none focus:outline-none focus:ring"
          />
        </div>
        <div className="mb-3 flex flex-col gap-2 pt-0">
          <label className="text-sm font-bold">Cover Picture URL</label>
          <input
            value={coverPictureUrl}
            onChange={handleCoverPictureUrlChange}
            type="text"
            maxLength={255}
            placeholder="https://lens.infura-ipfs.io/ipfs/QmXsWsqhripefaMUi2vNhrhrApoSfeL"
            className="relative w-full rounded border bg-white px-3 py-3 text-sm placeholder-zinc-400 shadow outline-none focus:outline-none focus:ring"
          />
        </div>
      </div>
      {/* Button Actions */}
      {listId ? (
        <div className="flex justify-around border-t border-t-slate-200 pt-6">
          <button
            className="w-28 cursor-pointer rounded-2xl bg-sky-600 px-4 py-2 text-white shadow-md hover:bg-sky-700 sm:w-44"
            onClick={() => openUpdateList()}
          >
            <span className="hidden sm:inline">{'Manage '}</span>Members
          </button>
          <button
            className="w-28 cursor-pointer rounded-2xl bg-red-600 px-4 py-2 text-white shadow-md hover:bg-red-700 sm:w-44"
            onClick={() => setShowDeleteListModal(true)}
          >
            Delete <span className="hidden sm:inline">{' List'}</span>
          </button>
          {showDeleteListModal ? (
            <DeleteListModal
              listId={listId}
              close={() => {
                setShowDeleteListModal(false);
              }}
            ></DeleteListModal>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );

  const Members = (
    <div>
      {suggestedUsers.map((user, key) => (
        <UserListItem
          key={key}
          pictureUrl="/profile.jpeg"
          name="juancito"
          handle="juancito.lens"
          isMember={true}
        ></UserListItem>
      ))}
    </div>
  );

  const Suggested = (
    <div className="flex flex-col gap-4 pb-6 pt-2">
      <div className="relative mx-6">
        <svg
          viewBox="0 0 25 25"
          aria-hidden="true"
          className="absolute left-4 top-4 h-4 w-4 fill-zinc-400"
        >
          <g>
            <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
          </g>
        </svg>
        <input
          type="text"
          maxLength={255}
          placeholder="Search People"
          className="w-full rounded-2xl border border-zinc-300 px-3 py-3 pl-9 text-sm placeholder-zinc-400 shadow outline-none focus:outline-none focus:ring"
        />
      </div>
      <div>
        {suggestedUsers.map((user, key) => (
          <UserListItem
            key={key}
            pictureUrl="/profile.jpeg"
            name="juancito"
            handle="juancito.lens"
            isMember={false}
          ></UserListItem>
        ))}
      </div>
    </div>
  );

  const ManagingMembers = (
    <div>
      {/* Tabs */}
      <div className="flex border-b border-solid border-slate-200">
        <div
          className="flex w-1/2 cursor-pointer justify-center hover:bg-zinc-100"
          onClick={() => {
            setIsSuggested(false);
          }}
        >
          <span
            className={`${
              isSuggested ? '' : 'border-b-4 font-bold text-black'
            } border-b-sky-400 py-3`}
          >
            Members
          </span>
        </div>
        <div
          className="flex w-1/2 cursor-pointer justify-center hover:bg-zinc-100"
          onClick={() => {
            setIsSuggested(true);
          }}
        >
          <span
            className={`${
              isSuggested ? 'border-b-4 font-bold text-black' : ''
            } border-b-sky-400 py-3`}
          >
            Suggested
          </span>
        </div>
      </div>
    </div>
  );

  const openCreateNewList = () => {
    setIsSuggested(true);
    setIsManagingMembers(true);
  };

  const openUpdateList = () => {
    setIsSuggested(false);
    setIsManagingMembers(true);
  };

  const hideModal = () => {
    allowScroll();

    setIsManagingMembers(false);

    setIsSuggested(true);

    close();
  };

  const updateList = () => {
    fetch(`/api/lists/${listId}`, {
      method: 'PUT',
      headers: {
        'x-access-token': getAuthenticationToken() || '',
      },
      body: JSON.stringify({ name, description, coverPictureUrl }),
    });

    if (onUpdate) {
      onUpdate({ name, description, coverPictureUrl });
    }
    hideModal();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden overflow-x-hidden outline-none focus:outline-none sm:overflow-y-auto"
        onClick={() => hideModal()}
      >
        <div
          className="relative my-6 mx-auto h-full w-auto max-w-2xl sm:h-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/*content*/}
          <div className="relative flex h-full w-screen flex-col rounded-none border-0 bg-white shadow-lg outline-none focus:outline-none sm:h-[650px] sm:max-w-xl sm:rounded-lg">
            {/*header*/}
            <div className="flex items-center justify-between rounded-t border-b border-solid border-slate-200 p-5">
              <div className="flex items-center gap-4">
                {listId && isManagingMembers ? (
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-9 w-9 cursor-pointer p-2 hover:rounded-full hover:bg-zinc-100"
                    onClick={() => setIsManagingMembers(false)}
                  >
                    <g>
                      <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
                    </g>
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-9 w-9 cursor-pointer p-2 hover:rounded-full hover:bg-zinc-100"
                    onClick={() => hideModal()}
                  >
                    <g>
                      <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                    </g>
                  </svg>
                )}
                {listId ? (
                  <h3 className="text-2xl font-semibold text-black">
                    {isManagingMembers ? 'Manage Members' : 'Edit List'}
                  </h3>
                ) : (
                  <h3 className="text-2xl font-semibold text-black">
                    {isManagingMembers
                      ? 'Add to your List'
                      : 'Create a new List'}
                  </h3>
                )}
              </div>
              {isManagingMembers || listId ? (
                <button
                  className="cursor-pointer rounded-2xl bg-sky-600 px-4 py-2 text-white shadow-md hover:bg-sky-700"
                  onClick={() => {
                    isManagingMembers ? hideModal() : updateList();
                  }}
                >
                  DONE
                </button>
              ) : (
                <button
                  className="cursor-pointer rounded-2xl bg-sky-600 px-4 py-2 text-white shadow-md hover:bg-sky-700"
                  onClick={() => openCreateNewList()}
                >
                  NEXT
                </button>
              )}
            </div>
            {/*body*/}
            {isManagingMembers ? ManagingMembers : EditList}
            {isManagingMembers ? (
              <div className="overflow-y-auto">
                {isSuggested ? Suggested : Members}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  );
}
