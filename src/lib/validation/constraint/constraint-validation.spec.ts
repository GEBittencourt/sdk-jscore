import test from 'ava';
import { NotBlank, NotBlankConstraint } from './common';
import { NotNull, NotNullConstraint } from './common/not-null';
import { Constraint, ListOfConstraints } from './constraint';
import { ConstraintConfiguration } from './constraint-configuration';
import { ConstraintValidation } from './constraint-validation';
import { Valid } from './valid';

class ConstraintClass {
  @NotNull({
    message: 'ConstraintClass.notNullValue.NotNull',
  })
  readonly notNullValue: string;
  @NotBlank({
    message: 'ConstraintClass.notBlankValue.NotBlank',
  })
  readonly notBlankValue: string;
  constructor(notNullValue: string, notBlankValue: string) {
    this.notNullValue = notNullValue;
    this.notBlankValue = notBlankValue;
  }
}

class ValidPropertyClass {
  @NotNull({
    message: 'ValidPropertyClass.notNullValue.NotNull',
  })
  readonly notNullValue: string;
  @NotBlank({
    message: 'ValidPropertyClass.notBlankValue.NotBlank',
  })
  readonly notBlankValue: string;
  @Valid()
  readonly constraintClass: ConstraintClass;
  constructor(
    notNullValue: string,
    notBlankValue: string,
    constraintClass: ConstraintClass
  ) {
    this.notNullValue = notNullValue;
    this.notBlankValue = notBlankValue;
    this.constraintClass = constraintClass;
  }
}

test('should validate class', (t) => {
  const invalidConstraints: ListOfConstraints = ConstraintValidation.validate(
    new ValidPropertyClass(
      null,
      'valid',
      new ConstraintClass('valid', undefined)
    )
  );
  t.is(invalidConstraints.length, 2);
  const notNullConstraint = invalidConstraints[0] as Constraint<ConstraintConfiguration>;
  const notBlankConstraint = invalidConstraints[1] as Constraint<ConstraintConfiguration>;
  t.true(notNullConstraint instanceof NotNullConstraint);
  t.is(
    notNullConstraint.transformMessage(),
    'ValidPropertyClass.notNullValue.NotNull'
  );
  t.is(notNullConstraint.propertyKey, 'notNullValue');
  t.true(notBlankConstraint instanceof NotBlankConstraint);
  t.is(
    notBlankConstraint.transformMessage(),
    'ConstraintClass.notBlankValue.NotBlank'
  );
  t.is(notBlankConstraint.propertyKey, 'notBlankValue');
});

test('should validate object without decorators', (t) => {
  const invalidConstraints: ListOfConstraints = ConstraintValidation.validate({
    property: '',
  });
  t.is(invalidConstraints.length, 0);
});

test('should validate undefined object', (t) => {
  const invalidConstraints: ListOfConstraints = ConstraintValidation.validate(
    undefined
  );
  t.is(invalidConstraints.length, 0);
});
