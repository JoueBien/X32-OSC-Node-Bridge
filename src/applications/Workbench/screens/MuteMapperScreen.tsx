import { FC, PropsWithChildren, useContext, useEffect } from "react"
import styled from "styled-components"
import SelectPicker from "rsuite/SelectPicker"
import Button from "rsuite/Button"
import { allMuteOptions } from "shared/commandOptions/mutes"
import { useAsyncSetState } from "use-async-setstate"
import {
  MuteMapperContext,
  SharedMuteItem,
} from "../contexts/MuteMapperContext"
import { useObjectList } from "shared/hooks/useObjectList"
import { colors } from "styles"

const MuteMapperScreenContainer = styled.div`
  width: 100%;
  display: flex;

  flex-direction: row;
  justify-content: flex-start;

  form {
    display: flex;
    flex-direction: column;

    .text {
      line-height: 3rem;
    }

    .SelectPicker {
      min-width: 243px;
    }

    .Button {
      margin-top: 1rem;
    }
  }

  .list {
    margin-left: 1rem;
    .item {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid ${colors.text};

      & + .item {
        margin-top: 1rem;
      }

      .label {
        width: 243px;
      }
      .direction {
        width: 3rem;
      }
      .remove {
        width: 243px;
      }
    }
  }
`

export const MuteMapperScreen: FC<{}> = () => {
  // Global State
  const { sharedMuteItemList, addSharedMuteItem } =
    useContext(MuteMapperContext)

  // Local State
  const { list: dataOptions, getObjectByKeyValue: getListByKeyValue } =
    useObjectList<CommandOption>(allMuteOptions)
  const [formState, setFormState] = useAsyncSetState<Partial<SharedMuteItem>>(
    {}
  )
  // Calc
  const canAdd =
    formState.mixerA !== undefined && formState.mixerB !== undefined

  // Functions
  // When A changes update form
  const onMixerAChange = (value: string | null, event: any) => {
    const option = getListByKeyValue("value", value || undefined)
    setFormState({
      ...formState,
      mixerA: option,
    })
  }
  // When B changes update form
  const onMixerBChange = (value: string | null, event: any) => {
    const option = getListByKeyValue("value", value || undefined)
    setFormState({
      ...formState,
      mixerB: option,
    })
  }

  const addMapping = () => {
    if (formState?.mixerA !== undefined && formState?.mixerB !== undefined) {
      addSharedMuteItem(formState as SharedMuteItem)
    }
  }

  // ..
  return (
    <MuteMapperScreenContainer>
      <form>
        <span className="text">Link Mixer A</span>
        <SelectPicker
          className="SelectPicker"
          data={dataOptions}
          onChange={onMixerAChange}
          value={formState?.mixerA?.value}
        />
        <span className="text">To Mixer B</span>
        <SelectPicker
          className="SelectPicker"
          data={dataOptions}
          value={formState?.mixerB?.value}
          onChange={onMixerBChange}
        />
        <Button
          id="add"
          className="Button"
          appearance="ghost"
          color="green"
          disabled={!canAdd}
          onClick={addMapping}
          type="button"
        >
          Add Mapping
        </Button>
      </form>
      <div className="list">
        {sharedMuteItemList.map((item, index) => {
          return (
            <div key={index} className="item">
              <div className="label">{item.mixerA.label}</div>
              <div className="direction">{` <-> `}</div>
              <div className="label">{item.mixerB.label}</div>
              <div className="remove">
                <Button
                  className="Button"
                  appearance="ghost"
                  color="orange"
                  onClick={() => {}}
                >
                  Remove
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </MuteMapperScreenContainer>
  )
}
