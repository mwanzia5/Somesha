import {defineType, defineField, defineArrayMember} from 'sanity'

export const outcome = defineType({
  name: 'outcome',
  title: 'Learning Outcome',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          {title: 'Zap', value: 'zap'},
          {title: 'Layers', value: 'layers'},
          {title: 'Chart', value: 'chart'},
          {title: 'Focus', value: 'focus'},
        ],
        layout: 'radio',
      },
      initialValue: 'zap',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})