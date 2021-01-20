/* eslint-disable @typescript-eslint/ban-types */

import { BaseConstraint, ListOfConstraints } from './../constraint';
import { ConstraintConfiguration } from './../constraint-configuration';

/**
 * The declared property must not be null or undefined and must contain at least
 * one non-whitespace character.
 * @param configuration Constraint configuration
 */
export function NotBlank(
  configuration: ConstraintConfiguration = {
    message: 'Property value must not be blank.',
  }
): PropertyDecorator {
  return (target: Object, propertyKey: string): void => {
    const constraints: ListOfConstraints = target['_constraints'] || [];
    constraints.push(new NotBlankConstraint(propertyKey, configuration));
    target['_constraints'] = constraints;
  };
}

/**
 * Constraint class to validate value that must not be null or undefined and must
 * contain at least one non-whitespace character.
 */
export class NotBlankConstraint extends BaseConstraint<ConstraintConfiguration> {
  validate(object: Object): boolean {
    return object &&
      object[this.propertyKey] &&
      object[this.propertyKey].trim() !== ''
      ? true
      : false;
  }
}
