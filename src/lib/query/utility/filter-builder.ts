/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValue } from '../type/field-value';

/**
 * Builder to define a group of filter
 */
export class FilterBuilder {
  /**
   * Define a filter
   * @param filter Field/value
   */
  static where<ValueType>(filter: FieldValue<ValueType>): FilterBuilderWhere {
    return new FilterBuilderWhere(filter);
  }
}

class FilterBuilderWhere {
  private filters: FieldValue<any>[] = [];

  constructor(filter: FieldValue<any>) {
    this.filters.push(filter);
  }

  /**
   * AND a specific filter
   * @param filter Field/value
   */
  and<ValueType>(filter: FieldValue<ValueType>): FilterBuilderWhere {
    this.filters.push({ field: '{{OPERATOR}}', value: 'AND' });
    this.filters.push(filter);
    return this;
  }

  /**
   * OR a specific filter
   * @param filter Field/value
   */
  or<ValueType>(filter: FieldValue<ValueType>): FilterBuilderWhere {
    this.filters.push({ field: '{{OPERATOR}}', value: 'OR' });
    this.filters.push(filter);
    return this;
  }

  /**
   * Return all filters defined
   */
  build(): FieldValue<any>[] {
    return this.filters;
  }
}
