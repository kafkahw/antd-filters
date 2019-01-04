import React from 'react';
import PropTypes from 'prop-types';

import NumCompareFilter from './NumCompareFilter';
import CurrencyFormat from '../number/CurrencyFormat';

const CurrencyCompareFilter = (props) => {
  const { topic } = props;

  const display = (op, val) => {
    if (!val && val !== 0) {
      return `${topic.text} ${op} ...`;
    }
    return (
      <React.Fragment>
        {`${topic.text} ${op} `}
        <CurrencyFormat
          value={`${val}`}
          currency="USD"
          displayIfZero
          minimumFractionDigits={0}
        />
      </React.Fragment>
    );
  };

  return <NumCompareFilter {...props} textDisplay={display} />;
};

CurrencyCompareFilter.propTypes = {
  topic: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default CurrencyCompareFilter;
