import { Availability } from "./availability"
import { Metadata } from "./metadata"

// Define a TS type for the data we'll be using

export interface SkillGroup {
  id: string
  name: string
  availability: Availability[]
}

export interface Skill extends Metadata {
  name: string
  description: string
  group_id: string
}
