import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

import { Skill } from '../../types/skills'
import { SourceStatus } from '../../types/metadata';
import { createAppAsyncThunk } from '../withTypes';
import { initialSkillState } from '@/library/data/skills';

interface SkillsState {
  skills: Skill[],
  status: "idle" | "pending" | "succeeded" | "failed"
  error: string | null
}

const initialState: SkillsState = {
  skills: [],
  status: 'idle',
  error: null
}

export const fetchSkills = createAppAsyncThunk(
  "skills/fetchSkills",
  async () => {
    const response = await new Promise(f =>
      setTimeout(f, 1000)) // Add in a delay to play around with Async
      .then(() => initialSkillState);
    return response;
  },
  // Below prevents any new dispatches of this thunk if the condition is not met.
  {
    condition(arg, thunkApi) {
      const postsStatus = selectSkillsStatus(thunkApi.getState())
      if (postsStatus !== 'idle') {
        return false
      }
    }
  },
)

// Create the slice and pass in the initial state
const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    skillAdded: {
      reducer(state, action: PayloadAction<Skill>) {
        if (!state.skills.find(skill => skill.id === action.payload.id)) {
          state.skills.push(action.payload);
        }
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
      const updatedSkill = action.payload;
      let existingSkill = state.skills.find(skill => skill.id === updatedSkill.id);

      if (existingSkill) {
        Object.assign(existingSkill, updatedSkill);
      }

      // If Skill does not already exist then don't do anything.
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSkills.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.skills.push(...action.payload)
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Unknown Error'
      })
  },
  selectors: {
    selectAllSkills: skillsState => skillsState.skills,
    selectSkillById: (skillsState, skillId: string) => {
      return skillsState.skills.find(skill => skill.id === skillId)
    },
    selectFavouriteSkills: (skillsState) => {
      return skillsState.skills.filter(skill => skill.favourite === true)
    },
    selectSkillsStatus: (skillsState) => skillsState.status,
    selectSkillsError: (skillsState) => skillsState.error,
  }
})


export default skillsSlice.reducer

// Export all the actions
export const { skillAdded, skillUpdated } = skillsSlice.actions
// Export all the selectors
export const { selectAllSkills, selectSkillById, selectFavouriteSkills, selectSkillsStatus, selectSkillsError } = skillsSlice.selectors
