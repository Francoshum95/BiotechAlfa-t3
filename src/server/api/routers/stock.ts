import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";


export const stockRouter = createTRPCRouter({
  company: publicProcedure
    .query(({ ctx, input }) => {
      return ctx.prisma.equity.findMany({
          select: {
            ticker: true,
            name: true
          }
        })
    }),
  info: publicProcedure
    .input(z.object({ticker: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.equity.findFirst({
          where: {
            ticker: input.ticker
          },        
          select: {
            ticker: true,
            name: true,
            equity_info: {
              select: {
                business: true,
                website: true,
              }
            }
          }
        })
    }),
  
  search: publicProcedure
    .input(z.object({ search: z.string() }))
    .query(async({ ctx, input }) => {

      const newData: {
        ticker: string,
        name: string
      }[] = []
      const data = await ctx.prisma.equity.findMany({
        where: {
          OR: [
            {
              ticker:  { contains: input.search } 
            },
            {
              name: { contains: input.search}
            },
            {
              equity_drug: {
                some: {
                  drug: {
                    drug_indicaiton_drug: {
                      some: {
                        drug_indication: {
                          indication: {
                            in: input.search
                          }
                        }
                      }
                    }
                  }
                }

              }
            },
            {
              equity_drug: {
                some: {
                  drug: {
                    drug_mechanism_drug: {
                      some: {
                        drug_mechanism:{
                          mechanism: {
                            in: input.search
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            {
              equity_drug: {
                some: {
                  drug: {
                    drug_name_drug: {
                      some: {
                        drug_name: {
                          name: {
                            in: input.search
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            {
              equity_drug: {
                some: {
                  drug: {
                    drug_type_drug: {
                      some: {
                        drug_type: {
                          type: input.search
                        }
                      }
                    }
                  }
                }
              }
            }
          ]
        },
        select: {
          equity_drug: {
            select: {
              equity: {
                select: {
                  ticker: true,
                  name: true
                }
              }
            }
          }
        }     
       })
      
      const hashSet = new Set()

      data.forEach(item => {
        if (item.equity_drug){
          item.equity_drug.forEach(company => {
          if (company.equity && 
            company.equity.name && 
            company.equity.ticker && 
            !hashSet.has(company.equity.ticker)){

              hashSet.add(company.equity.ticker)
              newData.push({
                ticker: company.equity.ticker,
                name: company.equity.name
              })
            }
          });
        }
      })

       return newData
      
    })
});
