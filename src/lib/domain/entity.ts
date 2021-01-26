import { NotBlank } from '../validation';

/**
 * Represents a domain entity with identity
 */
export abstract class Entity {
  @NotBlank({
    message: 'Entity.id.NotBlank',
  })
  /**
   * Identity of entity. Contains a NotBlank validator.
   */
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
