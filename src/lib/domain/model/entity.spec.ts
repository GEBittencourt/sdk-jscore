import test from 'ava';
import { ConstraintValidation, NotNullConstraint } from '../../validation';
import { Entity } from './entity';

class EntityClass extends Entity<string> {
  value: string;

  constructor(id: string, value: string) {
    super(id);
    this.value = value;
  }
}

test('should validate id property of entity', (t) => {
  const entity = new EntityClass(null, '');
  const constraints = ConstraintValidation.validate(entity);
  t.is(constraints.length, 1);
  t.true(constraints[0] instanceof NotNullConstraint);
  const notNullConstraint: NotNullConstraint = constraints[0] as NotNullConstraint;
  t.is(notNullConstraint.propertyKey, 'id');
});
