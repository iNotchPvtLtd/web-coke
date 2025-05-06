"use client"
import React from "react";
import { useState, useEffect } from "react";
import { Container } from "@/components/Container";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { getStrapiURL } from "@/lib/utils";
import QueryString from "qs";

async function loader() {
  const { fetchData } = await import("@/lib/fetch");

  const path = "/api/faq";
  const baseUrl = getStrapiURL();
  
   const query = QueryString.stringify({
    populate: {
      questions: {
        populate: {
          data: {
            fields: ["question", "answer"],
          },
        },
      },
    },
  });
 
    const url = new URL(path, baseUrl);
    url.search = query;
  
    const data = await fetchData(url.href);
    return data;
}

interface FaqProps {
    id: number;
    __component: string;
    questions: {
      data: {
        id: number;
        question: string;
        answer: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
      }[];
    };
}

export function Faq() {

  const [faqData, setFaqData] = useState<FaqProps| null>(null);
    
      useEffect(() => {
        const fetchData = async () => {
          const data = await loader();
          if (data) {
            setFaqData(data);
          }
        };
    
        fetchData();
      }, []);
  

  if (!faqData) return null;
  const questions = faqData.questions.data;

  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {questions.map((item) => (
          <div key={item.id} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <DisclosureButton className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200">
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-indigo-500`}
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="px-4 pt-4 pb-2 text-gray-500 dark:text-gray-300">
                    {item.answer}
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  );
}
