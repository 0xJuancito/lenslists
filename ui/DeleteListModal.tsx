'use client';

import UserListItem from '@/ui/UserListItem';

export type IDeleteListModal = {
  close: () => void;
  listId: string;
};

export default function DeleteListModal({ close, listId }: IDeleteListModal) {
  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden overflow-x-hidden outline-none focus:outline-none sm:overflow-y-auto"
        onClick={() => close()}
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
                className="mt-3 block w-full cursor-pointer rounded-2xl bg-red-600 px-4 py-2 text-white shadow-md hover:bg-red-700"
                onClick={() => close()}
              >
                Delete
              </button>
              <button
                className="block w-full cursor-pointer rounded-2xl border bg-white px-4 py-2 text-black shadow-md hover:bg-zinc-100"
                onClick={() => close()}
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
