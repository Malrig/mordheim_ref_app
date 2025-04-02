import { Text, View, FlatList, Pressable } from "react-native";
import { Link, Stack } from 'expo-router';
import * as React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { selectSkillsStatus, selectSkillsError, fetchSkills } from "../../library/store/features/skillsSlice";
import { fetchSpecialRules, selectSpecialRulesError, selectSpecialRulesStatus } from "../../library/store/features/specialRulesSlice";
import { useAppDispatch, useAppSelector } from "../../library/store/hooks";
import { selectItemsStatus, selectItemsError, fetchItems } from "../../library/store/features/itemsSlice";
// import { Divider, List } from "react-native-paper";

type Props = React.PropsWithChildren<{}>

const slices_to_load = {
  skill: {
    status: selectSkillsStatus,
    error: selectSkillsError,
    fetch: fetchSkills,
  },
  specialRule: {
    status: selectSpecialRulesStatus,
    error: selectSpecialRulesError,
    fetch: fetchSpecialRules,
  },
  combinedItem: {
    status: selectItemsStatus,
    error: selectItemsError,
    fetch: fetchItems,
  },
}

export default function DataLoader({ children }: Props) {
  // Load all the required data into the Redux store. We do this initially because I say so.
  let statuses = Object.entries(slices_to_load).map(([key, slice]) => ({ status: useAppSelector(slice.status), fetcher: slice.fetch, }));
  let errors = Object.entries(slices_to_load).map(([key, slice]) => ({ key, error: useAppSelector(slice.error) }));

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    statuses.forEach(({ status, fetcher: fetch }) => {
      if (status === 'idle') {
        dispatch(dispatch(fetch));
      }
    });
  }, [statuses, dispatch]);

  const hasFailed = errors.some(({ error }) => error);
  const completed = statuses.every(({ status }) => status === 'succeeded');

  if (hasFailed) {
    return <>
      <Text>Loading failed</Text>
      {errors.map(({ key, error }) => <Text key={key}>{key} failed to load: {error}</Text>)}
    </>
  }
  else if (!completed) {
    return <Text>Loading</Text>
  }
  else {
    return (
      <>
        {children}
      </>
    );
  }
}
