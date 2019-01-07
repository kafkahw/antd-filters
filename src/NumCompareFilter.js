import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio, Divider, InputNumber } from 'antd';

import Filterholder from './Filterholder';

const RadioGroup = Radio.Group;


const operatorsMap = {
  '>': 'more than',
  '>=': 'more than or equals',
  '=': 'equals',
  '<=': 'less than or equals',
  '<': 'less than',
};


class NumCompareFilter extends Component {
  state = {
    isMenuOpen: this.props.defaultValue === null,
    operator: this.props.defaultOperator,
    value: this.props.defaultValue,
    error: false,
  };

  handleOpChange = (event) => {
    this.setState({ operator: event.target.value });
  };

  handleValChange = (value) => {
    this.setState({ value: Number.isNaN(Number(value)) ? null : value });
  };

  validate = () => {
    const { value, operator } = this.state;
    const { setTopic, topic } = this.props;

    // If no value, set error to true
    // and update topic to be null;
    // Otherwise, update topic with current state
    if (!value && value !== 0) {
      this.setState({ error: true });
      setTopic(topic.key, null);
    } else {
      setTopic(topic.key, { value, operator, field: topic.field });
    }
  };

  handleMenuVisibleChange = (visible) => {
    if (!visible) {
      this.closeMenu();
    } else {
      this.setState({ isMenuOpen: true, error: false });
    }
  };

  closeMenu = () => {
    this.setState({ isMenuOpen: false });
    this.validate();
  };

  handleDelete = (event) => {
    event.stopPropagation();
    this.props.onDelete(this.props.topic.key);
  };

  display() {
    const { operator, value, error } = this.state;
    const { topic } = this.props;

    if (error) {
      return `${topic.text} is missing value`;
    }

    if (topic.display) {
      return topic.display(operator, value);
    }

    if (value || value === 0) {
      return `${topic.text} ${operator} ${value}`;
    }

    return `${topic.text} ${operator} ...`;
  }

  render() {
    const {
      isMenuOpen, operator, value, error,
    } = this.state;
    const { topic, textDisplay } = this.props;

    const numberInput = (
      <div style={{ margin: '5px 0 5px 20px' }}>
        <InputNumber
          autoFocus
          value={value}
          onChange={this.handleValChange}
        />
        &nbsp;
        {topic.unit || ''}
      </div>
    );

    return (
      <Filterholder
        isMenuOpen={isMenuOpen}
        hasError={error}
        description={topic.description}
        text={textDisplay ? textDisplay(operator, value) : this.display()}
        onMenuVisibleChange={this.handleMenuVisibleChange}
        onDelete={this.handleDelete}
      >
        <RadioGroup
          className="filter-holder-dropdown"
          value={operator}
          onChange={this.handleOpChange}
        >
          {Object.keys(operatorsMap).map(op => (
            <div key={op} style={{ marginBottom: '5px' }}>
              <Radio value={op}>{operatorsMap[op]}</Radio>
              {operator === op && numberInput}
            </div>
          ))}
          <Divider />
          <div style={{ textAlign: 'center' }}>
            <a
              onClick={this.closeMenu}
              onKeyPress={this.closeMenu}
              role="button"
              tabIndex={0}
            >
              Done
            </a>
          </div>
        </RadioGroup>
      </Filterholder>
    );
  }
}

NumCompareFilter.propTypes = {
  topic: PropTypes.shape({
    key: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    unit: PropTypes.string,
    display: PropTypes.func,
    description: PropTypes.string,
  }).isRequired,
  defaultOperator: PropTypes.string,
  defaultValue: PropTypes.number,
  onDelete: PropTypes.func,
  setTopic: PropTypes.func,
  textDisplay: PropTypes.func,
};

NumCompareFilter.defaultProps = {
  defaultOperator: '>',
  defaultValue: null,
  onDelete: () => {},
  setTopic: () => {},
  textDisplay: null,
};

export default NumCompareFilter;
