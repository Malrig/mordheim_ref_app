import { Metadata, SourceStatus } from "./metadata"
import { Skill } from "./skills"

export enum WeaponType {
  Melee,
  RangedNormal,
  RangedBlackpowder,
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

interface Item extends Metadata {
  name: string
  description: string
  availability: Availability
  price: string
}

export interface Weapon extends Item {
  range: string
  strength: string
  special_rules: string[] // List of IDs of special rules they relate to.
  weapon_type: WeaponType
}

export interface Armour extends Item { }
export interface MiscItem extends Item { }

export type Objects = Armour | MiscItem | Weapon | Skill