"use client";
import { useState, useEffect } from "react";
import { Container } from "@/components/Container";
import { getStrapiURL } from "@/lib/utils";
import QueryString from "qs";

async function loader() {
  const { fetchData } = await import("@/lib/fetch");

  const path = "/api/video";
  const baseUrl = getStrapiURL();
  
   const query = QueryString.stringify({
    videoId: {
      populate: true,
    },
  });
 
    const url = new URL(path, baseUrl);
    url.search = query;
  
    const data = await fetchData(url.href);
    return data;
}

interface VideoProps {
    id: number;
    videoId: string;
}

export function Video() {
  const [playVideo, setPlayVideo] = useState(false);
  const [videoData, setVideoData] = useState<VideoProps | null>(null);

  useEffect(() => {
    const fetchVideoData = async () => {
      const data = await loader();
      if (data) {
        setVideoData(data); // Set the fetched video data
      }
    };

    fetchVideoData();
  }, []);

  
  if (!videoData) return null;

  const { videoId } = videoData;
  
  return (
    <Container>
      <div className="relative w-full h-[500px] max-w-4xl mx-auto overflow-hidden lg:mb-20 rounded-2xl bg-indigo-300 cursor-pointer bg-gradient-to-tr from-purple-400 to-indigo-700">
        {!playVideo && (
          <button
            onClick={() => setPlayVideo(!playVideo)}
            className="absolute inset-auto w-16 h-16 text-white transform -translate-x-1/2 -translate-y-1/2 lg:w-28 lg:h-28 top-1/2 left-1/2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16  lg:w-28 lg:h-28"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Play Video</span>
          </button>
        )}
        {playVideo && (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?controls=0&autoplay=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="w-full h-full aspect-video"
          ></iframe>
        )}
      </div>
    </Container>
  );
}
