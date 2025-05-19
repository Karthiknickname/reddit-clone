import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react'

type Props = { 
seed?: string
large?:boolean
}

function Avatar({ seed, large }: Props) {
    const {data: session} = useSession();//destructuring
return (
<div 
    className={`relative h-10 w-10 overflow-hidden rounded-full border-gray-300 bg-blue-300${
    large && 'h-20 w-20'
    }`}>
    <Image
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    src={`https://api.dicebear.com/9.x/avataaars/svg?seed=Jameson${
        seed || session?.user?.name || 'placeholder'
    }.svg`}
    alt="avatar"
    />
</div>
)
}

export default Avatar
