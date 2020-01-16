export class ReadingType
{
  private _measuringPeriod: string;
  private _measuringKind: string;
  private _multiplier: string;
  private _unit: string;
  private _name: string;
  private _mRid: string;

  constructor(){}

  get measuringPeriod(): string {
    return this._measuringPeriod;
  }

  set measuringPeriod(value: string) {
    this._measuringPeriod = value;
  }

  get measuringKind(): string {
    return this._measuringKind;
  }

  set measuringKind(value: string) {
    this._measuringKind = value;
  }

  get multiplier(): string {
    return this._multiplier;
  }

  set multiplier(value: string) {
    this._multiplier = value;
  }

  get unit(): string {
    return this._unit;
  }

  set unit(value: string) {
    this._unit = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get mRid(): string {
    return this._mRid;
  }

  set mRid(value: string) {
    this._mRid = value;
  }
}

export class IntervalReadings
{
  private _value: string;
  private _timeStamp: number;

  constructor(){}

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }

  get timeStamp(): number {
    return this._timeStamp;
  }

  set timeStamp(value: number) {
    this._timeStamp = value;
  }
}

export class IntervalBlocks
{
  private _readingType: ReadingType;
  private _intervalReadings: IntervalReadings[];

  constructor(){}

  get readingType(): ReadingType {
    return this._readingType;
  }

  set readingType(value: ReadingType) {
    this._readingType = value;
  }

  get intervalReadings(): IntervalReadings[] {
    return this._intervalReadings;
  }

  set intervalReadings(value: IntervalReadings[]) {
    this._intervalReadings = value;
  }


}

export class ValuesInterval
{
  private _start: number;
  private _end: number;

  constructor(){}

  get start(): number {
    return this._start;
  }

  set start(value: number) {
    this._start = value;
  }

  get end(): number {
    return this._end;
  }

  set end(value: number) {
    this._end = value;
  }
}

export class UsagePoint
{
  private _mRid: string;

  constructor(){}

  get mRid(): string {
    return this._mRid;
  }

  set mRid(value: string) {
    this._mRid = value;
  }
}

export class MeterReading
{
  private _valuesInterval: ValuesInterval;
  private _mRid: string;
  private _name: string;
  private _alert: string;
  private _externalTemperature: string;
  private _usagePoint: UsagePoint;
  private _intervalBlocks: IntervalBlocks[];

  constructor(){}

  get valuesInterval(): ValuesInterval {
    return this._valuesInterval;
  }

  set valuesInterval(value: ValuesInterval) {
    this._valuesInterval = value;
  }

  get mRid(): string {
    return this._mRid;
  }

  set mRid(value: string) {
    this._mRid = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get usagePoint(): UsagePoint {
    return this._usagePoint;
  }

  set usagePoint(value: UsagePoint) {
    this._usagePoint = value;
  }

  get intervalBlocks(): IntervalBlocks[] {
    return this._intervalBlocks;
  }

  set intervalBlocks(value: IntervalBlocks[]) {
    this._intervalBlocks = value;
  }

  get alert(): string {
    return this._alert;
  }

  set alert(value: string) {
    this._alert = value;
  }

  get externalTemperature(): string {
    return this._externalTemperature;
  }

  set externalTemperature(value: string) {
    this._externalTemperature = value;
  }
}
