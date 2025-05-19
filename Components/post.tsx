import { ArrowUpIcon } from '@heroicons/react/24/outline'
import { Post } from '@prisma/client'
import React from 'react'
type Props = {
    post: Post
}
function post({ post }: Props) {
  return <><div>Post</div><div>
    <div>
        <ArrowUpIcon className='voteButtons hover:text-red-400' />
    </div>
  </div></>
  
}

export default post
