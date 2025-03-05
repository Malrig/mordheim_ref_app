import { Metadata, SourceStatus } from "./metadata"

export enum ItemType {
  WeaponMelee,
  WeaponRanged,
  Armour,
  Equipment,
}

export enum RestrictionType {
  Warband,
  WarbandGroup,
  Unit,
  Setting,
}

export interface Restriction {
  restriction_type: RestrictionType,
  restriction: string
}

export interface Availability {
  rarity: number | null
  // If empty available to all, otherwise available to anyone that meets _any_
  // of the restrictions. Will want to use the Restriction interface above later.
  restrictions: string[]
}

export interface SpecialRule {
  id?: string
  name: string
  description: string
}

// Define a TS type for the data we'll be using

export interface Item extends Metadata {
  name: string
  description: string
  availability: Availability
  price: string // Will want to change this later to a string
  type: ItemType
}

export interface Weapon extends Item {
  range: string
  strength: string
  special_rules: SpecialRule[]
}

