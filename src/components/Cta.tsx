"use client"
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/Container";
import { getStrapiURL } from "@/lib/utils";
import QueryString from "qs";

async function loader() {
  const { fetchData } = await import("@/lib/fetch");

  const path = "/api/cta";
  const baseUrl = getStrapiURL();
  
   const query = QueryString.stringify({
    populate: {
      fields: ["heading", "subHeading"],
      cta: {
        fields: ["href", "text", "external"],
      },
    },
  });
 
    const url = new URL(path, baseUrl);
    url.search = query;
  
    const data = await fetchData(url.href);
    return data;
}

interface CtaProps {
    id: number;
    __component: string;
    heading: string;
    subHeading: string;
    cta: {
      id: number;
      href: string;
      text: string;
      external: boolean;
    };
}

export function Cta() {

    const [ctaData, setCtaData] = useState<CtaProps| null>(null);
      
        useEffect(() => {
          const fetchData = async () => {
            const data = await loader();
            if (data) {
              setCtaData(data);
            }
          };
      
          fetchData();
        }, []);

  
  if (!ctaData) return null;
  const { heading, subHeading, cta } = ctaData;
  return (
    <Container>
      <div className="flex flex-wrap items-center justify-between w-full max-w-4xl gap-5 mx-auto text-white bg-indigo-600 px-7 py-7 lg:px-12 lg:py-12 lg:flex-nowrap rounded-xl">
        <div className="flex-grow text-center lg:text-left">
          <h2 className="text-2xl font-medium lg:text-3xl">{heading}</h2>
          <p className="mt-2 font-medium text-white text-opacity-90 lg:text-xl">
            {subHeading}
          </p>
        </div>
        <div className="flex-shrink-0 w-full text-center lg:w-auto">
          <Link
            href={cta.href}
            target={cta.external ? "_blank" : "_self"}
            rel="noopener"
            className="inline-block py-3 mx-auto text-lg font-medium text-center text-indigo-600 bg-white rounded-md px-7 lg:px-10 lg:py-5 "
          >
            {cta.text}
          </Link>
        </div>
      </div>
    </Container>
  );
}
