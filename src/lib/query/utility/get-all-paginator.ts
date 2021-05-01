/* eslint-disable @typescript-eslint/no-explicit-any */

import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { GetAllPaginationService } from '../interface/get-all-pagination-service';
import { FieldValue } from '../type';
import { GetAllResponse } from '../type/get-all-response';

export class GetAllPaginator<Entity> {
  static of<Entity>(
    service: GetAllPaginationService<Entity>,
    page = 1,
    pageSize = 10
  ): GetAllPaginator<Entity> {
    return new GetAllPaginator(service, page, pageSize);
  }

  readonly itemsObservable: BehaviorSubject<Entity[]> = new BehaviorSubject(
    this.items
  );

  readonly loadingObservable: BehaviorSubject<boolean> = new BehaviorSubject(
    true
  );

  readonly filters: FieldValue<any>[] = [];
  readonly orderBy: Set<string> = new Set();

  private pageValue: number;
  get page(): number {
    return this.pageValue;
  }

  private pageSizeValue: number;
  get pageSize(): number {
    return this.pageSizeValue;
  }

  private itemsValue: Entity[] = [];
  get items(): Entity[] {
    return this.itemsValue;
  }

  private hasNextValue: boolean | undefined;
  get hasNext(): boolean | undefined {
    return this.hasNextValue;
  }

  private lengthValue: number | undefined;
  get length(): number | undefined {
    return this.lengthValue;
  }

  private constructor(
    private readonly service: GetAllPaginationService<Entity>,
    page = 1,
    pageSize = 10
  ) {
    this.pageValue = page;
    this.pageSizeValue = pageSize;
  }

  getAll(): Observable<GetAllResponse<Entity>> {
    this.pageValue = 1;
    this.itemsValue = [];
    return this.search();
  }

  more(): Observable<GetAllResponse<Entity>> | void {
    if (this.hasNext) {
      this.pageValue++;
      return this.search();
    }
  }

  deleteItem(index: number): void {
    this.itemsValue.splice(index, 1);
    this.itemsObservable.next(this.items);
    this.lengthValue = this.lengthValue ? this.lengthValue - 1 : 0;
  }

  clearFilter(): void {
    this.filters.splice(0, this.filters.length);
  }

  private search(): Observable<GetAllResponse<Entity>> {
    return new Observable((observ: Subscriber<GetAllResponse<Entity>>) => {
      this.service.getAllPagination(this, this.filters, this.orderBy).subscribe(
        (response: GetAllResponse<Entity>) => {
          this.itemsValue.push(...response.items);
          this.itemsObservable.next(this.items);
          this.loadingObservable.next(false);
          this.hasNextValue = response.hasNext;
          this.lengthValue = response.length;

          observ.next(response);
          observ.complete();
        },
        (error: any) => {
          this.loadingObservable.next(false);

          observ.error(error);
        }
      );
    });
  }
}
