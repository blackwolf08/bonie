import { useEffect, useState } from 'react';
import './App.css';

import Form from './Form';

import FieldService from './api/MockService';

function App() {
  const [isloading, setIsloading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const data = FieldService.getField();
    setData(data);
    setIsloading(false);
  }, []);

  if (isloading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className='App'>
        <Form data={data} />
      </div>
    );
  }
}

export default App;
