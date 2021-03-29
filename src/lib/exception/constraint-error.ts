import { Constraint } from '../validation/constraint/constraint';
import { ConstraintConfiguration } from '../validation/constraint/constraint-configuration';

export class ConstraintError extends Error {
  readonly constraints: Constraint<ConstraintConfiguration>[];

  constructor(constraints: Constraint<ConstraintConfiguration>[]) {
    super(
      constraints
        .map(
          (constraint: Constraint<ConstraintConfiguration>) =>
            `${constraint.propertyKey}:${constraint.configuration.message}`
        )
        .join(';')
    );
    this.constraints = constraints;
  }
}
