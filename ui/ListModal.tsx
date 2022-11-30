'use client';

import { useDebouncedCallback } from 'use-debounce';
import { getAuthenticationToken } from '@/lib/apollo-client';
import { explore } from '@/lib/lens/explore-profiles';
import { profiles } from '@/lib/lens/get-profiles';
import { search } from '@/lib/lens/search-profiles';
import { GetListMembersResponse } from '@/lib/responses.types';
import { useScrollBlock } from '@/lib/useScrollBlock';
import DeleteListModal from '@/ui/DeleteListModal';
import UserListItem from '@/ui/UserListItem';
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { IListCard } from './ListCard';
import LoadingSpinner from './LoadingSpinner';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { ProfileContext } from './LensAuthenticationProvider';
import { usePathname } from 'next/navigation';
import { MAX_MEMBERS_COUNT } from '@/lib/validations';

import { IKImage, IKContext, IKUpload } from 'imagekitio-react';

type IListUser = {
  id: string;
  name: string;
  handle: string;
  pictureUrl: string;
  isMember: boolean;
};

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
  listId: initialListId,
  name: initialName = '',
  description: initialDescription = '',
  coverPictureUrl: initialCoverPictureUrl = '',
  onUpdate,
}: IListModal) {
  const router = useRouter();
  const pathname = usePathname();

  const ikUploadRef = useRef<any>(null);

  const profile = useContext(ProfileContext);

  const [isManagingMembers, setIsManagingMembers] = useState(false);
  const [isSuggested, setIsSuggested] = useState(false);
  const [showDeleteListModal, setShowDeleteListModal] = useState(false);

  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [coverPictureUrl, setCoverPictureUrl] = useState(
    initialCoverPictureUrl,
  );

  const [uploading, setUploading] = useState(false);

  const [listId, setListId] = useState(initialListId);
  const [members, setMembers] = useState<IListUser[]>([]);
  const [suggestions, setSuggestions] = useState<IListUser[]>([]);

  const [blockScroll, allowScroll] = useScrollBlock();

  const debouceSearch = useDebouncedCallback((value) => {
    handleSearchChange(value);
  }, 400);

  const [creatingList, setCreatingList] = useState(false);

  useEffect(() => {
    blockScroll();

    let newSuggestions: IListUser[] = [];
    let newMembers: IListUser[] = [];

    explore().then((response) => {
      const users = response.items;
      newSuggestions = users.map((user) => ({
        id: user.id,
        name: user.name as string,
        handle: user.handle,
        // @ts-ignore
        pictureUrl: user.picture?.original?.url,
        isMember: newMembers.some((member) => member.id === user.id),
      }));
      setSuggestions(newSuggestions);
    });

    if (listId) {
      fetch(`/api/lists/${listId}/members`).then(async (rawResponse) => {
        const response = (await rawResponse.json()) as GetListMembersResponse;
        const membersIds = response.data.members.items.map(
          (member) => member.profileId,
        );
        const users = membersIds.length
          ? (await profiles(membersIds)).items
          : [];
        newMembers = users.map((user) => ({
          id: user.id,
          name: user.name as string,
          handle: user.handle,
          // @ts-ignore
          pictureUrl: user.picture?.original?.url,
          isMember: true,
        }));
        setMembers(newMembers);

        newSuggestions.forEach((suggestion, index) => {
          if (newMembers.some((member) => member.id === suggestion.id)) {
            newSuggestions[index].isMember = true;
          }
        });
        setSuggestions(newSuggestions);
      });
    }
  }, []);

  const onMemberChange = (user: IListUser, isMember: boolean) => {
    const totalMembers = members.filter((member) => member.isMember).length;
    if (totalMembers >= MAX_MEMBERS_COUNT && isMember) {
      toast(
        `You cannot add more than ${MAX_MEMBERS_COUNT} members to a list at the moment.`,
      );
      return;
    }

    if (isMember) {
      fetch(`/api/lists/${listId}/members`, {
        method: 'POST',
        headers: {
          'x-access-token': getAuthenticationToken() || '',
        },
        body: JSON.stringify({ profileId: user.id }),
      });
    } else {
      fetch(`/api/lists/${listId}/members/${user.id}`, {
        method: 'DELETE',
        headers: {
          'x-access-token': getAuthenticationToken() || '',
        },
      });
    }

    const newMembers = [...members];
    newMembers.forEach((member, index) => {
      if (member.id === user.id) {
        members[index].isMember = isMember;
      }
    });
    if (isMember && !newMembers.some((member) => member.id === user.id)) {
      newMembers.unshift({ ...user, isMember: true });
    }
    setMembers(newMembers);

    const newSuggestions = [...suggestions];
    newSuggestions.forEach((member, index) => {
      if (member.id === user.id) {
        suggestions[index].isMember = isMember;
      }
    });
    setSuggestions(newSuggestions);

    if (onUpdate) {
      onUpdate({
        totalMembers: newMembers.filter((member) => member.isMember).length,
      });
    }
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleSearchChange = (query: string) => {
    search(query).then((response) => {
      // @ts-ignore
      const users = response.items;
      const newSuggestions = users.map((user: any) => ({
        id: user.id,
        name: user.name as string,
        handle: user.handle,
        // @ts-ignore
        pictureUrl: user.picture?.original?.url,
        isMember: members.some((member) => member.id === user.id),
      }));
      setSuggestions(newSuggestions);
    });
  };

  const EditList = (
    <div className="relative flex flex-auto flex-col justify-between gap-2 py-6">
      <div className="px-6">
        <div className="mb-3 flex flex-col gap-2 pt-0">
          <label className="text-sm font-bold">Cover Picture URL</label>
          <IKContext
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL}
            publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}
            authenticationEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_AUTH_URL}
          >
            <>
              <div
                className="flex aspect-video w-1/2 cursor-pointer items-center justify-center rounded-lg border shadow"
                onClick={() => ikUploadRef?.current?.click()}
              >
                {coverPictureUrl && !uploading ? (
                  <IKImage
                    src={coverPictureUrl}
                    className="aspect-video h-full w-full object-cover"
                  />
                ) : uploading ? (
                  <LoadingSpinner />
                ) : (
                  <img src="/upload.png" height={40} width={40}></img>
                )}
              </div>
              <IKUpload
                className="hidden"
                inputRef={ikUploadRef}
                onUploadStart={() => setUploading(true)}
                onError={() => {
                  toast('Could not upload the image. Try again.');
                  setUploading(false);
                }}
                onSuccess={(res) => {
                  setCoverPictureUrl(res.url);
                  setUploading(false);
                }}
              />
            </>
          </IKContext>
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
      {members.map((member, key) => (
        <UserListItem
          key={key}
          id={member.id}
          pictureUrl={member.pictureUrl}
          name={member.name}
          handle={member.handle}
          isMember={member.isMember}
          onMemberChange={onMemberChange}
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
          onChange={(e) => debouceSearch(e.target.value)}
        />
      </div>
      <div>
        {suggestions.map((user, key) => (
          <UserListItem
            key={key}
            id={user.id}
            pictureUrl={user.pictureUrl}
            name={user.name}
            handle={user.handle}
            isMember={user.isMember}
            onMemberChange={onMemberChange}
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

  const onCreateNext = () => {
    if (creatingList) {
      return;
    }

    if (!name || !description || !coverPictureUrl) {
      toast('All fields are required.', {});
      return;
    }

    setCreatingList(true);

    fetch(`/api/lists`, {
      method: 'POST',
      headers: {
        'x-access-token': getAuthenticationToken() || '',
      },
      body: JSON.stringify({ name, description, coverPictureUrl }),
    })
      .then(async (response) => {
        if (response.status === 200) {
          const body = await response.json();
          setIsSuggested(true);
          setIsManagingMembers(true);
          setListId(body.data.list.id);
        } else {
          const body = await response.json();
          const message =
            body?.details?.[0]?.message ||
            body?.message ||
            'There was an error. Please try again later.';
          toast(message, {});
        }
      })
      .finally(() => {
        setCreatingList(false);
      });
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

  const redirectToMyLists = () => {
    hideModal();
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
                    isManagingMembers ? redirectToMyLists() : updateList();
                  }}
                >
                  DONE
                </button>
              ) : (
                <button
                  className={`${
                    creatingList
                      ? 'bg-zinc-400'
                      : 'cursor-pointer bg-sky-600 hover:bg-sky-700'
                  } flex max-h-10 w-20 justify-center rounded-2xl px-4 py-2 text-white shadow-md`}
                  onClick={onCreateNext}
                >
                  {creatingList ? (
                    <LoadingSpinner height={'h-6'}></LoadingSpinner>
                  ) : (
                    <span>NEXT</span>
                  )}
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
