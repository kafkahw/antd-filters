import React from 'react';
import ReactDOM from 'react-dom';

import 'antd/dist/antd.css';
import FilterList, { NumCompareFilter } from '../src';

const topics = {
  gdp: {
    key: 'gdp',
    text: 'GDP of this year',
    field: 'gdp',
    element: NumCompareFilter,
  },
};

const Demo = () => (
  <FilterList
    topics={topics}
    onSubmit={filters => console.log(filters)}
  />
);

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
