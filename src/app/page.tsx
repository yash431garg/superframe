"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Spinnner from './components/Spinner/Spinnner';
import Copyclip from './utils/Copyclip';

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_APP_URL

function page() {
  const [events, setEvents] = useState([])
  const [loading, setIsLoading] = useState(false)


  interface IDataModel {
    id: number;
    event: string;
    created_at: string;

  }

  const GetPost = async () => {
    const response = await fetch('/api/query_event', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (response.ok) { setEvents(await response?.json()); setIsLoading(false) }
  }


  useEffect(() => {
    setIsLoading(true)
    GetPost()
  }, [])



  return (
    <>
      {loading && <Spinnner />}
      {events.length > 0 && !loading ? <div className={`flex flex-col justify-center items-center p-10`}>{events?.map((item: IDataModel) => {
        return (
          <div key={item?.id} className="bg-[#313131] w-full p-2 m-2 sm:p-5 sm:m-5  sm:w-1/2 rounded-md ">
            <div>
              <span className="font-extrabold text-white">Blog Link: </span>
              <span className="text-white">{item?.event}</span>
            </div>
            <a
              href={NEXT_PUBLIC_URL + `/subscribers/` + item?.id}
              rel="noopener noreferrer"
              className="font-extrabold text-white"
            >
              ↗️ All Registrations  {item?.id}
            </a>
            <Copyclip id={String(item?.id)} />
          </div>
        );
      })}</div > : <p className="flex flex-row justify-center items-center mx-auto mb-5 sm:text-lg text-base text-white">
        No Data Found
      </p>
      }
    </>
  );
}

export default page;
