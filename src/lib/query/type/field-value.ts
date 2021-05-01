/**
 * Definition of specific filter with 'field' and 'value'
 */
export type FieldValue<ValueType> = {
  /**
   * Entity field
   */
  field: string;
  /**
   * Filter value
   */
  value: ValueType;
  /**
   * Operador de igualdade
   */
  operator?: 'eq' | 'contains';
};
