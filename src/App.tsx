import React from 'react';
import Papa from 'papaparse';

function App() {
  // Parsing CSV data
  Papa.parse('data/test.csv', {
    header: true,
    download: true,
    step: function (row) {
      console.log('Row: ', row.data);
    },
    complete: function () {
      console.log('Finished');
    },
  });

  return <div></div>;
}

export default App;
