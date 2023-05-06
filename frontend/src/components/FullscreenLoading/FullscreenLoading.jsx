import React from 'react'

import styles from './FullscreenLoading.module.css'

const FullscreenLoading = () => {
  return (
    <div className={styles.wrapper}>
        <span className={[styles.circle, styles.circle_1].join(' ')}/>
        <span className={[styles.circle, styles.circle_2].join(' ')}/>
        <span className={[styles.circle, styles.circle_3].join(' ')}/>
        <span className={[styles.circle, styles.circle_4].join(' ')}/>
        <span className={[styles.circle, styles.circle_5].join(' ')}/>
        <span className={[styles.circle, styles.circle_6].join(' ')}/>
        <span className={[styles.circle, styles.circle_7].join(' ')}/>
        <span className={[styles.circle, styles.circle_8].join(' ')}/>
    </div>
  )
}

export default FullscreenLoading