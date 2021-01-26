import test from 'ava';
import { DomainEvent } from './domain-event';

class DomainEventClass extends DomainEvent {
  eventVersion = 1;
  value: string;

  constructor(value: string) {
    super();
    this.value = value;
  }
}

test('should create domain event', (t) => {
  const domainEvent = new DomainEventClass('value');
  t.is(domainEvent.value, 'value');
  t.is(domainEvent.eventVersion, 1);
  t.assert(domainEvent.occurredOn);
});
