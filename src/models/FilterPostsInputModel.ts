import { IFilterPostsInputModel } from "./interfaces";
export class FilterPostsInputModel implements IFilterPostsInputModel {
  dateRange: string[] | null;
  objects: string[];
  colors: string[];
  vehicles: string[];
  from: number;
  size: number;
  totalRecords: number;
  constructor() {
    this.dateRange = null;
    this.objects = [];
    this.colors = [];
    this.vehicles = [];
    this.from = 0;
    this.size = 10;
    this.totalRecords = 0;
  }
}
