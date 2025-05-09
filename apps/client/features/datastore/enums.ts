export enum RestrictionType {
  Warband = 'WARBAND',
  WarbandGroup = 'WARBAND_GROUP',
  Unit = 'UNIT',
  Setting = 'SETTING',
  Artifact = 'ARTIFACT',
}

export enum ItemType {
  Weapon = 'WEAPON',
  MiscItem = 'MISC_ITEM',
  Armour = 'ARMOUR',
  // Possibly break things down further, e.g. herbs & potions, vehicles, etc.
}

export enum WeaponType {
  Melee = 'MELEE',
  Ranged = 'RANGED',
  Blackpowder = 'BLACKPOWDER',
}
