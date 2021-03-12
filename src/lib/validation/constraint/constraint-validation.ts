/* eslint-disable @typescript-eslint/ban-types */
import { Constraint, ListOfConstraints } from './constraint';
import { ConstraintConfiguration } from './constraint-configuration';
import { ValidProperty } from './valid';

/**
 * Utility class that validate a object with constraints declarations
 */
export class ConstraintValidation {
  /**
   * Validate constraints declarations of object
   * @param object Object
   */
  static validate(object: Object): Constraint<ConstraintConfiguration>[] {
    const invalidConstraints: Constraint<ConstraintConfiguration>[] = [];
    const constraints: ListOfConstraints = object ? object['_constraints'] : [];
    if (constraints) {
      constraints.forEach(
        (constraint: Constraint<ConstraintConfiguration> | ValidProperty) => {
          if (constraint instanceof ValidProperty) {
            invalidConstraints.push(
              ...ConstraintValidation.validate(object[constraint.propertyKey])
            );
          } else if (!constraint.validate(object)) {
            invalidConstraints.push(constraint);
          }
        }
      );
    }
    return invalidConstraints;
  }
}
