import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import style from './tab.module.scss'
import React from 'react'
import { ButtonGroup, Dropdown } from 'react-bootstrap';
import { ReactTabsFunctionComponent, TabProps } from 'react-tabs';

type Props = {
    /**
     * @param {Tab} - A list of Tab objects, the component will create n tabs depending of the lenght of this list.
     */
    tabs: Tab[]
    /**
     * @param {JSX.Element} - A JSX element that will be the header of the tabs (will appear up the tabs, and is optional)
     */
    header?: JSX.Element
    /**
     * @param {boolean} - Idicates if the tabs are removeable (optional, false by default).
     */
    removeable?: boolean
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
    /**
     * The delete function of the tab (optional).
     */
    onClick?: () => {}
}

/**
 * A custom dropdown toggle to use with bootstrap dropdown.
 */

type CustomToggleProps = {
    children?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {};
};

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(
    (props: CustomToggleProps, ref: React.Ref<HTMLAnchorElement>) => (
        <a
            href=""
            ref={ref}
            onClick={e => {
                e.preventDefault();
                if (props.onClick) props.onClick(e);
            }}
        >
            {props.children}
            <i className={style.icon + " bi bi-chevron-down"}></i>
        </a>
    )
);


/**
 * An custom tab that includes the custom dropdown toogle.
 */

const ContextMenuTab: ReactTabsFunctionComponent<TabProps> = ({ children, onClick, ...otherProps }) => (
    <Tab {...otherProps}>
        <Dropdown as={ButtonGroup}>
            {children}
            {otherProps.selected && <Dropdown.Toggle as={CustomToggle} />}
            <Dropdown.Menu>
                <Dropdown.Item onClick={onClick}>Delete</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </Tab>
);

ContextMenuTab.tabsRole = 'Tab';

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
                {props.removeable ? 
                (props.tabs.map((tab, index) => (
                    <ContextMenuTab key={index} children={tab.name} onClick={tab.onClick}></ContextMenuTab>
                ))) 
                : (props.tabs.map((tab, index) => (
                    <Tab key={index} children={tab.name}></Tab>
                )))}
            </TabList>
            {props.tabs.map((tab, index) => (
                <TabPanel key={index} forceRender={true}>{tab.content}</TabPanel>
            ))}
        </Tabs>
    )
}

CustomTab.defaultProps = {
    removeable: false
};