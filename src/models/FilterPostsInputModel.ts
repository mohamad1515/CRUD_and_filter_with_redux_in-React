import { IFilterPostsInputModel } from "./interfaces";
export class FilterPostsInputModel implements IFilterPostsInputModel {
  dateRange: number[];
  objectTypes: string[];
  colors: string[];
  vehicleTypes: string[];
  from: number;
  size: number;
  constructor() {
    this.dateRange = [0, 0];
    this.objectTypes = [];
    this.colors = [];
    this.vehicleTypes = [];
    this.from = 0;
    this.size = 10;
  }
}
