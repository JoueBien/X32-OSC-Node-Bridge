import { CommandOption } from "./types"

export const muteGroupOptions: CommandOption<string>[] = [
  { label: "Mute Group 1", value: "/config/mute/1" },
  { label: "Mute Group 2", value: "/config/mute/2" },
  { label: "Mute Group 3", value: "/config/mute/3" },
  { label: "Mute Group 4", value: "/config/mute/4" },
  { label: "Mute Group 4", value: "/config/mute/5" },
]

export const muteChannelOptions: CommandOption<string>[] = [
  // 1-10
  { label: "Mute Channel 1", value: "/ch/01/mix/on" },
  { label: "Mute Channel 2", value: "/ch/02/mix/on" },
  { label: "Mute Channel 3", value: "/ch/03/mix/on" },
  { label: "Mute Channel 4", value: "/ch/04/mix/on" },
  { label: "Mute Channel 5", value: "/ch/05/mix/on" },
  { label: "Mute Channel 6", value: "/ch/06/mix/on" },
  { label: "Mute Channel 7", value: "/ch/07/mix/on" },
  { label: "Mute Channel 8", value: "/ch/08/mix/on" },
  { label: "Mute Channel 9", value: "/ch/09/mix/on" },
  { label: "Mute Channel 10", value: "/ch/10/mix/on" },
  // 11-20
  { label: "Mute Channel 11", value: "/ch/11/mix/on" },
  { label: "Mute Channel 12", value: "/ch/12/mix/on" },
  { label: "Mute Channel 13", value: "/ch/13/mix/on" },
  { label: "Mute Channel 14", value: "/ch/14/mix/on" },
  { label: "Mute Channel 15", value: "/ch/15/mix/on" },
  { label: "Mute Channel 16", value: "/ch/16/mix/on" },
  { label: "Mute Channel 17", value: "/ch/17/mix/on" },
  { label: "Mute Channel 18", value: "/ch/18/mix/on" },
  { label: "Mute Channel 19", value: "/ch/19/mix/on" },
  { label: "Mute Channel 20", value: "/ch/20/mix/on" },
  // 21-23
  { label: "Mute Channel 21", value: "/ch/21/mix/on" },
  { label: "Mute Channel 22", value: "/ch/22/mix/on" },
  { label: "Mute Channel 23", value: "/ch/23/mix/on" },
  { label: "Mute Channel 24", value: "/ch/24/mix/on" },
  { label: "Mute Channel 25", value: "/ch/25/mix/on" },
  { label: "Mute Channel 26", value: "/ch/26/mix/on" },
  { label: "Mute Channel 27", value: "/ch/27/mix/on" },
  { label: "Mute Channel 28", value: "/ch/28/mix/on" },
  { label: "Mute Channel 29", value: "/ch/29/mix/on" },
  { label: "Mute Channel 30", value: "/ch/30/mix/on" },
  // 31-32
  { label: "Mute Channel 31", value: "/ch/31/mix/on" },
  { label: "Mute Channel 32", value: "/ch/32/mix/on" },
]

// /bus/01/mix/on
export const muteBusOptions: CommandOption<string>[] = [
  { label: "Mute Bus 1", value: "/bus/01/mix/on" },
  { label: "Mute Bus 2", value: "/bus/02/mix/on" },
  { label: "Mute Bus 3", value: "/bus/03/mix/on" },
  { label: "Mute Bus 4", value: "/bus/04/mix/on" },
  { label: "Mute Bus 5", value: "/bus/05/mix/on" },
  { label: "Mute Bus 6", value: "/bus/06/mix/on" },
  { label: "Mute Bus 7", value: "/bus/07/mix/on" },
  { label: "Mute Bus 8", value: "/bus/08/mix/on" },
  { label: "Mute Bus 9", value: "/bus/09/mix/on" },
  { label: "Mute Bus 10", value: "/bus/10/mix/on" },
  { label: "Mute Bus 11", value: "/bus/11/mix/on" },
  { label: "Mute Bus 12", value: "/bus/12/mix/on" },
  { label: "Mute Bus 13", value: "/bus/13/mix/on" },
  { label: "Mute Bus 14", value: "/bus/14/mix/on" },
  { label: "Mute Bus 15", value: "/bus/15/mix/on" },
  { label: "Mute Bus 16", value: "/bus/16/mix/on" },
  { label: "Matrix 1", value: "/mtx/01/mix/on" },
  { label: "Matrix 2", value: "/mtx/02/mix/on" },
  { label: "Matrix 3", value: "/mtx/03/mix/on" },
  { label: "Matrix 4", value: "/mtx/04/mix/on" },
  { label: "Matrix 5", value: "/mtx/05/mix/on" },
  { label: "Matrix 6", value: "/mtx/06/mix/on" },
]

export const muteAuxOptions: CommandOption<string>[] = [
  { label: "Aux in 1", value: "/auxin/01/mix/on" },
  { label: "Aux in 2", value: "/auxin/02/mix/on" },
  { label: "Aux in 3", value: "/auxin/03/mix/on" },
  { label: "Aux in 4", value: "/auxin/04/mix/on" },
  { label: "Aux in 5", value: "/auxin/05/mix/on" },
  { label: "Aux in 6", value: "/auxin/06/mix/on" },
  { label: "Aux in 7", value: "/auxin/07/mix/on" },
  { label: "Aux in 8", value: "/auxin/08/mix/on" },
]

export const muteDCAOptions: CommandOption<string>[] = [
  { label: "DCA 1", value: "/dca/1/on" },
  { label: "DCA 2", value: "/dca/2/on" },
  { label: "DCA 3", value: "/dca/3/on" },
  { label: "DCA 4", value: "/dca/4/on" },
  { label: "DCA 5", value: "/dca/5/on" },
  { label: "DCA 6", value: "/dca/6/on" },
  { label: "DCA 7", value: "/dca/7/on" },
  { label: "DCA 8", value: "/dca/8/on" },
]

export const muteLRCOptions: CommandOption<string>[] = [
  { label: "Master Left/Right", value: "/main/st/mix/on" },
  { label: "Master Center/Mono", value: "/main/m/mix/on" },
]

export const allMuteOptions = [
  ...muteGroupOptions,
  ...muteChannelOptions,
  ...muteLRCOptions,
  ...muteBusOptions,
  ...muteAuxOptions,
  ...muteDCAOptions,
]
