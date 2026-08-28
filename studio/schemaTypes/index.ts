import type {SchemaTypeDefinition} from 'sanity'
import {course} from './documents/course'
import {lesson} from './documents/lesson'
import {instructor} from './documents/instructor'
import {category} from './documents/category'
import {module} from './objects/module'
import {outcome} from './objects/outcome'
import {resource} from './objects/resource'

export const schemaTypes: SchemaTypeDefinition[] = [
  course,
  lesson,
  instructor,
  category,
  module,
  outcome,
  resource,
]