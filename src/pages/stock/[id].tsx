import {  GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { createContextInner } from "src/server/api/trpc";
import { appRouter } from "src/server/api/root";
import superjson from "superjson";
import { prisma } from "src/server/db";
import Head from "next/head";
import { useState } from "react";
import Container from "src/components/Container";
import Link from "next/link";

const phaseMap: {[key: string]: string} = {
  "Discontinued": "phase-discontinued",
  "Suspended": "phase-discontinued",
  "No development reported": "phase-preClinical",
  "Clinical Phase Unknown": "phase-preClinical",
  "Research": "phase-preClinical",
  "Preclinical": "phase-preClinical",
  "Phase 0": "phase-0",
  "Phase I": "phase-1",
  "Phase I/II": "phase-1-2",
  "Phase II": "phase-2 ", 
  "Phase II/III": "phase-2-3",
  "Phase III": "phase-3", 
  "Preregistration": "phase-marked",
  "Registered": "phase-marked",
  "Marketed": "phase-marked"
}


const Stock = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [openInfo, setOpenInfo] = useState(false);
  const stockData =  props.data;


  return (
    <>
      <Head>
        <title>{`BiotechAlfa - ${stockData?.info?.name}`}</title>
        <meta name="description" content="Generated by create-t3-app" />
      </Head>
      <Container>
        <div className="w-full">
          <div className="flex justify-between">
            <h1 className="text-gray-400 text-xl font-bold">{stockData?.info?.name}</h1>
            <Link 
              className="max-sm:hidden"
              href={`${stockData?.info?.equity_info?.website}`} target="_blank">
              <span className="text-gray-400">{stockData?.info?.equity_info?.website}</span>
            </Link>

          </div>
          <p className={`text-yellow-600 ${!openInfo && 'line-clamp-3'}`}>
            {stockData?.info?.equity_info.business}
          </p>
          <div className="w-full flex">
            <button 
              className="text-gray-400 ml-auto text-sm font-bold"
              onClick={() => {
                setOpenInfo(prevState => !prevState)
              }}
              >
                {`${openInfo ? 'Close' : 'Show more'}`}
            </button>
          </div>
        </div>
        <div className="w-full container-border mt-2 overflow-x-auto px-2">
          <h1 className="news-header">Drug Pipeline</h1>
          <table className="w-full px-2 mt-2 table-auto">
            <thead className="table-thead-container">
              <tr className="text-left text-white">
                <th className="table-thead border-r-[1px]">Drug Name</th>
                <th className="table-thead border-r-[1px]">Indicaiton</th>
                <th className="table-thead border-r-[1px] max-md:hidden">Drug Type</th>
                <th className="table-thead max-md:hidden">Drug Mechanism</th>
              </tr>
            </thead>
            <tbody className="text-yellow-600">
              {
                stockData?.drugs&&
                  stockData?.drugs.map(drug => (
                    <tr key={drug.drug.id}>
                      <td className="table-body">
                      {drug.drug.drug_name_drug.map((name, index) => (
                        <div className="overflow-auto" key={index}>{name.drug_name.name}</div>
                      ))}
                      </td>
                      <td className="table-body">
                        {
                          drug.drug.drug_indicaiton_drug.map((indication, index) => (
                            <div key={index} className="flex flex-col">
                              <div>
                                {indication.drug_indication.indication}
                              
                              </div>
                              <div 
                                className={`${phaseMap[indication.drug_phase.phase] || 'phase-preClinical'} 
                                py-2 ml-auto`}>
                              </div>
                              
                            </div>
                          ))
                        }
                      </td>
                      <td className="max-md:hidden table-body">
                        {
                          drug.drug.drug_type_drug.map((type, index) => (
                            <div key={index}>{type.drug_type.type}</div>
                          ))
                        }
                      </td>
                      <td className="max-md:hidden table-body">
                        {
                          drug.drug.drug_mechanism_drug.map((mechanism, index) => (
                            <div key={index}>{mechanism.drug_mechanism.mechanism}</div>
                          ))
                        }
                      </td>
                    </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </Container>
    </>
  )
}


export const getStaticPaths = async () => {
  const company = await prisma.equity.findMany({
    select: {
      ticker: true,
    }
  });

  if (company){
    return {
      paths: company.map(company => ({
        params: {
          id:  company.ticker
        }}
      )),
      fallback: false
    }
  } else {
    return {
      paths: [],
      fallback: false
    }
  }
};

export const getStaticProps = async(context: GetStaticPropsContext<{ id: string }>) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner(),
    transformer: superjson,
  });

  const id = context.params?.id as string;
  const drugs = await ssg.drug.info.fetch({ticker: id});
  const info = await ssg.stock.info.fetch({ticker: id});

  return {
    props: {
      data: {
        drugs,
        info      
      }
    }
  }

};







export default Stock;