import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio, Divider, InputNumber } from 'antd';

import Filterholder from './Filterholder';

const RadioGroup = Radio.Group;

const operators = ['more than', 'less than', 'exists', 'not exists'];

function isExtendedOp(operator) {
  return !['exists', 'not exists'].includes(operator);
}

class TimeCompareFilter extends Component {
  state = {
    isMenuOpen: this.props.defaultValue === null && isExtendedOp(this.props.defaultOperator),
    operator: this.props.defaultOperator,
    value: this.props.defaultValue,
    error: false,
  };

  handleOpChange = (event) => {
    this.setState({ operator: event.target.value });
  };

  handleValChange = (value) => {
    this.setState({ value: (Number.isNaN(value) || typeof value === 'string') ? null : value });
  };

  validate = () => {
    const { value, operator } = this.state;
    const { setTopic, topic } = this.props;

    // If the operator has extended input and
    // no value, set error to true
    // and update topic to be null;
    // Otherwise, update topic with current state
    if (isExtendedOp(operator) && !value && value !== 0) {
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

  display = () => {
    const { operator, value, error } = this.state;
    const { topic } = this.props;

    if (error) {
      return `${topic.text} is missing value`;
    }

    if (topic.display) {
      return topic.display(operator, value);
    }

    return `${topic.text} ${operator} ${value}`;
  };

  displayOp = (operator) => {
    const { existsOptionDisplay, notExistsOptionDisplay } = this.props.topic;

    if (operator === 'exists' && existsOptionDisplay) {
      return existsOptionDisplay;
    }

    if (operator === 'not exists' && notExistsOptionDisplay) {
      return notExistsOptionDisplay;
    }

    return operator;
  };

  render() {
    const {
      isMenuOpen, operator, value, error,
    } = this.state;
    const { topic } = this.props;

    const numberInput = (
      <div style={{ margin: '5px 0 5px 20px' }}>
        <InputNumber
          autoFocus
          min={0}
          value={value}
          onChange={this.handleValChange}
        />
        &nbsp;
        {topic.unit || ''}
      </div>
    );

    const ops = operators.map(op => ({
      op,
      showExtended: operator === op && isExtendedOp(op),
      opDisplay: this.displayOp(op),
    }));

    return (
      <Filterholder
        isMenuOpen={isMenuOpen}
        hasError={error}
        text={this.display()}
        description={topic.description}
        onMenuVisibleChange={this.handleMenuVisibleChange}
        onDelete={this.handleDelete}
      >
        <RadioGroup
          className="filter-holder-dropdown"
          value={operator}
          onChange={this.handleOpChange}
        >
          {ops.map(({ op, opDisplay, showExtended }) => (
            <div key={op} style={{ marginBottom: '5px' }}>
              <Radio value={op}>{opDisplay}</Radio>
              {showExtended && numberInput}
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

TimeCompareFilter.propTypes = {
  topic: PropTypes.shape({
    key: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    unit: PropTypes.string,
    display: PropTypes.func,
    description: PropTypes.string,
    notExistsOptionDisplay: PropTypes.string,
    existsOptionDisplay: PropTypes.string,
  }).isRequired,
  defaultOperator: PropTypes.string,
  defaultValue: PropTypes.number,
  onDelete: PropTypes.func,
  setTopic: PropTypes.func,
};

TimeCompareFilter.defaultProps = {
  defaultOperator: 'more than',
  defaultValue: null,
  onDelete: () => {},
  setTopic: () => {},
};

export default TimeCompareFilter;
