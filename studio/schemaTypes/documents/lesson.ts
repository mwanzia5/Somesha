import {defineType, defineField, defineArrayMember} from 'sanity'
import {VideoIcon} from '@sanity/icons/Video'

export const lesson = defineType({
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  icon: VideoIcon,
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
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description:
        'YouTube, Vimeo, or Bunny embed URL. Playback stays on the site via the provider embed.',
      validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'poster',
      title: 'Poster / Thumbnail',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'duration',
      title: 'Duration (seconds)',
      type: 'number',
      description: 'Video length in seconds, e.g. 573 for 09:33.',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'freePreview',
      title: 'Free preview',
      type: 'boolean',
      description: 'Label shown to learners. Not access control.',
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
      name: 'notes',
      title: 'Notes',
      type: 'array',
      of: [
        defineArrayMember({type: 'block'}),
      ],
      description: 'Rich text lesson notes rendered as Portable Text.',
    }),
    defineField({
      name: 'keyPoints',
      title: 'Key points',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'The "in this lesson you will…" list.',
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'proTip',
      title: 'Pro tip',
      type: 'string',
    }),
    defineField({
      name: 'resources',
      title: 'Resources',
      type: 'array',
      of: [defineArrayMember({type: 'resource'})],
      validation: (rule) => rule.unique(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'duration',
      media: 'poster',
    },
    prepare({title, subtitle}) {
      const duration =
        typeof subtitle === 'number'
          ? new Date(subtitle * 1000).toISOString().substring(11, 19)
          : undefined
      return {title, subtitle: duration}
    },
  },
})