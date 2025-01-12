import { z } from 'zod';

export const DeliverableSectionTypeSchema = z.enum([
  'text',
  'list',
  'table',
  'metrics',
  'recommendations'
]);

export const DeliverableSectionSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: DeliverableSectionTypeSchema,
  description: z.string().optional()
});

export const DeliverableConfigSchema = z.object({
  sections: z.array(DeliverableSectionSchema),
  availableFormats: z.array(z.enum(['pdf', 'markdown', 'presentation'])),
});

export const DeliverableContentSchema = z.object({
  sections: z.record(z.object({
    type: z.string(),
    data: z.any()
  })),
  metadata: z.record(z.any()).optional()
});

export const DeliverableDataSchema = z.object({
  agentId: z.string(),
  title: z.string(),
  summary: z.string(),
  content: DeliverableContentSchema,
  createdAt: z.date()
});

// Export types
export type DeliverableSectionType = z.infer<typeof DeliverableSectionTypeSchema>;
export type DeliverableSection = z.infer<typeof DeliverableSectionSchema>;
export type DeliverableConfig = z.infer<typeof DeliverableConfigSchema>;
export type DeliverableContent = z.infer<typeof DeliverableContentSchema>;
export type DeliverableData = z.infer<typeof DeliverableDataSchema>; 