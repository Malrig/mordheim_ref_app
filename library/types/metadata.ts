export enum SourceStatus {
  Unknown,
  Accepted,
  HomebrewOriginal,
  HomebrewEdited,
}

// Define a TS type for the data we'll be using
export interface Metadata {
  id?: string // If ID is not initialised then the object has not been submitted to the state yet.
  favourite: boolean
  source: string
  source_type: SourceStatus  
}