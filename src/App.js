import { useState } from 'react';
import PatientTable from './PatientTable';
import './App.css'
import AgeSlider from './AgeSlider';
import useFilter from './useFilter';

const App = () => {
  const [ageValue, setAgeValue] = useState([0, 100])
  const { filteredData, loading, error } = useFilter(ageValue);

  return (
    <div className='Container'>
      <AgeSlider
        setAgeValue={setAgeValue}
      />
      <PatientTable
        data={filteredData}
        error={error}
        loading={loading}
      />
    </div>
  );
}

export default App;
