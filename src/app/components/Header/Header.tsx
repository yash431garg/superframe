'use client'
import Link from 'next/link'
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react"


export default function Header() {
    const { data: session, status } = useSession()

    return (
        <div className={`flex flex-row justify-between items-center p-2 md:p-5`} style={{
            boxShadow: `inset 0 0 0.5px 1px hsla(0, 0%,
                100%, 0.075),
            0 0 0 1px hsla(0, 0%, 0%, 0.05),
            0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),
            0 0.9px 1.5px hsla(0, 0%, 0%, 0.045),
            0 3.5px 6px hsla(0, 0%, 0%, 0.09)`
        }} >
            <Link href="/" className="text-2xl md:text-lg text-white">Superframes</Link>
            <div className="flex items-center space-x-2">
                {session?.user ? (
                    <div className="flex items-center space-x-2">
                        <Link href="/add" className="border px-2 md:px-4 py-1 md:py-2 rounded-md text-sm md:text-base text-white">Create Frame</Link>
                        <button onClick={() => signOut()} className="border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-2 md:px-4 py-1 md:py-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline text-sm md:text-base">Logout</button>
                        {session?.user.image && (
                            <img className="w-8 h-8 md:w-10 md:h-10 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={session.user.image} alt="Bordered avatar" />
                        )}
                    </div>
                ) : (
                    <Link href="/auth" className="text-sm md:text-base">Sign in</Link>
                )}
            </div>
        </div>

    )
}