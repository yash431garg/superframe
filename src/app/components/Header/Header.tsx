'use client'
import classname from './Header.module.css'
import Link from 'next/link'
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react"


export default function Header() {
    const { data: session, status } = useSession()

    return (
        <div className={classname.header}>
            <Link href="/" className='text-2xl'>Luma Frames</Link>
            <div className={classname.headerRight}>
                {session?.user ? (
                    <div>
                        <button onClick={() => signOut()} className="border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline">
                            Logout
                        </button>
                        {session?.user.image &&

                            <img className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={session.user.image} alt="Bordered avatar" />
                        }
                    </div>
                ) : (
                    <Link href="/auth">Sign in</Link>
                )}
            </div>
        </div>
    )
}