import { CommandOption } from "@/shared/commandOptions/types"
import { filledArray } from "@/shared/utils/filledArray"
import {
  MeterLayoutItem,
  Source,
  SourceLabelsMasterLevel,
} from "@/applications/MeterBridge/hooks/useLayoutSettings.types"

export const MeterLayoutItemOptions: CommandOption<MeterLayoutItem>[] = [
  {
    label: `OFF/Blank`,
    value: "off",
    role: "Blank",
  },
  // Meter 1
  ...filledArray<32, CommandOption<MeterLayoutItem>>(32, (index) => {
    return {
      label: `CHANNEL ${index + 1} GAIN/TRIM`,
      value: {
        source: Source.ChannelGain,
        from: index,
      },
      role: "CHANNEL",
    }
  }),
  ...filledArray<32, CommandOption<MeterLayoutItem>>(32, (index) => {
    return {
      label: `CHANNEL ${index + 1} GATE`,
      value: {
        source: Source.ChannelGate,
        from: index,
      },
      role: "CHANNEL",
    }
  }),
  ...filledArray<32, CommandOption<MeterLayoutItem>>(32, (index) => {
    return {
      label: `CHANNEL ${index + 1} COMP`,
      value: {
        source: Source.ChannelComp,
        from: index,
      },
      role: "CHANNEL",
    }
  }),
  // Meter 2
  ...filledArray<16, CommandOption<MeterLayoutItem>>(16, (index) => {
    return {
      label: `BUSS ${index + 1} LEVEL`,
      value: {
        source: Source.BusMasterLevel,
        from: index,
      },
      role: "BUSS",
    }
  }),

  ...filledArray<6, CommandOption<MeterLayoutItem>>(6, (index) => {
    return {
      label: `MATRIX ${index + 1} LEVEL`,
      value: {
        source: Source.BusMatrixLevel,
        from: index,
      },
      role: "MATRIX",
    }
  }),

  ...filledArray<3, CommandOption<MeterLayoutItem>>(3, (index) => {
    return {
      label: `${SourceLabelsMasterLevel[index]} LEVEL`,
      value: {
        source: Source.BussLRCLevel,
        from: index,
      },
      role: "LRC",
    }
  }),

  ...filledArray<16, CommandOption<MeterLayoutItem>>(16, (index) => {
    return {
      label: `BUSS ${index + 1} COMP`,
      value: {
        source: Source.BusMasterComp,
        from: index,
      },
      role: "BUSS",
    }
  }),

  ...filledArray<6, CommandOption<MeterLayoutItem>>(6, (index) => {
    return {
      label: `MATRIX ${index + 1} COMP`,
      value: {
        source: Source.BusMatrixComp,
        from: index,
      },
      role: "MATRIX",
    }
  }),

  ...filledArray<2, CommandOption<MeterLayoutItem>>(2, (index) => {
    return {
      label: `${index === 0 ? "LEFT/RIGHT" : "CENTER"} COMP`,
      value: {
        source: Source.BussLRCComp,
        from: index,
      },
      role: "LRC",
    }
  }),
]
