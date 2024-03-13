'use client'
import { useRouter } from 'next/navigation'
import classname from './Header.module.css'

import Link from 'next/link'
import { getSession } from '@/lib'

import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';

export default function Header() {
    const router = useRouter()
    const [session, setSession] = useState('')

    const logout = async () => {
        try {
            await fetch('/api/auth', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            toast.success("Logout Success");
            router.push("/auth")
        } catch {
            toast.error("Logout Failed");
        }
    };


    useEffect(() => {
        const clear = async () => { // Create a new async function: clear
            setSession(await getSession())
        };
        clear()
    }, [logout])



    return (
        <div className={classname.header}>
            <Link href="/" className='text-2xl'>Luma Frames</Link>
            <div className={classname.headerRight}>
                {session ? <div><Link href="/add" className='border px-4 py-2 m-4 rounded-md'>Create Frame</Link>
                    <button onClick={() => logout()} className="border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline">
                        Logout
                    </button> </div> : <Link href="/auth">Sign in</Link>}
            </div>
        </div>
    )
}