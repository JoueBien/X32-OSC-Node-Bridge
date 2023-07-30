import { FC, useEffect } from "react"
import styled from "styled-components"
import { colors } from "@/shared/styles"
import { ConnectIpInput } from "@/shared/components/ConnectScreen/ConnectIpInput"
import { StoreButton } from "@/shared/components/ConnectScreen/StoreButton"
import { ConnectIpOptionList } from "@/shared/components/ConnectScreen/ConnectIpOptionList"
import { ConnectButton } from "@/shared/components/ConnectScreen/ConnectButton"
import { Nav, Input } from "rsuite"
import { useAsyncSetState } from "use-async-setstate"
import { screenStyles } from "./screenStyles"
import { useObjectList } from "@/shared/hooks/useObjectList"
import { useLocalStorage } from "usehooks-ts"

// Types
type Props = NonNullable<unknown>

type ProjectItem = {
  name: string
  arg: string
  lastOutput: string
  savedOuPut: string
  notes: string
}

// Styles
const Container = styled.div`
  ${screenStyles}
`

export const Screen: FC<Props> = () => {
  // Connect Fly out
  const [flyOut, setFlyOut] = useAsyncSetState<string>("connect")

  const [activeItem, setActiveItem] = useLocalStorage<ProjectItem>(
    "active-project-item",
    { name: "", arg: "[]", lastOutput: "[]", savedOuPut: "[]", notes: "" }
  )

  const [storedList, setStoredList] = useLocalStorage<ProjectItem[]>(
    "project-items",
    []
  )
  const { list } = useObjectList<ProjectItem>(storedList)

  // Effects
  // Make sure to always sync changes to the list with storage
  // Si it's always recalled on start
  useEffect(() => {
    setStoredList(list)
  }, [list])

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
            <ol>
              {list.map((item, index) => {
                return <li key={index}>{item.name}</li>
              })}
            </ol>
          </>
        )}
      </div>
      <div className="work">
        <div className="nav-container-sticky">
          <div className="wrapper">
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
              value={activeItem.lastOutput}
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
              value={activeItem.savedOuPut}
              disabled={true}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}
