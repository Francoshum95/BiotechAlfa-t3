import { Prisma } from '@prisma/client'
import { api } from "../../utils/api";
import { drug, drug_indicaiton_drug, drug_name, drug_name_drug, equity_drug, PrismaClient } from "@prisma/client";
import { useState } from "react";
import Skeleton from "../../components/Skeleton";
import { DataTransformer } from "@trpc/server";
import _ from 'lodash';

const TABLE_HEADER = [
  'Ticker',
  'Company Name',
  'Drug Name',
  'Indication',
  'Drug Mechanism',
  'Drug Type',
]


const getDrugName = (drugNames: any[]) => {
  let newDrugNames = ""
  drugNames.forEach(item => {
    newDrugNames += item.drug_name.name
  })

  return newDrugNames
};

const Home = () => {
  const { data, isFetching, isPreviousData } =
    api.drug.info.useQuery({ skip: 0 }, { keepPreviousData: true });
  

  return (
    <div className="flex h-full w-full flex-col items-center">
      <nav className="h-20 w-full px-10 py-5 text-xl font-semibold text-white">
        BiotechAlfa
      </nav>
      <div className="mt-10 flex h-12 w-[70%] items-center rounded-full bg-white px-6 py-3">
        <input
          placeholder="ticker, company name, indication, drug type"
          className="w-full px-3 focus:outline-none "
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
      <div className="mt-10 min-h-[60vh] w-[90%] overflow-auto rounded-sm bg-white text-black md:mt-20 md:w-[70%]">
        <Skeleton isLoading={isFetching}>
          <table className="table-fixed w-full">
            <thead className="border-b-2">
              <tr>
                {
                  TABLE_HEADER.map((item, index) => (
                    <th key={index} className="text-left px-7 py-4">
                      {item}
                    </th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {
                data?.map(({drug, equity}) => (
                  <tr key={drug.id} className="border-b-2 text-xs overflow-auto">
                    <td className="px-7 py-4">{equity.ticker}</td>
                    <td className="px-7 py-4">{equity.name}</td>
                    <td className="px-7 py-4">
                      {drug.drug_name_drug.map(name => (
                        <span className='table-tag'>{name.drug_name.name}</span>
                      ))}
                    </td>
                    <td className="px-7 py-4">
                      {drug.drug_indicaiton_drug.map(indication => (
                        <span className='table-tag'>{indication.drug_indication.indication}</span>
                      ))}
                    </td>
                    <td className="px-7 py-4">
                      {drug.drug_mechanism_drug.map(mechanism => (
                        <span className='table-tag'>{mechanism.drug_mechanism.mechanism}</span>
                      ))}
                    </td>
                    <td className="px-7 py-4">
                      {drug.drug_type_drug.map(type => (
                        <span className='table-tag'>{type.drug_type.type}</span>
                      ))}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </Skeleton>
      </div>
    </div>
  );
};

export default Home;
