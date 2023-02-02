import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const stockRouter = createTRPCRouter({
  companny: publicProcedure
    .input(z.object({ ticker: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.equity.findMany({
          where: {
            ticker: input.ticker
          },
          select: {
            equity_info:true,
            equity_drug: {
              select: {
                drug: {
                  select: {
                    drug_indicaiton_drug: {
                      select: {
                        drug_indication: true
                      }
                    },
                    drug_name_drug: {
                      select: {
                        drug_name: true
                      }
                    },
                    drug_mechanism_drug: {
                      select: {
                        drug_mechanism: true
                      }
                    },
                    drug_news: true,
                    drug_type_drug: {
                      select: {
                        drug_type: true
                      }
                    }
                  }
                }
              }
            }
          }
        })
    }),
  info: publicProcedure
    .query(({ctx}) => {
      return ctx.prisma.equity.findMany({
        select: {
          ticker: true,
          name: true
        }
      });
    })
});
