import { NotNull, Valid } from '../../validation';

/**
 * Represents a domain entity with identity
 */
export abstract class Entity<Id> {
  @Valid()
  @NotNull({
    message: 'Entity.id.NotNull',
  })
  /**
   * Identity of entity. Contains a NotNull validator.
   */
  id: Id;

  constructor(id: Id) {
    this.id = id;
  }
}
