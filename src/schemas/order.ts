import { z } from 'zod';

export const OrderBaseSchema = z.object({
  agentId: z.string(),
  instructions: z.string().min(10, "Please provide detailed instructions"),
});