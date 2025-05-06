"use client"

import React from "react";
import { useState, useEffect } from "react";
import { Container } from "@/components/Container";
import { getStrapiURL } from "@/lib/utils";
import QueryString from "qs";

async function loader() {
  const { fetchData } = await import("@/lib/fetch");

  const path = "/api/section-heading";
  const baseUrl = getStrapiURL();
  
   const query = QueryString.stringify({
    populate: true,
  });
 
    const url = new URL(path, baseUrl);
    url.search = query;
  
    const data = await fetchData(url.href);
    return data;
}

interface SectionHeadingProps {
    id: number;
    preHeading: string;
    heading: string;
    text: string;
}

export function SectionHeading() {

    const [sectionHeadingData, setCectionHeadingData] = useState<SectionHeadingProps| null>(null);
      
        useEffect(() => {
          const fetchData = async () => {
            const data = await loader();
            if (data) {
              setCectionHeadingData(data);
            }
          };
  
          fetchData();
        }, []);

  if (!sectionHeadingData) return null;

  const { preHeading, heading, text } = sectionHeadingData;

  return (
    <Container className="flex w-full flex-col mt-4 items-center justify-center text-center ">
      {preHeading && (
        <div className="text-sm font-bold tracking-wider text-indigo-600 uppercase">
          {preHeading}
        </div>
      )}

      {heading && (
        <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
          {heading}
        </h2>
      )}

      {text && (
        <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
          {text}
        </p>
      )}
    </Container>
  );
}
