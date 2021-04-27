/* eslint-disable @typescript-eslint/no-explicit-any */
import test from 'ava';
import { FieldValue } from '../type';
import { FilterBuilder } from './filter-builder';

test('should build a simple filter', (t) => {
  // when
  const filters = FilterBuilder.where<string>({
    field: 'fieldA',
    value: 'ZZZZZ',
  }).build();

  // then
  t.is(filters.length, 1);
  t.is(filters[0].field, 'fieldA');
  t.is(filters[0].value, 'ZZZZZ');
});

test('should build a advanced filter', (t) => {
  // given
  const date = new Date();

  // when
  const filters = FilterBuilder.where<string>({
    field: 'fieldA',
    value: 'ZZZZZ',
  })
    .or<number>({
      field: 'fieldB',
      value: 10,
    })
    .and<Date>({
      field: 'fieldC',
      value: date,
    })
    .and<string>({
      field: 'fieldD',
      value: 'valueD',
    })
    .or<string>({
      field: 'fieldE',
      value: 'valueE',
    })
    .build();

  // then
  t.is(filters.length, 9);
  let stringFilters = '';
  filters.forEach((filter: FieldValue<any>) => {
    const stringValue =
      filter.value instanceof Date
        ? filter.value.toISOString()
        : `${filter.value}`;
    if (filter.field === '{{OPERATOR}}') {
      stringFilters += ` ${stringValue} `;
    } else {
      stringFilters += `${filter.field} = ${stringValue}`;
    }
  });
  t.is(
    stringFilters,
    `fieldA = ZZZZZ OR fieldB = 10 AND fieldC = ${date.toISOString()} AND fieldD = valueD OR fieldE = valueE`
  );
});
