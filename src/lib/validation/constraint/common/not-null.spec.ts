/* eslint-disable @typescript-eslint/no-explicit-any */
import test, { ExecutionContext } from 'ava';
import { ConstraintConfiguration } from '../constraint-configuration';
import { Constraint, ListOfConstraints } from './../constraint';
import { NotNull, NotNullConstraint } from './not-null';

class ConstraintClass {
  @NotNull()
  readonly notNullValue: string;
}

test('should add NotNull constraint validation', (t) => {
  const constraints: ListOfConstraints = new ConstraintClass()['_constraints'];
  t.is(constraints.length, 1);
  t.true(constraints[0] instanceof NotNullConstraint);
  const constraint: Constraint<ConstraintConfiguration> = constraints[0] as NotNullConstraint;
  t.is(constraint.propertyKey, 'notNullValue');
  t.deepEqual(constraint.configuration, {
    message: 'Property value must not be null or undefined.',
  });
});

test('target value should be valid', (t) => {
  targetValueShouldBe(t, 'valid', true);
});

test('target value should be invalid when null', (t) => {
  targetValueShouldBe(t, null, false);
});

test('target value should be invalid when undefined', (t) => {
  targetValueShouldBe(t, undefined, false);
});

function targetValueShouldBe(
  t: ExecutionContext<any>,
  value: string,
  valid: boolean
) {
  const target = { property: value };
  const constraint: NotNullConstraint = new NotNullConstraint('property', {
    message: 'Must not be null.',
  });
  t.is(constraint.validate(target), valid);
  t.is(constraint.transformMessage(), 'Must not be null.');
}
