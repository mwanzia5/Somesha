import {defineType, defineField, defineArrayMember} from 'sanity'
import {BlockElementIcon} from '@sanity/icons/BlockElement'

export const module = defineType({
  name: 'module',
  title: 'Module',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'lessons',
      title: 'Lessons',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'lesson'}],
        }),
      ],
      validation: (rule) => rule.unique(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      lessons: 'lessons',
    },
    prepare({title, lessons}) {
      return {
        title,
        subtitle: `${Array.isArray(lessons) ? lessons.length : 0} lessons`,
      }
    },
  },
})