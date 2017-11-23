export const CLEAR_ERRORS = 'CLEAR_ERRORS';

const clearCurrentErrors = () => ({
  type: CLEAR_ERRORS
});

export const clearErrors = () => (dispatch) => (
  dispatch(clearCurrentErrors)
);
