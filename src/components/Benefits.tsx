"use client"
import React from "react";
import { useState, useEffect } from "react";
import { Container } from "@/components/Container";
import { CheckIcon } from "@heroicons/react/20/solid";
import { getStrapiURL } from "@/lib/utils";
import QueryString from "qs";
import { StrapiImage } from "./StrapiImage";

async function loader() {
  const { fetchData } = await import("@/lib/fetch");

  const path = "/api/benefit";
  const baseUrl = getStrapiURL();
  
   const query = QueryString.stringify({
    populate: {
      image: {
        fields: ["url", "alternativeText", "name"],
      },
      item: {
        fields: ["id", "text", "heading", "icon"],
      },
    },
  });
 
    const url = new URL(path, baseUrl);
    url.search = query;
  
    const data = await fetchData(url.href);
    return data;
}

function iconSelect(iconKey: string) {
  switch (iconKey) {
    case "CHECK":
      return <CheckIcon className="w-7 h-7 text-indigo-50" />;
    default:
      return null;
  }
}


interface BenefitProps {
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
    item: {
      id: number;
      text: string;
      icon: string | null;
      heading: string;
    }[];
}

export function Benefits() {

  const [benefitsData, setBenefitsData] = useState<BenefitProps| null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await loader();
      if (data) {
        setBenefitsData(data);
      }
    };

    fetchData();
  }, []);

  if (!benefitsData) return null;

  const { heading, text, image, item, imageRight } = benefitsData;
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

          <div className="w-full mt-5">
            {item.map((item, index) => (
              <Benefit
                key={index}
                data={item}
              ></Benefit>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

interface BenefitItemProps {
  data: {
    id: number;
    text: string;
    icon: string | null;
    heading: string;
  };
}

function Benefit({ data }: Readonly<BenefitItemProps>) {
  if (!data) return null;
  const { heading, text, icon } = data;
  return (
    <div className="flex items-start mt-8 space-x-3">
      {icon && (
        <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-md w-11 h-11 ">
          {iconSelect(icon)}
        </div>
      )}
      <div>
        <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200">
          {heading}
        </h4>
        {text && (
          <p className="mt-1 text-gray-500 dark:text-gray-400">{text}</p>
        )}
      </div>
    </div>
  );
}
