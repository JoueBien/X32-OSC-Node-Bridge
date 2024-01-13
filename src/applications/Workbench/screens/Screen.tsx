import { FC, useEffect } from "react"
import styled from "styled-components"
import { ConnectIpInput } from "@/shared/components/ConnectScreen/ConnectIpInput"
import { StoreButton } from "@/shared/components/ConnectScreen/StoreButton"
import { ConnectIpOptionList } from "@/shared/components/ConnectScreen/ConnectIpOptionList"
import { ConnectButton } from "@/shared/components/ConnectScreen/ConnectButton"
import { Nav, Input, Button } from "rsuite"
import { screenStyles } from "./screenStyles"
import { useObjectList } from "@/shared/hooks/useObjectList"
import { useLocalStorage } from "usehooks-ts"
import { v4 as uuid } from "uuid"

// Types
type Props = NonNullable<unknown>

type ProjectItem = {
  name: string
  arg: string
  lastOutput: string
  savedOuPut: string
  notes: string
  uuid: string
}

const EMPTY_PROJECT_ITEM_FAB: ProjectItem = {
  name: "New Command",
  arg: "[]",
  lastOutput: "[]",
  savedOuPut: "[]",
  notes: "",
  uuid: "",
}

const INACTIVE_ID = "-1"

// Styles
const Container = styled.div`
  ${screenStyles}
`

function jsonToStringFormat(str: string) {
  try {
    return JSON.stringify(str, null, 2)
  } catch (_e) {
    return str
  }
}

export const Screen: FC<Props> = () => {
  // Connect Fly out
  const [flyOut, setFlyOut] = useLocalStorage<string>("fly-out-tab", "connect")

  const [activeItem, setActiveItem] = useLocalStorage<ProjectItem>(
    "active-project-item",
    { ...EMPTY_PROJECT_ITEM_FAB }
  )

  const [storedList, setStoredList] = useLocalStorage<ProjectItem[]>(
    "project-items",
    []
  )
  const [activeItemIndex, setActiveItemIndex] = useLocalStorage<string>(
    "active-item-index",
    INACTIVE_ID
  )
  const {
    list,
    pushStart: listPush,
    removeAtIndex: listRemoveAtIndex,
    updateWhereObjectHasKeyValue: updateItem,
    getObjectByKeyValue: getItem,
  } = useObjectList<ProjectItem>(storedList)

  // Effects
  // Make sure to always sync changes to the list with storage
  // Si it's always recalled on start
  useEffect(() => {
    setStoredList(list)
  }, [list])

  // Functions
  const setNew = async () => {
    await setActiveItemIndex(INACTIVE_ID)
    await setActiveItem({ ...EMPTY_PROJECT_ITEM_FAB, uuid: INACTIVE_ID })
  }

  const storeAs = async () => {
    const newId = uuid()
    await listPush({ ...activeItem, uuid: newId })
    await recall(newId)
  }

  const store = async () => {
    if (activeItemIndex !== INACTIVE_ID) {
      await setActiveItemIndex(activeItemIndex)
      await updateItem("uuid", activeItemIndex, { ...activeItem })
    }
  }

  const recall = async (id: string) => {
    const item = getItem("uuid", id)
    if (item) {
      await setActiveItem({ ...item })
      await setActiveItemIndex(item.uuid)
    }
  }

  const deleteAtIndex = async (index: number) => {
    // Set new so we don't end up with stale state
    await setNew()
    await listRemoveAtIndex(index)
  }

  // ..
  return (
    <Container>
      <div className="flyout">
        <div>
          <Nav
            appearance="subtle"
            className="topNav"
            activeKey={flyOut}
            onSelect={setFlyOut}
          >
            <Nav.Item eventKey="connect">Connect</Nav.Item>
            <Nav.Item eventKey="project">Project</Nav.Item>
          </Nav>
        </div>
        {flyOut === "connect" && (
          <>
            {/* Connect to Mixer */}
            <div className="connect-controls">
              <div className="connect-group">
                <ConnectIpInput
                  mixerKey="Mixer"
                  title={false}
                  label={
                    <>
                      <b>Set IP Address for Mixer</b>
                    </>
                  }
                />
                <div>
                  <StoreButton mixerKey="Mixer" />
                </div>
                <br />
                <p>
                  <b>Start connection with Mixers</b>
                </p>
                <ConnectButton mixerKey="Mixer" />
              </div>
            </div>
            {/* Recall and IP that is stored */}
            <div className="connect-controls">
              <div className="connect-group">
                <ConnectIpOptionList mixerKeys={["Mixer"]} />
              </div>
            </div>
          </>
        )}
        {flyOut === "project" && (
          <>
            <div className="connect-project">
              {list.map((item, index) => {
                return (
                  <div key={index} className="item">
                    {item.name}{" "}
                    <div>
                      <Button
                        className="Button-grey"
                        type="button"
                        onClick={() => recall(item.uuid)}
                      >
                        Recall
                      </Button>
                      <Button
                        className="Button-red"
                        type="button"
                        onClick={() => deleteAtIndex(index)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
      <div className="work">
        <div className="nav-container-sticky">
          <div className="wrapper">
            <div className="save-controls">
              <Button className="Button-blue" type="button" onClick={setNew}>
                New
              </Button>
              <Button className="Button-blue" type="button" onClick={storeAs}>
                Store As
              </Button>
              <Button
                className="Button-blue"
                type="button"
                onClick={store}
                disabled={activeItemIndex === INACTIVE_ID}
              >
                Store
              </Button>
            </div>
            <div className="send-controls">
              <Button className="Button-green" type="button" onClick={setNew}>
                Send
              </Button>
            </div>
          </div>
        </div>
        <label>Request</label>
        <Input
          value={activeItem?.name}
          onChange={(value) => setActiveItem({ ...activeItem, name: value })}
        />
        <div className="in-out">
          <div className="in-out-item">
            <label>Arg</label>
            <Input
              as="textarea"
              value={activeItem.arg}
              onChange={(value) => setActiveItem({ ...activeItem, arg: value })}
            />
          </div>
          <div className="in-out-item">
            <label>Last Output</label>
            <Input
              as="textarea"
              value={jsonToStringFormat(activeItem.lastOutput)}
              disabled={true}
            />
          </div>
        </div>
        <div className="in-out">
          <div className="in-out-item">
            <label>Notes</label>
            <Input
              as="textarea"
              value={activeItem.notes}
              onChange={(value) =>
                setActiveItem({ ...activeItem, notes: value })
              }
            />
          </div>
          <div className="in-out-item">
            <label>Saved Output</label>
            <Input
              as="textarea"
              value={jsonToStringFormat(activeItem.savedOuPut)}
              disabled={true}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}
