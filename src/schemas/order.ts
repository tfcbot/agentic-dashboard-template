import { z } from 'zod';
import { PackageTypeKeySchema } from '@/schemas/agent';

export const OrderBaseSchema = z.object({
  agentId: z.string(),
  packageType: PackageTypeKeySchema,
  instructions: z.string().min(10, "Please provide detailed instructions"),
});