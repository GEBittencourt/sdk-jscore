/**
 * Represents a domain event
 */
export abstract class DomainEvent {
  /**
   * Event version
   */
  abstract eventVersion: number;
  /**
   * Event occurred on specific date
   */
  occurredOn: Date;

  constructor() {
    this.occurredOn = new Date();
  }
}
