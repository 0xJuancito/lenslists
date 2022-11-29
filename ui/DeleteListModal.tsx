'use client';

import { getAuthenticationToken } from '@/lib/apollo-client';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { ProfileContext } from './LensAuthenticationProvider';
import LoadingSpinner from './LoadingSpinner';

export type IDeleteListModal = {
  close: () => void;
  listId: string;
};

export default function DeleteListModal({ close, listId }: IDeleteListModal) {
  const [deleting, setDeleting] = useState(false);
  const pathname = usePathname();
  const profile = useContext(ProfileContext);
  const router = useRouter();

  const onDeleteList = () => {
    if (deleting) {
      return;
    }

    setDeleting(true);

    fetch(`/api/lists/${listId}`, {
      method: 'DELETE',
      headers: {
        'x-access-token': getAuthenticationToken() || '',
      },
    })
      .then(async (response) => {
        if (response.status === 200) {
          redirectToMyLists();
        } else {
          const body = await response.json();
          const message =
            body?.details?.[0]?.message ||
            body?.message ||
            'Could not delete list.';
          toast(message, {});
          setDeleting(false);
        }
      })
      .catch((err) => {
        toast('Could not delete list.', {});
        setDeleting(false);
      });
  };

  const redirectToMyLists = () => {
    if (profile) {
      const newPathname = `/users/${profile.id}/lists`;
      if (pathname === newPathname) {
        location.reload();
      } else {
        router.push(newPathname);
      }
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden overflow-x-hidden outline-none focus:outline-none sm:overflow-y-auto"
        onClick={close}
      >
        <div
          className="relative my-6 mx-auto w-auto max-w-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/*content*/}
          <div className="relative w-80 rounded-none border-0 bg-white shadow-lg outline-none focus:outline-none sm:max-w-xl sm:rounded-lg">
            <div className="flex flex-col gap-4 p-6">
              <h3 className="text-2xl font-semibold text-black">
                Delete List?
              </h3>
              <div>This can’t be undone and you’ll lose your List.</div>
              <button
                className={`${
                  deleting
                    ? 'bg-zinc-400'
                    : 'cursor-pointer bg-red-600 hover:bg-red-700'
                } ho mt-3 flex w-full justify-center rounded-2xl px-4 py-2 text-white shadow-md`}
                onClick={onDeleteList}
              >
                {deleting ? (
                  <LoadingSpinner height={'h-6'}></LoadingSpinner>
                ) : (
                  <span>Delete</span>
                )}
              </button>
              <button
                className="block w-full cursor-pointer rounded-2xl border bg-white px-4 py-2 text-black shadow-md hover:bg-zinc-100"
                onClick={close}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  );
}
function toast(arg0: string, arg1: {}) {
  throw new Error('Function not implemented.');
}
