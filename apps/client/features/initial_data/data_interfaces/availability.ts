import { RestrictionType } from '@/features/datastore/enums';

export interface Restriction {
  restriction_type: RestrictionType;
  restriction: string;
}

export interface Availability {
  id: string;
  rarity: number;
  // If empty available to all, otherwise available to anyone that meets _any_
  // of the restrictions. Will want to use the Restriction interface above later.
  restrictions: Restriction[];
}
