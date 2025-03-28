import { createSlice, nanoid, PayloadAction, createEntityAdapter, createSelector } from '@reduxjs/toolkit'

import { Skill } from '../../types/skills'
import { SourceStatus } from '../../types/metadata';
import { createAppAsyncThunk } from '../withTypes';
import { initialSkillState } from '@/library/data/skills';

const skillsAdapter = createEntityAdapter<Skill>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

interface SkillsState {
  status: "idle" | "pending" | "succeeded" | "failed"
  error: string | null
}

const initialState = skillsAdapter.getInitialState<SkillsState>({
  status: 'idle',
  error: null
});

export const fetchSkills = createAppAsyncThunk(
  "skills/fetchSkills",
  async () => {
    const response = await new Promise(f =>
      setTimeout(f, 1000)) // Add in a delay to play around with Async
      .then(() => initialSkillState);
    return response;
  },
  {
    condition(arg, thunkApi) {
      const postsStatus = selectSkillsStatus(thunkApi.getState())
      if (postsStatus !== 'idle') {
        return false
      }
    }
  },
)

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    skillAdded: {
      reducer(state, action: PayloadAction<Skill>) {
        skillsAdapter.addOne(state, action.payload);
      },
      prepare(name: string, description: string, group: string, source?: string, source_type?: SourceStatus, favourite?: boolean) {
        return {
          payload: {
            id: nanoid(),
            name: name,
            description: description,
            group: group,
            source: source ?? "",
            source_type: source_type ?? SourceStatus.Unknown,
            favourite: favourite ?? false,
          }
        }
      }
    },
    skillUpdated(state, action: PayloadAction<Skill>) {
      skillsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      });
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSkills.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.status = 'succeeded'
        skillsAdapter.setAll(state, action.payload.map(skill => ({ ...skill, id: skill.id ?? nanoid() })))
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Unknown Error'
      })
  },
  selectors: {
    selectAllSkills: (state) => skillsAdapter.getSelectors().selectAll(state),
    selectSkillById: (state, id: string) => skillsAdapter.getSelectors().selectById(state, id),
    selectSkillIds: (state) => skillsAdapter.getSelectors().selectIds(state),
    selectTotalSkills: (state) => skillsAdapter.getSelectors().selectTotal(state),
    selectSkillsStatus: (state) => state.status,
    selectSkillsError: (state) => state.error,
    selectSkillsByIds: createSelector(
      [(state) => state, (state, skillIds: string[]) => skillIds],
      (state, skillIds) =>
        skillIds
          .map(id => skillsAdapter.getSelectors().selectById(state, id))
          .filter((skill): skill is Skill => skill !== undefined)
    ),
    selectSkillByName: (state, skillName: string) =>
      skillsAdapter.getSelectors().selectAll(state).find(skill => skill.name === skillName),
  }
})

export default skillsSlice.reducer

// Export all the actions
export const { skillAdded, skillUpdated } = skillsSlice.actions

// Export all the selectors
export const {
  selectAllSkills,
  selectSkillById,
  selectSkillIds,
  selectTotalSkills,
  selectSkillsStatus,
  selectSkillsError,
  selectSkillsByIds,
  selectSkillByName,
} = skillsSlice.selectors;
