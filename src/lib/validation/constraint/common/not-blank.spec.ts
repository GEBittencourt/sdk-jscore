/* eslint-disable @typescript-eslint/no-explicit-any */
import test, { ExecutionContext } from 'ava';
import { ConstraintConfiguration } from '../constraint-configuration';
import { Constraint, ListOfConstraints } from './../constraint';
import { NotBlank, NotBlankConstraint } from './not-blank';

class ConstraintClass {
  @NotBlank()
  readonly notBlankValue: string;
}

test('should add NotBlank constraint validation', (t) => {
  const constraints: ListOfConstraints = new ConstraintClass()['_constraints'];
  t.is(constraints.length, 1);
  t.true(constraints[0] instanceof NotBlankConstraint);
  const constraint: Constraint<ConstraintConfiguration> = constraints[0] as NotBlankConstraint;
  t.is(constraint.propertyKey, 'notBlankValue');
  t.deepEqual(constraint.configuration, {
    message: 'Property value must not be blank.',
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

test('target value should be invalid when empty', (t) => {
  targetValueShouldBe(t, '', false);
});

test('target value should be invalid when empty spaces', (t) => {
  targetValueShouldBe(t, '  ', false);
});

function targetValueShouldBe(
  t: ExecutionContext<any>,
  value: string,
  valid: boolean
) {
  const target = { property: value };
  const constraint: NotBlankConstraint = new NotBlankConstraint('property', {
    message: 'Must not be blank.',
  });
  t.is(constraint.validate(target), valid);
  t.is(constraint.transformMessage(), 'Must not be blank.');
}
