import test from 'ava';
import { ListOfConstraints } from './constraint';
import { Valid, ValidProperty } from './valid';

class ConstraintClass {
  readonly value: string;
}

class ValidPropertyClass {
  @Valid()
  readonly constraintClass: ConstraintClass;
}

test('should mark property as Valid', (t) => {
  const constraints: ListOfConstraints = new ValidPropertyClass()[
    '_constraints'
  ];
  t.is(constraints.length, 1);
  t.true(constraints[0] instanceof ValidProperty);
  const valid: ValidProperty = constraints[0] as ValidProperty;
  t.is(valid.propertyKey, 'constraintClass');
});
