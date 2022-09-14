import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import React from 'react'
import { table } from 'console';

type Props = {
    /**
     * @param {Tab} - A list of Tab objects, the component will create n tabs depending of the lenght of this list.
     */
    tabs: Tab[]
    /**
     * @param {JSX.Element} - A JSX element that will be the header of the tabs (will appear up the tabs)
     */
    header?: JSX.Element
}

/**
 * An interface representing a Tab object
 */
interface Tab {
    /**
     * The title of the specific tab
     */
    name: string
    /**
     * An JSX element with the content of the tab. Can be a <div> containing what you want to put in a specific tab.
     */
    content: JSX.Element
}

/**
 * This component allows for creating tabs and setting their content using an object list where each element has a tab title and its content
 */
export default function CustomTab(props: Props) {
    return (
        <Tabs>
            <div>
                {props.header}
            </div>
            <TabList>
                {props.tabs.map((tab) => (
                    <Tab>{tab.name}</Tab>
                ))}
            </TabList>
            {props.tabs.map((child) => (
                <TabPanel forceRender={true}>{child.content}</TabPanel>
            ))}
        </Tabs>
    )
}