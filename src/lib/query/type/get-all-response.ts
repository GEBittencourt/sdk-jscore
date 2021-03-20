/**
 * Definition of get all response
 */
export type GetAllResponse<DTO> = {
  /**
   * List of DTO (Data transfer object)
   */
  items: DTO[];

  /**
   * Show if next page exists
   */
  hasNext: boolean;

  /**
   * Number of page returned
   */
  page: number;

  /**
   * Quantity of page records requested
   */
  pageSize: number;

  /**
   * Total existing data
   */
  length?: number;
};
