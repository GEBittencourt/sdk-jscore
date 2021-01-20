/* eslint-disable @typescript-eslint/ban-types */
import { ConstraintConfiguration } from './constraint-configuration';
import { ValidProperty } from './valid';

/**
 * Base decorator type for constraint
 */
export type ConstraintDecorator = (
  configuration?: ConstraintConfiguration
) => PropertyDecorator;

/**
 * List of object constraints
 */
export type ListOfConstraints = (
  | Constraint<ConstraintConfiguration>
  | ValidProperty
)[];

/**
 * Define a constraint
 */
export interface Constraint<ConfigurationType extends ConstraintConfiguration> {
  /**
   * Constraint configuration
   */
  configuration: ConfigurationType;
  /**
   * Property key
   */
  propertyKey: string;
  /**
   * Validate a value
   * @param object Object
   */
  validate(object: Object): boolean;
  /**
   * Transform a message adding constraint parameters
   * @param message Message
   */
  transformMessage(message?: string): string;
}

/**
 * Define a base constraint
 */
export abstract class BaseConstraint<
  ConfigurationType extends ConstraintConfiguration
> implements Constraint<ConfigurationType> {
  constructor(
    public readonly propertyKey: string,
    public readonly configuration: ConfigurationType
  ) {}
  abstract validate(object: Object): boolean;
  transformMessage(message = this.configuration.message): string {
    return message;
  }
}
