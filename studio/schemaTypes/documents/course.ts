import {defineType, defineField, defineArrayMember} from 'sanity'
import {BookIcon} from '@sanity/icons/Book'

export const course = defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'level',
      title: 'Level',
      type: 'string',
      options: {
        list: [
          {title: 'Beginner', value: 'Beginner'},
          {title: 'Intermediate', value: 'Intermediate'},
          {title: 'Advanced', value: 'Advanced'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      description: 'Whole dollars. Display formatting is handled by the app.',
      validation: (rule) => rule.min(0),
      initialValue: 0,
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: '0–5 scale for display, e.g. 4.8.',
      validation: (rule) => rule.min(0).max(5),
    }),
    defineField({
      name: 'popular',
      title: 'Popular',
      type: 'boolean',
      description: 'Mark to surface a "Popular" badge.',
      initialValue: false,
    }),
    defineField({
      name: 'studentCount',
      title: 'Student count',
      type: 'number',
      description: 'For display only.',
      initialValue: 0,
    }),
    defineField({
      name: 'outcomes',
      title: 'What you will learn',
      type: 'array',
      of: [defineArrayMember({type: 'outcome'})],
      description: 'A short list of learning outcomes.',
    }),
    defineField({
      name: 'instructor',
      title: 'Instructor',
      type: 'reference',
      to: [{type: 'instructor'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'modules',
      title: 'Modules',
      type: 'array',
      of: [defineArrayMember({type: 'module'})],
      description:
        'Ordered modules. The module number shown in the UI is derived from this order.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'level',
      media: 'coverImage',
    },
  },
})