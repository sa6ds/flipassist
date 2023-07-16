import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const productsRouter = createTRPCRouter({
  listofproducts: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany();
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        purchasePrice: z.number(),
        status: z.string(),
        purchaseDate: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const product = await ctx.prisma.product.create({
        data: {
          ...input,
          id: ctx.session.user.id,
        },
      });
      return product;
    }),
});
