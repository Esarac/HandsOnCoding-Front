import React, {} from 'react'
import styles from './layout.module.scss';

type Props = {
    children?: React.ReactNode
};

function Layout(props: Props) {
  return (
    <div className={styles.container}>
        {props.children}
    </div>
  )
}

export default Layout