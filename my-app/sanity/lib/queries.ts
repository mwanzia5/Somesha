import 'server-only'
import {defineQuery} from 'next-sanity'
import type {QueryParams} from 'next-sanity'

import {client} from './client'

// ---------------------------------------------------------------- Catalog

export const COURSES_QUERY = defineQuery(/* groq */ `
  *[_type == "course" && defined(slug.current)] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    level,
    price,
    rating,
    popular,
    studentCount,
    coverImage,
    instructor->{ _id, name, expertise, "slug": slug.current },
    category->{ _id, title, "slug": slug.current },
    "lessonCount": count(modules[].lessons[]->_id)
  }
`)

export const COURSE_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "course" && defined(slug.current)] { "slug": slug.current }
`)

// ----------------------------------------------------------------- Course

export const COURSE_QUERY = defineQuery(/* groq */ `
  *[_type == "course" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    summary,
    level,
    price,
    rating,
    popular,
    studentCount,
    coverImage,
    outcomes[] { _key, icon, title, description },
    instructor->{ _id, name, expertise, bio, "slug": slug.current, photo },
    category->{ _id, title, "slug": slug.current },
    modules[] {
      _key,
      title,
      summary,
      "lessons": lessons[]->{
        _id,
        title,
        "slug": slug.current,
        videoUrl,
        duration,
        freePreview,
        studentCount,
        poster,
        keyPoints,
        proTip,
        resources[] { _key, type, title, description, url }
      }
    },
    "lessonCount": count(modules[].lessons[]->_id)
  }
`)

// ------------------------------------------------------------- Lessons

export const COURSE_LESSON_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "course" && defined(slug.current)] {
    "courseSlug": slug.current,
    "lessonSlugs": modules[].lessons[]->slug.current
  }
`)

// A lesson is scoped by its course route; derive the owning course via a
// reverse reference so the lesson never stores its parent course.
export const LESSON_BY_COURSE_QUERY = defineQuery(/* groq */ `
  *[_type == "lesson" && slug.current == $lessonSlug][0] {
    _id,
    title,
    "slug": slug.current,
    videoUrl,
    duration,
    freePreview,
    studentCount,
    poster,
    notes,
    keyPoints,
    proTip,
    resources[] { _key, type, title, description, url },
    "course": *[_type == "course" && slug.current == $courseSlug && references(^._id)][0] {
      _id,
      title,
      "slug": slug.current,
      modules[] {
        _key,
        title,
        summary,
        "lessons": lessons[]->{
          _id,
          title,
          "slug": slug.current,
          duration,
          freePreview
        }
      }
    }
  }
`)

export const LESSON_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "lesson" && defined(slug.current)] { "slug": slug.current }
`)

// --------------------------------------------------------- Instructors

export const INSTRUCTORS_QUERY = defineQuery(/* groq */ `
  *[_type == "instructor" && defined(slug.current)] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    expertise,
    bio,
    photo,
    "courseCount": count(*[_type == "course" && references(^._id)])
  }
`)

export const INSTRUCTOR_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "instructor" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    expertise,
    bio,
    photo,
    "courses": *[_type == "course" && references(^._id)] | order(_createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      summary,
      level,
      price,
      rating,
      popular,
      studentCount,
      coverImage,
      "lessonCount": count(modules[].lessons[]->_id)
    }
  }
`)

export const INSTRUCTOR_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "instructor" && defined(slug.current)] { "slug": slug.current }
`)

// ---------------------------------------------------------- Categories

export const CATEGORIES_QUERY = defineQuery(/* groq */ `
  *[_type == "category" && defined(slug.current)] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "courseCount": count(*[_type == "course" && references(^._id)])
  }
`)

// --------------------------------------------------------- Fetch helper

// Manual caching control for pages. Defaults to tag-free time-based
// revalidation; pass `tags` to revalidate on demand instead.
export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  revalidate = 600,
  tags = [],
}: {
  query: QueryString
  params?: QueryParams
  revalidate?: number | false
  tags?: string[]
}) {
  return client.fetch(query, params, {
    next: {
      revalidate: tags.length ? false : revalidate,
      tags,
    },
  })
}