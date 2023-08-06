import { useState, useEffect, useCallback } from 'react';
import styles from './ProjectEdit.module.scss';
import stateFactory from './ProjectEdit.state.ts';
import useForest from '~/lib/useForest';

type ProjectEditProps = {}

export default function ProjectEdit(props: ProjectEditProps) {
  const [value, state] = useForest([stateFactory, props],
    (localState) => {
    });

  const {} = value;

  return (<div className={styles.container}>

  </div>);
}
