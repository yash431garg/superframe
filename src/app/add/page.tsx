"use client"
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Spinnner from "../components/Spinner/Spinnner";
import { toast } from 'react-hot-toast';
import Copyclip from "../utils/Copyclip";




function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}
export default function Home() {
  interface Result {
    img: string
    description: string
  }
  const [blogLink, setBlogLink] = useState("");
  const [frameLink, setFrameLink] = useState("");
  const [linkResult, setLinkResult] = useState<Result | null>(null)
  const [loading, setIsLoading] = useState(false)


  const postData = async () => {
    try {
      const response = await fetch((`/api/query_event_link`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed
        },
        body: JSON.stringify(blogLink),
      });

      if (!response.ok) {
        throw new Error('Invalid Link');
      }

      const result: Result = await response.json();
      setIsLoading(false)
      setLinkResult(result)
      return result;
    } catch (error) {
      setIsLoading(false)
      console.error('Error during POST request:', error);
      // Handle error as needed
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    setBlogLink(value)
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidUrl(blogLink)) {
      return toast.error('Invalid URL provided');
    }
    setIsLoading(true)
    setLinkResult(null)
    postData()
  }

  const savePost = async () => {
    const response = await fetch((`/api/query_event`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({ linkResult, blogLink }),
    });

    if (response.ok) {
      const data = await response.json();
      setLinkResult(null)
      setBlogLink('')
      setFrameLink(data.id)
      return toast.success(data.message);

    } else {
      const errorData = await response.json();
      toast.error(errorData.error);
    }

  }

  return (
    <div className="mt-10">
      <p className="flex flex-row justify-center items-center mb-5 sm:text-lg text-base">
        👋 Hi, Enter your event link to generate your cast
      </p>
      <form onSubmit={handleSubmit} className={` mx-6 flex flex-row justify-center items-center`}>
        <input type="text" id="blog" name="blog" value={blogLink} onChange={handleChange} placeholder="Add Blog Link" className="w-8/12 sm:w-5/12 p-2 rounded-md outline-none border border-[#171717] text-[#171717]" />
        <button type="button" className="text-gray-900 bg-gray-100 ml-2 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2">
          Add +
        </button>
      </form>

      {loading && <Spinnner />}
      {linkResult &&
        <div className={` shadow--3xl mt-10 flex flex-col justify-center items-center`}>
          <img src={linkResult?.img} className="w-8/12 sm:w-4/12" />
          <button
            onClick={() => { savePost() }}
            type="submit"
            className="shadow--3xl bg-[#47c97e] mt-5 w-6/12 sm:w-4/12 text-white font-semibold py-2 px-4 rounded focus:outline-non "
          >
            Awesome save it
          </button>
        </div >}
      <div className="text-center mt-10">
        {frameLink.length > 0 && <Copyclip id={frameLink} />}
      </div>
    </div>
  );
}
