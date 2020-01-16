import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ServerSentEventService} from '../../_services/server-sent-event.service';
import {Subscription} from 'rxjs';
import {isDefined} from '../../_class/common';
import * as d3 from 'd3/dist/d3.min';
import {MeterReading} from '../../_models/meter-reading.model';

@Component({
  selector: 'app-substation-visualization',
  templateUrl: './substation-visualization.component.html',
  styleUrls: ['./substation-visualization.component.scss']
})
export class SubstationVisualizationComponent implements OnInit, AfterViewInit, OnDestroy {

  public _subscriptions: Subscription[] = [];
  private _meterReading: MeterReading;
  public temperature01: string = '';
  public persistentColorTFR01: string = '';
  public persistentColorTFR02: string = '';

  constructor(private sseService: ServerSentEventService) { }

  private static genRect(svg: any, idName: string, width: number, height: number, bgcolor: string): void
  {
    svg.append("rect")
       .attr("id", idName)
       .attr("height", height)
       .attr("width", width)
       .attr("rx", 5)
       .attr("ry", 5)
       .attr("fill", bgcolor);
  }

  private static genCircle(svg: any, idName: string, cx: number, cy: number, radius: number, outlineColor: string, bgcolor: string, xTranslate: number, yTranslate: number)
  {
    svg.append("circle")
       .attr("id", idName)
       .attr("cx", cx)
       .attr("cy", cy)
       .attr("r", radius)
       .attr("stroke", outlineColor)
       .attr("fill", bgcolor)
       .attr("transform", 'translate(' + xTranslate.toString() + ',' + yTranslate.toString() + ')');
  }

  convertTimestampToDate(timestamp: number)
  {
    let date = new Date(timestamp);

    let sizeTime = date.toISOString().split('T')[1].length - 5;
    return date.toISOString().split('T')[0] + ' - ' + date.toISOString().split('T')[1].substr(0, sizeTime);
  }

  updateData(meterReading: MeterReading)
  {
      let value = meterReading.externalTemperature;

      d3.select('#extTemp')
        .text("TEMPERATURE EXT: " + value + "°C");

      d3.select('#dateTFR')
        .text("Date: " + this.convertTimestampToDate(meterReading.valuesInterval.start));

      if (SubstationVisualizationComponent.getIdTransformer(this.meterReading.name) === 'TFR1')
      {
          d3.select('#power01')
            .text("P: " + meterReading.intervalBlocks[0].intervalReadings[0].value + "W");

          if (meterReading.intervalBlocks.length === 2)
          {
            d3.select('#temp01')
              .text("T: " + meterReading.intervalBlocks[1].intervalReadings[0].value + "°C");
          }
      }

      if (SubstationVisualizationComponent.getIdTransformer(this.meterReading.name) === 'TFR2')
      {
        d3.select('#power02')
          .text("P: " + meterReading.intervalBlocks[0].intervalReadings[0].value + "W");

        if (meterReading.intervalBlocks.length === 2)
        {
          d3.select('#temp02')
            .text("T: " + meterReading.intervalBlocks[1].intervalReadings[0].value + "°C");
        }
      }
  }

  updateIndicator(idTransformer: string, flag: string): void
  {
      let idIndicator: string;
      let flagList: string[] = ['Red', 'Orange', 'Green'];

      function findIndicator(flag: string): string
      {
        switch (flag) {
          case 'Red': return idIndicator = 'indicator01';
          case 'Orange': return idIndicator = 'indicator02';
          case 'Green': return idIndicator = 'indicator03';
        }
      }

      idIndicator = findIndicator(flag);

      if (flag != null)
      {
        if (idTransformer === 'TFR1')
        {
            this.persistentColorTFR01 = flag;
        }

        if (idTransformer === 'TFR2')
        {
            this.persistentColorTFR02 = flag;
        }

        d3.select('#' + idTransformer)
          .select('#' + idIndicator)
          .attr('fill', flag);

        flagList.forEach(
          (remainingflag: string) => {
            if (remainingflag !== flag)
            {
              d3.select('#' + idTransformer)
                .select('#' + findIndicator(remainingflag))
                .attr('fill', '#CCC');
            }
          }
        )
      } else {
        if (idTransformer === 'TFR1' && this.persistentColorTFR01 !== '')
        {
          d3.select('#' + idTransformer)
            .select('#' + idIndicator)
            .attr('fill', this.persistentColorTFR01);

          flagList.forEach(
            (remainingflag: string) => {
              if (remainingflag !== this.persistentColorTFR01)
              {
                d3.select('#' + idTransformer)
                  .select('#' + findIndicator(remainingflag))
                  .attr('fill', '#CCC');
              }
            }
          )
        }

        if (idTransformer === 'TFR2' && this.persistentColorTFR02 !== '')
        {
          d3.select('#' + idTransformer)
            .select('#' + idIndicator)
            .attr('fill', this.persistentColorTFR02);

          flagList.forEach(
            (remainingflag: string) => {
              if (remainingflag !== this.persistentColorTFR02)
              {
                d3.select('#' + idTransformer)
                  .select('#' + findIndicator(remainingflag))
                  .attr('fill', '#CCC');
              }
            }
          )
        }
      }


  }

  private static genIndicator(electricTransformerSelector: string, idIndicator: string): void
  {
    let svg = d3.select(electricTransformerSelector)
                .append("g")
                .attr("transform", "translate(-40, -80)")
                .attr('style', 'fill-opacity: 1');

    SubstationVisualizationComponent.genRect(svg, idIndicator, 30, 80, "#000");
    SubstationVisualizationComponent.genCircle(svg, 'indicator01', 15, 15, 10, '#000', '#CCC', 0, 0);
    SubstationVisualizationComponent.genCircle(svg, 'indicator02', 15, 15, 10, '#000', '#CCC', 0, 25);
    SubstationVisualizationComponent.genCircle(svg, 'indicator03', 15, 15, 10, '#000', '#CCC', 0, 50);
  }

  private static getIdTransformer(idName: string): string
  {
      return idName.split('_')[0];
  }

  // subscribeSSE(param)
  // {
  //   let source = new EventSource('http://localhost:9010/meter-reading/read-messages');
  //   let res;
  //   // handle messages
  //   source.onmessage = (event) => {
  //     console.log("meter Readin: ", event.data);
  //     res = JSON.parse(event.data);
  //   };
  // }

  ngOnInit(): void {
    this.subscriptions.push(
      this.sseService.observeMessages().subscribe()
    );
    // this.subscribeSSE(this.meterReading);

// console.log("meter ReadingmmM: ", this.meterReading);
    this.subscriptions.push(
      this.sseService.meterReading.subscribe(
        (res: string) => {
          if(isDefined(res))
          {
            // console.log("test", res);
            this.meterReading = JSON.parse(res);
            console.log("meterReading: ", this.meterReading.externalTemperature);
            this.temperature01 = this.meterReading.externalTemperature;
            this.updateIndicator(SubstationVisualizationComponent.getIdTransformer(this.meterReading.name), this.meterReading.alert);
            this.updateData(this.meterReading);
          }
        },
        (error: any) => console.error(error),
        () => {
          this.updateIndicator(this.meterReading.name, 'red');
        }
      )
    );
  }

  ngAfterViewInit(): void
  {
    SubstationVisualizationComponent.genIndicator('#TFR1', 'transformer01');
    SubstationVisualizationComponent.genIndicator('#TFR2', 'transformer02');
  }

  ngOnDestroy():void {
    this.subscriptions.forEach(
      (item: Subscription) => {
        if (isDefined(item)) {
          item.unsubscribe();
        }
      }
    );
  }

  get subscriptions(): Subscription[] {
    return this._subscriptions;
  }

  get meterReading(): MeterReading {
    return this._meterReading;
  }

  set meterReading(value: MeterReading) {
    this._meterReading = value;
  }
}
