/* eslint-disable @typescript-eslint/no-explicit-any */

import { Observable } from 'rxjs';
import { FieldValue } from '../type/field-value';
import { GetAllResponse } from '../type/get-all-response';
import { PaginationParam } from '../type/pagination-param';

export interface GetAllPaginationService<Entity> {
  getAllPagination(
    paginationParam: PaginationParam,
    filters?: FieldValue<any>[],
    orderBy?: Set<string>
  ): Observable<GetAllResponse<Entity>>;
}
