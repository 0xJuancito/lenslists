'use client';

import { useScrollBlock } from '@/lib/useScrollBlock';
import { useState } from 'react';

export default function ListModal() {
  const [showModal, setShowModal] = useState(false);

  const [isNewList, setIsNewList] = useState(true);
  const [isManagingMembers, setIsManagingMembers] = useState(false);

  const [isMembers, setIsMembers] = useState(false);
  const [isSuggested, setIsSuggested] = useState(false);

  const [blockScroll, allowScroll] = useScrollBlock();

  const NewList = (
    <div className="relative flex flex-auto flex-col gap-2 p-6">
      <div className="mb-3 flex flex-col gap-2 pt-0">
        <label className="text-sm font-bold">Name</label>
        <input
          type="text"
          maxLength={25}
          placeholder="My Awesome List"
          className="relative w-full rounded border bg-white px-3 py-3 text-sm placeholder-zinc-400 shadow outline-none focus:outline-none focus:ring"
        />
      </div>
      <div className="mb-3 flex flex-col gap-2 pt-0">
        <label className="text-sm font-bold">Description</label>
        <textarea
          rows={3}
          maxLength={100}
          placeholder="Top 100 influencers on Lens Protocol"
          className="relative w-full resize-none rounded border bg-white px-3 py-3 text-sm placeholder-zinc-400 shadow outline-none focus:outline-none focus:ring"
        />
      </div>
      <div className="mb-3 flex flex-col gap-2 pt-0">
        <label className="text-sm font-bold">Picture URL</label>
        <input
          type="text"
          maxLength={255}
          placeholder="https://lens.infura-ipfs.io/ipfs/QmZsWaqhhinnhaMUi2vNyuZ6qJJgB"
          className="relative w-full rounded border bg-white px-3 py-3 text-sm placeholder-zinc-400 shadow outline-none focus:outline-none focus:ring"
        />
      </div>
      <div className="mb-3 flex flex-col gap-2 pt-0">
        <label className="text-sm font-bold">Cover Picture URL</label>
        <input
          type="text"
          maxLength={255}
          placeholder="https://lens.infura-ipfs.io/ipfs/QmXsWsqhripefaMUi2vNhrhrApoSfeL"
          className="relative w-full rounded border bg-white px-3 py-3 text-sm placeholder-zinc-400 shadow outline-none focus:outline-none focus:ring"
        />
      </div>
    </div>
  );

  const Members = <div>Members</div>;

  const Suggested = (
    <div className="flex flex-col gap-4 px-6 pb-6 pt-2">
      <div className="relative">
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
      <div>User list</div>
    </div>
  );

  const ManagingMembers = (
    <div>
      {/* Tabs */}
      <div className="flex border-b border-solid border-slate-200">
        <div
          className="flex w-1/2 cursor-pointer justify-center hover:bg-zinc-100"
          onClick={() => {
            setIsMembers(true);
            setIsSuggested(false);
          }}
        >
          <span
            className={`${
              isMembers ? 'border-b-4 font-bold text-black' : ''
            } border-b-sky-500 py-3`}
          >
            Members (0)
          </span>
        </div>
        <div
          className="flex w-1/2 cursor-pointer justify-center hover:bg-zinc-100"
          onClick={() => {
            setIsMembers(false);
            setIsSuggested(true);
          }}
        >
          <span
            className={`${
              isSuggested ? 'border-b-4 font-bold text-black' : ''
            } border-b-sky-500 py-3`}
          >
            Suggested
          </span>
        </div>
      </div>
    </div>
  );

  const createNewList = () => {
    setIsNewList(false);
    setIsSuggested(true);
    setIsManagingMembers(true);
  };

  const hideModal = () => {
    allowScroll();

    setShowModal(false);

    setIsNewList(true);
    setIsManagingMembers(false);

    setIsMembers(false);
    setIsSuggested(false);
  };

  const callShowModal = () => {
    blockScroll();
    setShowModal(true);
  };

  return (
    <>
      <button
        className="mr-1 mb-1 rounded bg-pink-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-pink-600"
        type="button"
        onClick={() => callShowModal()}
      >
        Open regular modal
      </button>
      {showModal ? (
        <>
          <div
            className="fixed inset-0 z-50 flex h-screen items-center justify-center overflow-hidden overflow-x-hidden outline-none focus:outline-none sm:h-auto sm:overflow-y-auto"
            onClick={() => hideModal()}
          >
            <div
              className="relative my-6 mx-auto w-auto max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/*content*/}
              <div className="relative flex h-screen w-screen flex-col rounded-none border-0 bg-white shadow-lg outline-none focus:outline-none sm:h-[650px] sm:max-w-xl sm:rounded-lg">
                {/*header*/}
                <div className="flex items-center justify-between rounded-t border-b border-solid border-slate-200 p-5">
                  <div className="flex items-center gap-4">
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
                    <h3 className="text-2xl font-semibold text-black">
                      {isNewList ? 'Create a new List' : ''}
                      {isManagingMembers ? 'Add to your List' : ''}
                    </h3>
                  </div>
                  {isNewList && (
                    <button
                      className="cursor-pointer rounded-2xl bg-sky-700 px-4 py-2 text-white shadow-md hover:bg-sky-800"
                      onClick={() => createNewList()}
                    >
                      NEXT
                    </button>
                  )}
                  {isManagingMembers && (
                    <button
                      className="cursor-pointer rounded-2xl bg-sky-700 px-4 py-2 text-white shadow-md hover:bg-sky-800"
                      onClick={() => {
                        hideModal();
                      }}
                    >
                      DONE
                    </button>
                  )}
                </div>
                {/*body*/}
                {isNewList ? NewList : ''}
                {isManagingMembers ? ManagingMembers : ''}
                <div className="overflow-y-auto">
                  {isMembers ? Members : ''}
                  {isSuggested ? Suggested : ''}
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
}