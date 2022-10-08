// Comps
import { FX_UNIT_NUMBER } from "../../types/fxTypes"
import X32, { OnMessageFunc, IntervalReference } from "./X32"

const METER_TICK_RATE = 2
const FX_TYPE_TICK_RATE = 20
const METER_TIMING_ARS = [
  {"type" :"i", "value": 0},
  {"type" :"i", "value": 0}, 
  {"type" :"i", "value": METER_TICK_RATE}
]




export default class X32Sub extends X32 {

  setFxType (unit: FX_UNIT_NUMBER, fxType: number) {
    console.log("@setFxType", unit, fxType)
    this.request({
      address: `/fx/${unit}/type`,
      args: [
        {"type" :"i", "value": fxType}
      ],
    })
  }

  async startListenFx (onMessages: [OnMessageFunc, OnMessageFunc]): Promise<[IntervalReference, IntervalReference]> {
    return await Promise.all([
      this.formatSubscribe({
        address: "/customfxtypes",
        args: [
          {"type":"s","value":"/customfxtypes"},
          {"type": "s", "value": "/fx/1/type"},
          {"type": "s", "value": "/fx/2/type"},
          {"type": "s", "value": "/fx/3/type"},
          {"type": "s", "value": "/fx/4/type"},
          {"type": "s", "value": "/fx/5/type"},
          {"type": "s", "value": "/fx/6/type"},
          {"type": "s", "value": "/fx/7/type"},
          {"type": "s", "value": "/fx/8/type"},
          {"type" :"i", "value": 0},
          {"type" :"i", "value": 0}, 
          {"type" :"i", "value": FX_TYPE_TICK_RATE}
        ],
        onMessage: onMessages[0]
      }),
      this.batchSubscribe({
        address: "/custommeters9",
        args: [
          {"type":"s","value":"/custommeters9"},
          {"type": "s", "value": "/meters/9"},
          ...METER_TIMING_ARS,
        ],
        onMessage: onMessages[1]
      })
    ])
  }

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

