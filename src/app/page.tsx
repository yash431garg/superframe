"use client"
import React, { useState, useEffect } from 'react';
import Spinnner from './components/Spinner/Spinnner';
import Copyclip from './utils/Copyclip';
import Image from 'next/image';
import locationIcon from '../../public/location.svg'

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_APP_URL

function page() {
  const [events, setEvents] = useState([])
  const [loading, setIsLoading] = useState(true)
  interface IDataModel {
    id: string,
    created_at: string,
    title: string,
    description: string,
    start_date_time: string,
    end_date_time: string,
    theme_color: string,
    user_address: string,
    location: string,
  }

  const GetPost = async () => {
    try {
      const response = await fetch('/api/query_event', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (response.ok) {
        const data = await response.json();
        setEvents(data);
        console.log(data)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    GetPost()
  }, [])

  return (
    <>
      {loading ? <div className='mt-4'>
        <Spinnner /></div> : events.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-12 gap-y-20 py-6">{events?.map((item: IDataModel) => {
          return (
            <div className='rounded-[15px] w-[300px] lg:w-[400px] flex-shrink-0 shadow-custom p-[16px] mx-4' style={{
              boxShadow: `inset 0 0 0.5px 1px hsla(0, 0%,
                      100%, 0.075),
                  0 0 0 1px hsla(0, 0%, 0%, 0.05),
                  0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),
                  0 0.9px 1.5px hsla(0, 0%, 0%, 0.045),
                  0 3.5px 6px hsla(0, 0%, 0%, 0.09)`,
            }}>
              <div className={` h-60 rounded-md flex justify-between  text-white p-6 mb-2`} style={{ backgroundColor: item?.theme_color }}>
                <div className="flex flex-col items-baseline mt-auto">
                  <h1 className="text-3xl mb-2 font-extrabold">
                    {item.title}
                  </h1>
                  <p className="text-sm">
                    {item.description}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-xs">{item.start_date_time}</p>
                  <p className="text-xs">{item.end_date_time}</p>
                </div>
              </div>
              <a
                href={NEXT_PUBLIC_URL + `/subscribers/` + item?.id}
                rel="noopener noreferrer"
                className="font-extrabold text-white"
              >
                ↗️ All Registrations  {item?.id}
              </a>
              <div className='flex flex-row'>
                <Image src={locationIcon} alt='location Icon' width={20} height={20}/>
                <p className='ml-1'>
                {item?.location}
                </p>
              </div>
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
