'use client';

import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

// Extend the session user type to include 'id'
declare module 'next-auth' {
  interface Session {
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
import Avatar from './Avatar';
import { LinkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';

type FormData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
};

function PostBox() {
  const { data: session } = useSession();
  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (formData) => {
     if (!session) return;

  try {
    const res = await fetch('/api/post/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: formData.postTitle,
        content: formData.postBody,
        imageUrl: formData.postImage || '',
        communitySlug: formData.subreddit.toLowerCase(),
      }),
    });

    const data = await res.json();

    if (res.ok) {
      console.log('✅ Post created:', data);
      // Optionally reset form or show toast
    } else {
      console.error('❌ Error creating post:', data.error);
    }
  } catch (error) {
    console.error('❌ Network error:', error);
  }
});

  return (
    <form
      onSubmit={onSubmit}
      className="sticky top-16 z-50 rounded-md border border-gray-500 bg-amber-50 p-2"
    >
      <div className="flex items-center space-x-3">
        <Avatar />
        <input
          {...register('postTitle', { required: true })}
          disabled={!session}
          className="flex-1 rounded-md bg-gray-50 p-2 pl-5 outline-none"
          type="text"
          placeholder={
            session ? 'Create a post by entering a title!' : 'Sign in to post'
          }
        />
        <PhotoIcon
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
          className={`h-6 cursor-pointer text-gray-300 ${
            imageBoxOpen && 'text-blue-300'
          }`}
        />
        <LinkIcon className="h-6 text-gray-300" />
      </div>

      {!!watch('postTitle') && (
        <div className="flex flex-col py-2">
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body:</p>
            <input
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              {...register('postBody')}
              type="text"
              placeholder="Text (optional)"
            />
          </div>

          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Subreddit:</p>
            <input
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              {...register('subreddit', { required: true })}
              type="text"
              placeholder="i.e. reactjs"
            />
          </div>

          {imageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Image URL:</p>
              <input
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                {...register('postImage')}
                type="text"
                placeholder="Optional..."
              />
            </div>
          )}

          {/* Error Handling */}
          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500">
              {errors.postTitle?.type === 'required' && (
                <p>A Post title is required</p>
              )}
              {errors.subreddit?.type === 'required' && (
                <p>A Subreddit is required</p>
              )}
            </div>
          )}
          {!!watch('postTitle') && (
          <button
            type="submit"
            className="w-full rounded-full bg-blue-500 p-2 text-white">
            Create Post
          </button>
          )}
        </div>
      )}
    </form>
  );
}

export default PostBox;
