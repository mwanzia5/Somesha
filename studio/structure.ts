import type {StructureResolver} from 'sanity/structure'
import {BookIcon} from '@sanity/icons/Book'
import {TagIcon} from '@sanity/icons/Tag'
import {UserIcon} from '@sanity/icons/User'
import {VideoIcon} from '@sanity/icons/Video'

// Order content by how editors work: courses first, then the building blocks.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Courses')
        .icon(BookIcon)
        .child(S.documentTypeList('course').title('Courses')),
      S.divider(),
      S.listItem()
        .title('Lessons')
        .icon(VideoIcon)
        .child(S.documentTypeList('lesson').title('Lessons')),
      S.listItem()
        .title('Instructors')
        .icon(UserIcon)
        .child(S.documentTypeList('instructor').title('Instructors')),
      S.listItem()
        .title('Categories')
        .icon(TagIcon)
        .child(S.documentTypeList('category').title('Categories')),
    ])