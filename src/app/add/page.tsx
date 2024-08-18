"use client"
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { toast } from 'react-hot-toast';
import Copyclip from "../utils/Copyclip";
import Spinnner from "../components/Spinner/Spinnner";

interface LinkSaver {
  saveLink(data: any): Promise<any>;
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


function Home() {
  const [processingFrame, setProcessingFrame] = useState(false);
  const [frameLink, setFrameLink] = useState("");
  const [errors, setErrors] = useState<String[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDateTime: '',
    location: '',
    endDateTime: '',
    color: '#55CD7D'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setErrors([])
    const { name, value } = e.target;
    if (name === 'description') {
      // setCharCount(value.length);
      setFormData(prevData => ({
        ...prevData,
        [name]: value.slice(0, 120)
      }));
    } else if (name === 'title') {
      setFormData(prevData => ({
        ...prevData,
        [name]: value.slice(0, 20)
      }));
    }
    else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    const requiredFields = ['title', 'description', 'startDateTime', 'endDateTime', 'location'];
    const newErrors = requiredFields?.filter(field => !formData[field as keyof typeof formData]);


    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const savePost = async () => {
    try {
      if (!validateForm()) {
        return;
      }
      setProcessingFrame(true)
      const data = await ApiLinkSaver.saveLink(formData);
      setFrameLink(data.id);
      toast.success(data.message);
      setProcessingFrame(false)
    } catch (error) {
      setProcessingFrame(false)
      toast.error('Failed to save post');
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    savePost();
  };

  return (
    <div className="mt-10 ">
      <div className="w-full max-w-[520px]  mx-auto gap-10 flex flex-col p-2 h-full items-center justify-center rounded-lg " style={{
        boxShadow: `inset 0 0 0.5px 1px hsla(0, 0%,
                100%, 0.075),
            0 0 0 1px hsla(0, 0%, 0%, 0.05),
            0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),
            0 0.9px 1.5px hsla(0, 0%, 0%, 0.045),
            0 3.5px 6px hsla(0, 0%, 0%, 0.09)`,
      }}>
        <form onSubmit={handleSubmit} className="space-y-4 p-6 w-full shadow-custom rounded-[28px]">
          <p className="text-sm">
            Theme Preview
          </p>
          <div className={`w-full h-60 rounded-md flex justify-between text-white p-6`} style={{ backgroundColor: formData.color }}>
            <div className="flex flex-col items-baseline mt-auto w-3/5">
              <h1 className="text-3xl mb-2 font-extrabold">
                {formData.title || 'Add Title'}
              </h1>
              <p className="text-sm w-3/5">
                {formData.description || 'Add description'}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-xs">{formData.startDateTime || 'Start Date/Time'}</p>
              <p className="text-xs">{formData.endDateTime || 'End Date/Time'}</p>
            </div>
          </div>
          <div>
            <input type="color" id="favcolor" name="favcolor" value={formData.color}
              onChange={(e) => setFormData(prevState => ({
                ...prevState,
                color: e.target.value
              }))} className="w-1/4 border-[#171717] border" />
          </div>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter Title"
            className={`rounded-md w-full border text-[#171717] p-2 ${formData.title.length > 30 ? 'border-red-500' : 'border-[#171717] '}`}
          />

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className={`rounded-md w-full border text-[#171717] p-2 ${formData.description.length > 150 ? 'border-red-500' : 'border-[#171717]'}`}
          ></textarea>

          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter event location"
            className="rounded-md w-full  border-[#171717] border text-[#171717] p-2"
          />
          <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-4">
            <input
              type="datetime-local"
              id="startDateTime"
              name="startDateTime"
              value={formData.startDateTime}
              onChange={handleChange}
              className="flex-1 w-full lg:w-52 rounded-md border-[#171717] border text-[#171717] p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171717]"
            />
            <input
              type="datetime-local"
              id="endDateTime"
              name="endDateTime"
              value={formData.endDateTime}
              onChange={handleChange}
              className="flex-1 w-full lg:w-52 rounded-md border-[#171717] border text-[#171717] p-2 mt-4 lg:mt-0"
            />
          </div>
          <button
            type="submit"
            className="rounded-md w-full bg-[#2358DA] px-3 py-2 text-lg font-semibold text-white"
            disabled={processingFrame}
          >
            {processingFrame ? (
              <Spinnner />
            ) : (
              'Create Frame'
            )}
          </button>
        </form>
        {errors.length > 0 && (
          <div className="text-red-600 text-center mt-0">
            The following fields are empty: {errors.join(', ')}
          </div>
        )}
      </div>
      <div className="text-center mt-10">
        {frameLink?.length > 0 && <Copyclip id={frameLink} />}
      </div>
    </div>
  );
}

export default Home;
