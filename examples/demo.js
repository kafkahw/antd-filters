import React from 'react';
import ReactDOM from 'react-dom';

import 'antd/dist/antd.css';
import FilterList, {
  NumCompareFilter,
  ExistsFilter,
  SingleSelectFilter,
  MultipleSelectFilter,
} from '../src';

const topics = {
  age: {
    key: 'age',
    text: 'Age',
    field: 'age',
    element: NumCompareFilter,
    description: 'The age of the patient',
  },
  medicalHistory: {
    key: 'medicalHistory',
    text: 'Medical History',
    field: 'medicalHistory',
    element: ExistsFilter,
    description: 'Whether the patint has medical history',
  },
  insPlan: {
    key: 'insPlan',
    text: 'Health Insurance Plan',
    field: 'insPlan',
    element: SingleSelectFilter,
    description: 'The patient\'s insurance plan',
  },
  contacts: {
    key: 'contacts',
    text: 'Contacts',
    field: 'contacts',
    element: MultipleSelectFilter,
    description: 'The patient\'s emergency contacts',
  },
};

const Demo = () => (
  <FilterList
    options={{
      insPlan: [
        { label: 'Medicare Plan B', value: '1' },
        { label: 'Medicare Plan D', value: '2' },
        { label: 'Cigna Health', value: '3' },
        { label: 'United Health HDP', value: '4' },
      ],
      contacts: [
        { label: 'Father', value: '1' },
        { label: 'Mother', value: '2' },
        { label: 'Grandfather', value: '3' },
        { label: 'Grandmother', value: '4' },
        { label: 'Friend A', value: '5' },
        { label: 'Friend B', value: '6' },
        { label: 'Friend C', value: '7' },
      ],
    }}
    topics={topics}
    onSubmit={filters => console.log(filters)}
  />
);

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
