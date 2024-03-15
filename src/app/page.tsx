"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Spinnner from './components/Spinner/Spinnner';
import className from './page.module.css'

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_APP_URL


function page() {
  const share = useRouter();

  const [events, setEvents] = useState([])
  const [loading, setIsLoading] = useState(false)
  const [showTooltip, setShowTooltip] = useState(0);

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

      {events.length > 0 && !loading ? <div className={`${className.blogGrid}`}>{events?.map((item: IDataModel) => {
        return (
          <div key={item?.id} className={`${className.blogItem} bg-[#313131]`}>
            <div>
              <span className="font-extrabold">Blog Link: </span>
              <span className="">{item?.event}</span>
            </div>
            <a
              href={NEXT_PUBLIC_URL + `/frames/` + item?.id}
              rel="noopener noreferrer"
              className="font-extrabold"
            >
              ↗️ {item?.id}
            </a>
            <div onClick={() => {
              navigator.clipboard.writeText(NEXT_PUBLIC_URL + '/frames/' + item?.id)
              setShowTooltip(item?.id)
              setTimeout(() => setShowTooltip(0), 1000);
            }} className="shareicon" >
              <p className='cursor-pointer'>📃 Copy to clipboar</p>
              {showTooltip === item?.id && <span className="tooltip">Happy Casting!</span>}
            </div>
          </div>
        );
      })}</div > : <p className="flex flex-row justify-center items-center mx-auto mb-5 sm:text-lg text-base">
        No Data Found
      </p>
      }

    </>
  );
}

export default page;
