// Comps
import { FX_UNIT_NUMBER } from "../../types/fxTypes"
import { ADDRESS_FX_PARS_1, ADDRESS_FX_PARS_1_8, ADDRESS_FX_PARS_2, ADDRESS_FX_PARS_3, ADDRESS_FX_PARS_4, ADDRESS_FX_PARS_5, ADDRESS_FX_PARS_6, ADDRESS_FX_PARS_7, ADDRESS_FX_PARS_8, intTo2PaddedArgString } from "../generateAddresses"
import X32, { OnMessageFunc, IntervalReference } from "./X32"

const METER_TICK_RATE = 2
const FX_TYPE_TICK_RATE = 20
const FX_PARAMS_TICK_RATE = 6
const METER_TIMING_ARS = [
  {"type" :"i", "value": 0},
  {"type" :"i", "value": 0}, 
  {"type" :"i", "value": METER_TICK_RATE}
]

export default class X32Sub extends X32 {

  // This is a setter for what an fx is using
  setFxType (unit: FX_UNIT_NUMBER, fxType: number) {
    console.log("@setFxType", unit, fxType)
    this.request({
      address: `/fx/${unit}/type`,
      args: [
        {"type" :"i", "value": fxType}
      ],
    })
  }

  // This is a setter for a particular fx param
  setFxParam (unit: FX_UNIT_NUMBER, fxParamIndex: number, value: number) {
    console.log("@setFxParam", unit, fxParamIndex, value)
    this.request({
      address: `/fx/${unit}/par/${intTo2PaddedArgString(fxParamIndex)}`,
      args: [
        {"type" :"f", "value": value}
      ],
    })
  }

  async startListenFx (
    onMessages: [
      OnMessageFunc, OnMessageFunc, 
      OnMessageFunc, OnMessageFunc, 
      OnMessageFunc, OnMessageFunc,
      OnMessageFunc, OnMessageFunc,
      OnMessageFunc, OnMessageFunc
    ]): Promise<[
      IntervalReference, IntervalReference, 
      IntervalReference, IntervalReference, 
      IntervalReference, IntervalReference, 
      IntervalReference, IntervalReference, 
      IntervalReference, IntervalReference
    ]> {
    return await Promise.all([
      // {},
      {},
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
      // this.batchSubscribe({
      //   address: "/custommeters9",
      //   args: [
      //     {"type":"s","value":"/custommeters9"},
      //     {"type": "s", "value": "/meters/9"},
      //     ...METER_TIMING_ARS,
      //   ],
      //   onMessage: onMessages[1]
      // }),
      this.formatSubscribe({
        address: "/customfxargs1",
        args: [
          {"type":"s","value":"/customfxargs1"},
          ...ADDRESS_FX_PARS_1,
          {"type" :"i", "value": 0},
          {"type" :"i", "value": 0}, 
          {"type" :"i", "value": FX_PARAMS_TICK_RATE}
        ],
        onMessage: onMessages[2]
      }),
      {},
      {},
      {},
      {},
      {},
      {},
      {},
  //     this.formatSubscribe({
  //       address: "/customfxargs2",
  //       args: [
  //         {"type":"s","value":"/customfxargs2"},
  //         ...ADDRESS_FX_PARS_2,
  //         {"type" :"i", "value": 0},
  //         {"type" :"i", "value": 0}, 
  //         {"type" :"i", "value": FX_PARAMS_TICK_RATE}
  //       ],
  //       onMessage: onMessages[3]
  //     }),
  //     this.formatSubscribe({
  //       address: "/customfxargs3",
  //       args: [
  //         {"type":"s","value":"/customfxargs3"},
  //         ...ADDRESS_FX_PARS_3,
  //         {"type" :"i", "value": 0},
  //         {"type" :"i", "value": 0}, 
  //         {"type" :"i", "value": FX_PARAMS_TICK_RATE}
  //       ],
  //       onMessage: onMessages[4]
  //     }),
  //     this.formatSubscribe({
  //       address: "/customfxargs4",
  //       args: [
  //         {"type":"s","value":"/customfxargs4"},
  //         ...ADDRESS_FX_PARS_4,
  //         {"type" :"i", "value": 0},
  //         {"type" :"i", "value": 0}, 
  //         {"type" :"i", "value": FX_PARAMS_TICK_RATE}
  //       ],
  //       onMessage: onMessages[5]
  //     }),
  //     this.formatSubscribe({
  //       address: "/customfxargs5",
  //       args: [
  //         {"type":"s","value":"/customfxargs5"},
  //         ...ADDRESS_FX_PARS_5,
  //         {"type" :"i", "value": 0},
  //         {"type" :"i", "value": 0}, 
  //         {"type" :"i", "value": FX_PARAMS_TICK_RATE}
  //       ],
  //       onMessage: onMessages[6]
  //     }),
  //     this.formatSubscribe({
  //       address: "/customfxargs6",
  //       args: [
  //         {"type":"s","value":"/customfxargs6"},
  //         ...ADDRESS_FX_PARS_6,
  //         {"type" :"i", "value": 0},
  //         {"type" :"i", "value": 0}, 
  //         {"type" :"i", "value": FX_PARAMS_TICK_RATE}
  //       ],
  //       onMessage: onMessages[7]
  //     }),
  //     this.formatSubscribe({
  //       address: "/customfxargs7",
  //       args: [
  //         {"type":"s","value":"/customfxargs7"},
  //         ...ADDRESS_FX_PARS_7,
  //         {"type" :"i", "value": 0},
  //         {"type" :"i", "value": 0}, 
  //         {"type" :"i", "value": FX_PARAMS_TICK_RATE}
  //       ],
  //       onMessage: onMessages[8]
  //     }),
  //     this.formatSubscribe({
  //       address: "/customfxargs8",
  //       args: [
  //         {"type":"s","value":"/customfxargs8"},
  //         ...ADDRESS_FX_PARS_8,
  //         {"type" :"i", "value": 0},
  //         {"type" :"i", "value": 0}, 
  //         {"type" :"i", "value": FX_PARAMS_TICK_RATE}
  //       ],
  //       onMessage: onMessages[9]
  //     }),
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

