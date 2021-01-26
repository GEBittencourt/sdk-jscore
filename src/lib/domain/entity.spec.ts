import test from 'ava';
import { ConstraintValidation, NotBlankConstraint } from '../validation';
import { Entity } from './entity';

class EntityClass extends Entity {
  value: string;

  constructor(id: string, value: string) {
    super(id);
    this.value = value;
  }
}

test('should validate id property of entity', (t) => {
  const entity = new EntityClass(' ', '');
  const constraints = ConstraintValidation.validate(entity);
  t.is(constraints.length, 1);
  t.true(constraints[0] instanceof NotBlankConstraint);
  const notBlankConstraint: NotBlankConstraint = constraints[0] as NotBlankConstraint;
  t.is(notBlankConstraint.propertyKey, 'id');
});
