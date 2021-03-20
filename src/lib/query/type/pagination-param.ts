/**
 * Definition of pagination parameters
 */
export type PaginationParam = {
  /**
   * Number of page requested
   */
  page: number;

  /**
   * Quantity of page records requested
   */
  pageSize: number;
};

/**
 * Default value for pagination parameters
 */
export const defaultPaginationParam: PaginationParam = {
  page: 1,
  pageSize: 10,
};
