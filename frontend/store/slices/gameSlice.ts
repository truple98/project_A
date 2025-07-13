import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { GameState, GameSession, StoryNode } from '../../types';
import { gameAPI } from '../../services/gameAPI';

const initialState: GameState = {
  currentSession: null,
  currentNode: null,
  isLoading: false,
  error: null,
};

// Async thunks
export const getCurrentSession = createAsyncThunk(
  'game/getCurrentSession',
  async () => {
    const response = await gameAPI.getCurrentSession();
    return response.data;
  }
);

export const startNewGame = createAsyncThunk(
  'game/startNewGame',
  async () => {
    const response = await gameAPI.startNewGame();
    return response.data;
  }
);

export const makeChoice = createAsyncThunk(
  'game/makeChoice',
  async (choiceId: string) => {
    const response = await gameAPI.makeChoice(choiceId);
    return response.data;
  }
);

export const getStoryNode = createAsyncThunk(
  'game/getStoryNode',
  async (nodeId: string) => {
    const response = await gameAPI.getStoryNode(nodeId);
    return response.data;
  }
);

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentNode: (state, action: PayloadAction<StoryNode>) => {
      state.currentNode = action.payload;
    },
    clearGame: (state) => {
      state.currentSession = null;
      state.currentNode = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get current session
    builder
      .addCase(getCurrentSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentSession = action.payload;
      })
      .addCase(getCurrentSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to get current session';
      });

    // Start new game
    builder
      .addCase(startNewGame.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(startNewGame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentSession = action.payload;
      })
      .addCase(startNewGame.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to start new game';
      });

    // Make choice
    builder
      .addCase(makeChoice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(makeChoice.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update session with new node
        if (state.currentSession) {
          state.currentSession.currentNodeId = action.payload.nextNodeId;
        }
      })
      .addCase(makeChoice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to make choice';
      });

    // Get story node
    builder
      .addCase(getStoryNode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getStoryNode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentNode = action.payload;
      })
      .addCase(getStoryNode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to get story node';
      });
  },
});

export const { clearError, setCurrentNode, clearGame } = gameSlice.actions;
export default gameSlice.reducer; 