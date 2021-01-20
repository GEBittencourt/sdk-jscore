/* eslint-disable @typescript-eslint/ban-types */

import { BaseConstraint, ListOfConstraints } from './../constraint';
import { ConstraintConfiguration } from './../constraint-configuration';

/**
 * The declared property must not be null or undefined.
 * @param configuration Constraint configuration
 */
export function NotNull(
  configuration: ConstraintConfiguration = {
    message: 'Property value must not be null or undefined.',
  }
): PropertyDecorator {
  return (target: Object, propertyKey: string): void => {
    const constraints: ListOfConstraints = target['_constraints'] || [];
    constraints.push(new NotNullConstraint(propertyKey, configuration));
    target['_constraints'] = constraints;
  };
}

/**
 * Constraint class to validate value that must not be null or undefined.
 */
export class NotNullConstraint extends BaseConstraint<ConstraintConfiguration> {
  validate(object: Object): boolean {
    return object && object[this.propertyKey] ? true : false;
  }
}
