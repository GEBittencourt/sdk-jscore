/* eslint-disable @typescript-eslint/ban-types */
import { ListOfConstraints } from './../constraint';

/**
 * Marks a complex property for validation cascading.
 */
export function Valid(): PropertyDecorator {
  return (target: Object, propertyKey: string): void => {
    const constraints: ListOfConstraints = target['_constraints'] || [];
    constraints.push(new ValidProperty(propertyKey));
    target['_constraints'] = constraints;
  };
}

/**
 * Class that identify a complex property for validation cascading.
 */
export class ValidProperty {
  constructor(public readonly propertyKey: string) {}
}
