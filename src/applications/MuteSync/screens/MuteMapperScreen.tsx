import { FC, useContext } from "react"
import styled from "styled-components"
import SelectPicker from "rsuite/SelectPicker"
import Button from "rsuite/Button"
import { allMuteOptions } from "@/shared/commandOptions/mutes"
import { useAsyncSetState } from "use-async-setstate"
import {
  MuteMapperContext,
  SharedMuteItem,
} from "../contexts/MuteMapperContext"
import { useObjectList } from "@/shared/hooks/useObjectList"
import { muteMapperScreenStyles } from "./muteMapperScreenStyles"
import Input from "rsuite/Input"
import { CommandOption } from "@/shared/commandOptions/types"

// Styles
const MuteMapperScreenContainer = styled.div`
  ${muteMapperScreenStyles}
`

export const MuteMapperScreen: FC<NonNullable<unknown>> = () => {
  // Global State
  const { activeScene, importMuteScene, exportMuteScene, storedScenes } =
    useContext(MuteMapperContext)
  const {
    activeSceneName,
    updateActiveSceneName,
    overrideSharedMuteList,
    sharedMuteItemList,
    addSharedMuteItem,
    removeSharedMuteItem,
    clearActive,
    storeActive,
    storeActiveAs,
    activeSceneId,
    recallToActive,
  } = activeScene
  // TODO: remove saveNewMuteScene at later date
  const { storedMutedScenes, removeMuteScene, saveNewMuteScene } = storedScenes

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
  const onMixerAChange = (value: string | null, _event: any) => {
    const option = getListByKeyValue("value", value || undefined)
    setFormState({
      ...formState,
      mixerA: option,
    })
  }
  // When B changes update form
  const onMixerBChange = (value: string | null, _event: any) => {
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

  const removeMapping = (index: number) => {
    removeSharedMuteItem(index)
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
        <div className="item">
          <div className="label-full">
            <b>Active Mute Scene</b>
          </div>
        </div>
        <div className="item">
          <div className="label label-fill">
            <Input
              id="scene-name"
              placeholder="Mute Scene Name"
              value={activeSceneName}
              onChange={updateActiveSceneName}
            />
          </div>
          <div className="remove">
            <Button
              id="new"
              className="Button-grey"
              onClick={clearActive}
              type="button"
            >
              New
            </Button>
            <Button
              id="store"
              className="Button-grey"
              disabled={activeSceneId === undefined}
              onClick={() => storeActive()}
              type="button"
            >
              Store
            </Button>
            <Button
              id="store-as"
              className="Button-grey"
              onClick={() => storeActiveAs()}
              type="button"
            >
              Store As
            </Button>

            <Button
              id="import"
              className="Button-blue"
              onClick={importMuteScene}
              type="button"
            >
              Import
            </Button>
            <Button
              id="export"
              className="Button-blue"
              onClick={() =>
                exportMuteScene([...sharedMuteItemList], activeSceneName)
              }
              type="button"
            >
              Export
            </Button>
          </div>
        </div>
        <div className="item">
          <div className="label label-40p">
            <b>Mixer A (Master)</b>
          </div>
          <div className="direction">
            <b>{` <-> `}</b>
          </div>
          <div className="label label-40p">
            <b>Mixer B</b>
          </div>
          <div className="remove"></div>
        </div>
        {sharedMuteItemList.map((item, index) => {
          return (
            <div key={index} className="item">
              <div className="label label-40p">{item.mixerA.label}</div>
              <div className="direction">{` <-> `}</div>
              <div className="label label-40p">{item.mixerB.label}</div>
              <div className="remove">
                <Button
                  className="Button-red"
                  onClick={() => removeMapping(index)}
                >
                  Remove
                </Button>
              </div>
            </div>
          )
        })}
      </div>
      {/* <div className="separator" /> */}
      <div className="list with-100%">
        <div className="item">
          <div className="label label-full">
            <b>Stored Mute Scenes</b>
          </div>
        </div>
        {storedMutedScenes.map((item, index) => {
          return (
            <div className="item" key={index}>
              <div className="label label-fill">
                <>
                  {item.value.name} (V{item.value.version})
                </>
              </div>
              <div className="remove">
                <Button
                  id="recall"
                  className="Button-grey"
                  onClick={() => recallToActive(item)}
                  type="button"
                >
                  Recall
                </Button>
                {/* TODO: add are you sure */}
                <Button
                  id="store-remove"
                  className="Button-red"
                  onClick={() => removeMuteScene(item.id)}
                  type="button"
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
