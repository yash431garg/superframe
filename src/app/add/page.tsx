"use client"
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Spinnner from "../components/Spinner/Spinnner";
import { toast } from 'react-hot-toast';
import Copyclip from "../utils/Copyclip";
import { useSession } from "next-auth/react"


function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

interface LinkFetcher {
  fetchLink(link: string): Promise<any>;
}

interface LinkSaver {
  saveLink(data: any): Promise<any>;
}

const ApiLinkFetcher: LinkFetcher = {
  async fetchLink(link: string) {
    const response = await fetch(`/api/query_event_link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(link),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }
}

const ApiLinkSaver: LinkSaver = {
  async saveLink(data: any) {
    const response = await fetch(`/api/query_event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {

      throw new Error(response.statusText);
    }
    return response.json();
  }
}

interface Result {
  img: string
  description: string
}

function Home() {

  const { data: session, status } = useSession()

  const [blogLink, setBlogLink] = useState("");
  const [linkResult, setLinkResult] = useState<Result | null>(null);
  const [loading, setIsLoading] = useState(false);

  const [frameLink, setFrameLink] = useState("");


  const postData = async () => {
    try {
      setIsLoading(true);
      const result: Result = await ApiLinkFetcher.fetchLink(blogLink);
      setLinkResult(result);
      setIsLoading(false);
    } catch (error) {

      setIsLoading(false);
      console.error('Error during POST request:', error);
      toast.error('Invalid Link');
    }
  };

  const savePost = async () => {
    try {
      const data = await ApiLinkSaver.saveLink({ linkResult, blogLink });
      setLinkResult(null);
      setBlogLink('');
      setFrameLink(data.id);
      toast.success(data.message);
    } catch (error) {
      toast.error('Failed to save post');
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    setFrameLink('')
    setBlogLink(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidUrl(blogLink)) {
      return toast.error('Invalid URL provided');
    }
    setIsLoading(true);
    setLinkResult(null);
    postData();
  };

  return (
    <div className="mt-10">
      <p className="flex flex-row justify-center items-center mb-5 sm:text-lg text-base">
        {`👋 Hi ${session?.user?.name}, Enter your event link to generate your cast`}
      </p>
      <form onSubmit={handleSubmit} className={`mx-6 flex flex-row justify-center items-center`}>
        <input type="text" id="blog" name="blog" value={blogLink} onChange={handleChange} placeholder="Add Blog Link" className="w-8/12 sm:w-5/12 p-2 rounded-md outline-none border border-[#171717] text-[#171717]" />
        <button type="submit" className="text-gray-900 bg-gray-100 ml-2 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2">
          Add +
        </button>
      </form>

      {loading && <Spinnner />}
      {linkResult &&
        <div className={`shadow--3xl mt-10 flex flex-col justify-center items-center`}>
          <img src={linkResult?.img} className="w-8/12 sm:w-4/12" />
          <button
            onClick={savePost}
            type="submit"
            className="shadow--3xl bg-[#47c97e] mt-5 w-6/12 sm:w-4/12 text-white font-semibold py-2 px-4 rounded focus:outline-non "
          >
            Awesome save it
          </button>
        </div >}
      <div className="text-center mt-10">
        {frameLink?.length > 0 && <Copyclip id={frameLink} />}
      </div>
    </div>
  );
}

export default Home;
