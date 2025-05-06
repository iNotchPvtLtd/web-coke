"use client"
import React from "react";
import { useState, useEffect } from "react";
import { Container } from "@/components/Container";
import { getStrapiURL } from "@/lib/utils";
import QueryString from "qs";
import { StrapiImage } from "./StrapiImage";

async function loader() {
  const { fetchData } = await import("@/lib/fetch");

  const path = "/api/content-section";
  const baseUrl = getStrapiURL();
  
   const query = QueryString.stringify({
    populate: {
      image: {
        fields: ["url", "alternativeText", "name"],
      },
    },
    fields: ["id", "heading", "text", "imageRight"],
  });
 
    const url = new URL(path, baseUrl);
    url.search = query;
  
    const data = await fetchData(url.href);
    return data;
}

interface ContentWithImageProps {
    id: number;
    __component: string;
    heading: string;
    text: string;
    imageRight: boolean | null;
    image: {
      id: number;
      url: string;
      alternativeText: string | null;
      name: string;
    };
  }

export function ContentWithImage() {

   const [contentWithImageData, setContentWithImageData] = useState<ContentWithImageProps| null>(null);
    
      useEffect(() => {
        const fetchData = async () => {
          const data = await loader();
          if (data) {
            setContentWithImageData(data);
          }
        };

        fetchData();
      }, []);
  
  if (!contentWithImageData) return null;

  const { heading, text, image, imageRight } = contentWithImageData;
  return (
    <Container className="flex flex-wrap mb-20 lg:gap-10 lg:flex-nowrap ">
      <div
        className={`flex items-center justify-center w-full lg:w-1/2 ${
          imageRight ? "lg:order-1" : ""
        }`}
      >
        <div>
          <StrapiImage
            src={image.url}
            width={521}
            height={521}
            alt={image.alternativeText || image.name}
            className={"object-cover"}
          />
        </div>
      </div>

      <div
        className={`flex flex-wrap items-center w-full lg:w-1/2 ${
          imageRight ? "lg:justify-end" : ""
        }`}
      >
        <div>
          <div className="flex flex-col w-full mt-4">
            <h3 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
              {heading}
            </h3>

            <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
              {text}
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
