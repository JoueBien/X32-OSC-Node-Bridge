// Pad numbers under 10 with a 0
export function intTo2PaddedArgString(num: number) {
  return num < 10 ? `0${num}` : `${num}`
}

// Generate get param sets - so we only do this once
const ADDRESS_FX_PARS_BASE = new Array(64).fill(0)

export const ADDRESS_FX_PARS_1 = ADDRESS_FX_PARS_BASE.map((_value, index) => {
  return {
    type: "s",
    value: `/fx/1/par/${intTo2PaddedArgString(index + 1)}`,
  }
})

export const ADDRESS_FX_PARS_2 = ADDRESS_FX_PARS_BASE.map((_value, index) => {
  return {
    type: "s",
    value: `/fx/2/par/${intTo2PaddedArgString(index + 1)}`,
  }
})

export const ADDRESS_FX_PARS_3 = ADDRESS_FX_PARS_BASE.map((_value, index) => {
  return {
    type: "s",
    value: `/fx/3/par/${intTo2PaddedArgString(index + 1)}`,
  }
})

export const ADDRESS_FX_PARS_4 = ADDRESS_FX_PARS_BASE.map((_value, index) => {
  return {
    type: "s",
    value: `/fx/4/par/${intTo2PaddedArgString(index + 1)}`,
  }
})

export const ADDRESS_FX_PARS_5 = ADDRESS_FX_PARS_BASE.map((_value, index) => {
  return {
    type: "s",
    value: `/fx/5/par/${intTo2PaddedArgString(index + 1)}`,
  }
})

export const ADDRESS_FX_PARS_6 = ADDRESS_FX_PARS_BASE.map((_value, index) => {
  return {
    type: "s",
    value: `/fx/6/par/${intTo2PaddedArgString(index + 1)}`,
  }
})

export const ADDRESS_FX_PARS_7 = ADDRESS_FX_PARS_BASE.map((_value, index) => {
  return {
    type: "s",
    value: `/fx/7/par/${intTo2PaddedArgString(index + 1)}`,
  }
})

export const ADDRESS_FX_PARS_8 = ADDRESS_FX_PARS_BASE.map((_value, index) => {
  return {
    type: "s",
    value: `/fx/8/par/${intTo2PaddedArgString(index + 1)}`,
  }
})

export const ADDRESS_FX_PARS_1_8 = [
  ...ADDRESS_FX_PARS_1,
  // ...ADDRESS_FX_PARS_2,
  // ...ADDRESS_FX_PARS_3,
  // ...ADDRESS_FX_PARS_4,
  // ...ADDRESS_FX_PARS_5,
  // ...ADDRESS_FX_PARS_6,
  // ...ADDRESS_FX_PARS_7,
  // ...ADDRESS_FX_PARS_8,
]

console.log(ADDRESS_FX_PARS_1_8)
