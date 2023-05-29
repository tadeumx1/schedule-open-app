export interface ScheduleResponse {
  monday: HourDay[];
  tuesday: HourDay[];
  wednesday: HourDay[];
  thursday: HourDay[];
  friday: HourDay[];
  saturday: HourDay[];
  sunday: HourDay[];
}

export interface HourDay {
  type?: string;
  value?: number;
}
