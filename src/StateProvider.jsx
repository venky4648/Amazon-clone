import  { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types'
// Create a context
export const StateContext = createContext();

// Build a provider component
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// Custom hook to use the state and dispatch
export const useStateValue = () => useContext(StateContext);

// PropTypes validation

StateProvider.propTypes = {
  reducer: PropTypes.func.isRequired,
  initialState: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
};