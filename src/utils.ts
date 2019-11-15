import { ColumnOption } from './types';
import kbn from 'grafana/app/core/utils/kbn';
import { ReducerID } from '@grafana/data';

export class ColumnSetting implements ColumnOption {
  public static copyWith(
    option: ColumnSetting,
    column?: string,
    type?: ReducerID,
    unit?: string,
    delimiter?: number,
    filterable?: boolean
  ): ColumnOption {
    return new ColumnSetting(
      type || option.type,
      column || option.type,
      unit || option.unit,
      delimiter || option.delimiter,
      filterable || option.filterable
    );
  }

  public type;
  public column?;
  public unit?;
  public delimiter?;
  public filterable?;

  constructor(type: ReducerID, column?: string, unit?: string, delimiter?: number, filterable?: boolean) {
    this.type = type;
    this.column = column;
    this.unit = unit;
    this.delimiter = delimiter;
    this.filterable = filterable;
  }
}

let formats;

export function loadFormats() {
  if (!formats) {
    formats = kbn.getUnitFormats().map(({ text, submenu }) => ({
      label: text,
      options: submenu.map(({ text: label, value }) => ({ value, label })),
    }));
  }

  return formats;
}