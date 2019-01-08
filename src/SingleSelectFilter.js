import React from 'react';
import PropTypes from 'prop-types';

import MultipleSelectFilter from './MultipleSelectFilter';

const SingleSelectFilter = props => (
  <MultipleSelectFilter
    {...props}
    mode="default"
  />
);

SingleSelectFilter.propTypes = {
  defaultOperator: PropTypes.string,
  operators: PropTypes.array,
};

SingleSelectFilter.defaultProps = {
  defaultOperator: 'is',
  operators: ['is', 'is not'],
};

export default SingleSelectFilter;
