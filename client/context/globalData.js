import React, {createContext, useContext, useState} from 'react';

const DataContext = createContext();

export const DataProvider = ({children}) => {
  const [globalData, setGlobalData] = useState([]);
  const [selectedFlightGlobal, setSelectedFlightGlobal] = useState([]);

  const addData = newData => {
    setGlobalData([newData]);
  };

  const addSelectedData = newData => {
    setSelectedFlightGlobal(newData);
  };

  return (
    <DataContext.Provider
      value={{globalData, selectedFlightGlobal, addData, addSelectedData}}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
