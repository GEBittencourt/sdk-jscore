import { Entity } from './entity';

/**
 * Represents a domain aggregate
 */
export abstract class Aggregate<Id> extends Entity<Id> {}
