import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import React from 'react'
import { table } from 'console';

type Props = {
    tabs: Tab[]
    header?: JSX.Element
}

interface Tab {
    name: string
    content: JSX.Element
}

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