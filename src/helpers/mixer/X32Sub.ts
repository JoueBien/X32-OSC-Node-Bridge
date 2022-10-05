// Comps
import X32, { OnMessageFunc, IntervalReference } from "./X32"

const METER_TICK_RATE = 2
const UI_TICK_RATE = 1000/60

const METER_TIMING_ARS = [
  {"type" :"i", "value": 0},
  {"type" :"i", "value": 0}, 
  {"type" :"i", "value": METER_TICK_RATE}
]


export default class X32Sub extends X32 {
  async startListenMeters(
    onMessages: [OnMessageFunc, OnMessageFunc, OnMessageFunc, OnMessageFunc]
  ): Promise<[IntervalReference,IntervalReference,IntervalReference,IntervalReference]> {

    return await Promise.all([
      this.batchSubscribe({
        address: "/custommeters1",
        args: [
          {"type":"s","value":"/custommeters1"},
          {"type": "s", "value": "/meters/1"},
          ...METER_TIMING_ARS,
        ],
        onMessage: onMessages[0]
      }),
      this.batchSubscribe({
        address: "/custommeters2",
        args: [
          {"type":"s","value":"/custommeters2"},
          {"type": "s", "value": "/meters/2"},
          ...METER_TIMING_ARS,
        ],
        onMessage: onMessages[1]
      }),
      this.batchSubscribe({
        address: "/custommeters3",
        args: [
          {"type":"s","value":"/custommeters3"},
          {"type": "s", "value": "/meters/3"},
          ...METER_TIMING_ARS,
        ],
        onMessage: onMessages[2]
      }),
      this.batchSubscribe({
        address: "/custommeters9",
        args: [
          {"type":"s","value":"/custommeters9"},
          {"type": "s", "value": "/meters/9"},
          ...METER_TIMING_ARS,
        ],
        onMessage: onMessages[3]
      })
    ])


  }
}

