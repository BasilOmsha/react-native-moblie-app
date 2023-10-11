import React, {createContext, useContext, useState} from 'react';

const DataContext = createContext();

export const DataProvider = ({children}) => {
  const [globalData, setGlobalData] = useState([]);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState([]);
  const [selectedFlightGlobal, setSelectedFlightGlobal] = useState([]);

  const addData = newData => {
    setGlobalData([newData]);
  };

  const addSelectedData = newData => {
    setSelectedFlightGlobal(newData);
  };
  const addReturnFlight = newData => {
    setSelectedReturnFlight(newData);
  };

  return (
    <DataContext.Provider
      value={{
        globalData,
        selectedFlightGlobal,
        selectedReturnFlight,
        addData,
        addSelectedData,
        addReturnFlight,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
