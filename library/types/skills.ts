import { Metadata } from "./metadata"

// Define a TS type for the data we'll be using

export interface Skill extends Metadata {
  name: string
  description: string
  group: string
}
