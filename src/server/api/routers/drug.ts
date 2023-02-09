import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

const select = {
  drug: {
    select: {
      id: true,
      drug_indicaiton_drug: {
        select: {
          drug_indication: {
            select: {
              indication: true
            }
          },
          drug_phase: {
            select: {
              phase: true
            }
          }
        }
      },
      drug_mechanism_drug: {
        select: {
          drug_mechanism: {
            select: {
              mechanism: true
            }
          }
        }
      },
      drug_type_drug: {
        select: {
          drug_type: {
            select: {
              type: true
            }
          }
        }
      },
      drug_name_drug: {
        select:{
          drug_name: {
            select: {
              name: true 
            }
          }
        }
      }
    }, 
  }
}


export const drugRouter = createTRPCRouter({
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
      
    }),

    info: publicProcedure
    .input(z.object({ticker: z.string()}))
    .query(({ ctx, input }) => { 
      return  ctx.prisma.equity_drug.findMany({
        where: {
          equity: {
            ticker: input.ticker
          }
        },
        select,
      })
    }),
    phase: publicProcedure
    .query(({ctx}) => {
      return ctx.prisma.drug_phase.findMany({
        select: {
          phase: true
        }
      })
    }),
  }
);
