export interface IFilterPostsInputModel {
  dateRange: string[] | null;
  objects: string[];
  colors: string[];
  vehicles: string[];
  from: number;
  size: number;
  totalRecords: number;
}
