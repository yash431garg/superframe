"use client"
import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation'
import className from './auth.module.css'
import { getSession, logout } from '@/lib';


const LoginForm = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    // const [session, setSession] = useState('')

    useEffect(() => {
        getSession().then((res: any) => {

            if (res?.user.email) {
                router.push("/")
            }
        })

    }, [])




    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });


            if (response.ok) {
                const data = await response.json();

                router.push("/")

                toast.success(data.message);
            } else {
                const errorData = await response.json();
                toast.error(errorData.error);
                console.error('Login failed:', errorData.error); // Handle login failure
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error('Error during login');
        }
    };

    return (
        <div className={` min-h-screen py-6 flex flex-col sm:py-12`}>
            <div className={` relative py-3 w-10/12 mx-auto sm:w-4/12 sm:mx-auto`}>
                <div className={` ${className.auth}relative px-4 py-10 bg-[#313131] shadow-lg  rounded-3xl sm:p-20`}>
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold text-white">Sign in</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="divide-y divide-gray-700">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="relative">
                                        <input
                                            autoComplete="off"
                                            id="email"
                                            name="email"
                                            type="text"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="peer placeholder-transparent bg-[#313131] h-10 w-full border-b-2 rounded-md border-gray-700 text-[white] focus:outline-none focus:border-blue-500"
                                            placeholder="Email address"
                                        />
                                        <label
                                            htmlFor="email"
                                            className="absolute left-0 -top-3.5 text-blue-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-blue-500 peer-focus:text-sm"
                                        >
                                            Email Address
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            autoComplete="off"
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="peer placeholder-transparent bg-[#313131] h-10 w-full border-b-2 rounded-md border-gray-700 text-[white] focus:outline-none focus:border-blue-500"
                                            placeholder="Password"
                                        />
                                        <label
                                            htmlFor="password"
                                            className="absolute left-0 -top-3.5 text-blue-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-blue-500 peer-focus:text-sm"
                                        >
                                            Password
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <button type="submit" className="bg-blue-500 text-white rounded-md px-2 py-1">
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default LoginForm;