// Libs
import { paddedNumber } from "../shared/helpers/oscCast"

/**
 * /-stat/solosw may not be correct
 * levels for /meters/6 may not be correct
 */

export type BlockCommandSet = {
  name: string
  color: string
  fader: string
  solo: string
  mute: string
  levels: number
}

type BlockCommandSet72 = [
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  BlockCommandSet,
  // 70
  BlockCommandSet,
  BlockCommandSet,
]

const blockCommandSet72: BlockCommandSet72 = [
  // 1-32 Channels
  ...[...new Array(32)].map((value, index) => {
    const id = index + 1
    const paddedId = paddedNumber(id)
    const zeroIndexedId = id
    const solosw = paddedNumber(zeroIndexedId) // 0 -71
    return {
      name: `/ch/${paddedId}/config/name`,
      color: `/ch/${paddedId}/config/color`,
      fader: `/ch/${paddedId}/mix/fader`,
      solo: `/-stat/solosw/${solosw}`,
      mute: `/ch/${paddedId}/mix/on`,
      levels: zeroIndexedId, // `/meters/6`
    }
  }),
  // 8 Aux ins
  ...[...new Array(8)].map((value, index) => {
    const id = index + 1
    const paddedId = paddedNumber(id)
    const zeroIndexedId = id + 32
    const solosw = paddedNumber(zeroIndexedId) // 0 -71
    return {
      name: `/auxin/${paddedId}/config/name`,
      color: `/auxin/${paddedId}/config/color`,
      fader: `/auxin/${paddedId}/mix/fader`,
      solo: `/-stat/solosw/${solosw}`,
      mute: `/auxin/${id}/mix/on`,
      levels: zeroIndexedId, // `/meters/6` // 0 -71
    }
  }),
  // 8 Fx Returns
  ...[...new Array(8)].map((value, index) => {
    const _id = index + 1 + 32 + 8
    const id = paddedNumber(_id)
    const solosw = paddedNumber(_id)
    const levelArg = _id
    return {
      name: `/fxrtn/${id}/config/name`,
      color: `/fxrtn/${id}/config/color`,
      fader: `/fxrtn/${id}/mix/fader`,
      solo: `/-stat/solosw/${solosw}`,
      mute: `/fxrtn/${id}/mix/on`,
      levels: levelArg, //`/meters/6`
    }
  }),
  // 16 Busses
  ...[...new Array(16)].map((value, index) => {
    const _id = index + 1 + 32 + 8 + 8
    const id = paddedNumber(_id)
    const solosw = paddedNumber(_id)
    const levelArg = _id
    return {
      name: `/bus/${id}/config/name`,
      color: `/bus/${id}/config/color`,
      fader: `/bus/${id}/mix/fader`,
      solo: `/-stat/solosw/${solosw}`,
      mute: `/bus/${id}/mix/on`,
      levels: levelArg, //`/meters/6`
    }
  }),
  // 16 Mix Busses
  ...[...new Array(6)].map((value, index) => {
    const _id = index + 1 + 32 + 8 + 8 + 16
    const id = paddedNumber(_id)
    const solosw = paddedNumber(_id)
    const levelArg = _id
    return {
      name: `/bus/${id}/config/name`,
      color: `/bus/${id}/config/color`,
      fader: `/bus/${id}/mix/fader`,
      solo: `/-stat/solosw/${solosw}`,
      mute: `/bus/${id}/mix/on`,
      levels: levelArg, //`/meters/6`
    }
  }),
  {
    name: `/main/st/config/name`,
    color: `/main/st/config/color`,
    fader: `/main/st/mix/fader`,
    solo: `/-stat/solosw/71`,
    mute: `/main/st/mix/on`,
    levels: 70, //`/meters/6`
  },
  {
    name: `/main/m/config/name`,
    color: `/main/m/config/color`,
    fader: `/main/m/mix/fader`,
    solo: `/-stat/solosw/72`,
    mute: `/main/m/mix/on`,
    levels: 72, //`/meters/6`
  },
] as BlockCommandSet72

export default blockCommandSet72
