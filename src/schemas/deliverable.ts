import { z } from 'zod';

export const DeliverableSectionTypeSchema = z.enum([
  'text',
  'list',
  'table',
  'metrics',
  'recommendations',
  'diagram'
]);

export const DeliverableSectionSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: DeliverableSectionTypeSchema,
  description: z.string().optional(),
  data: z.any()
});

export const DeliverableConfigSchema = z.object({
  sections: z.array(DeliverableSectionSchema),
  availableFormats: z.array(z.enum(['pdf', 'markdown', 'presentation'])),
});

export const DeliverableContentSchema = z.object({
  deliverableName: z.string(),
  sections: z.record(z.string(), DeliverableSectionSchema)
});

export const DeliverableDataSchema = z.object({
  deliverableId: z.string(),
  deliverableContent: DeliverableContentSchema,
});

// Export types
export type DeliverableSectionType = z.infer<typeof DeliverableSectionTypeSchema>;
export type DeliverableSection = z.infer<typeof DeliverableSectionSchema>;
export type DeliverableConfig = z.infer<typeof DeliverableConfigSchema>;
export type DeliverableContent = z.infer<typeof DeliverableContentSchema>;
export type DeliverableData = z.infer<typeof DeliverableDataSchema>; 