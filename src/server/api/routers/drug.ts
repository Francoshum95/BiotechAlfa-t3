import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";


export const drugRouter = createTRPCRouter({
  search: publicProcedure
    .input(z.object({ search: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.equity.findMany({
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
        }     
       })
    }),
    info: publicProcedure
    .input(z.object({skip: z.number()}))
    .query(({ ctx, input }) => {
      return ctx.prisma.equity_drug.findMany({
        skip: input.skip,
        take: 10,
        select: {
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
          },
          equity: {
            select: {
              ticker: true,
              name: true
            }
          }
        },
      })
    })
  }
);
