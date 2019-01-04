import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio, Divider, Select } from 'antd';
import classNames from 'classnames/bind';

import styles from './Filter.less';
import Filterholder from './Filterholder';

const cx = classNames.bind(styles);

const RadioGroup = Radio.Group;

const { Option } = Select;


class SelectFilter extends Component {
  state = {
    isMenuOpen: this.props.defaultValue.length < 1,
    operator: this.props.defaultOperator,
    value: this.props.defaultValue,
    error: false,
  };

  handleOpChange = (event) => {
    this.setState({ operator: event.target.value });
  };

  handleValChange = (value) => {
    const newValue = this.props.mode === 'multiple' ? value : [value];
    this.setState({ value: newValue });
  };

  validate = () => {
    const { value, operator } = this.state;
    const { setTopic, topic } = this.props;

    // If value is an empty array, set error to true
    // and update topic to be null;
    // Otherwise, update topic with current state
    if (value.length < 1) {
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
    const { topic, options } = this.props;

    if (error) {
      return `${topic.text} is missing value`;
    }

    if (topic.display) {
      return topic.display(operator, value);
    }

    if (value.length > 0) {
      const labels = value.map((val) => {
        const option = options.find(op => op.value === val);
        return option ? option.label : val;
      }).join(', ');

      return `${topic.text} ${operator} ${labels}`;
    }

    return `${topic.text} ${operator} ...`;
  }

  render() {
    const {
      isMenuOpen, operator, value, error,
    } = this.state;
    const { topic, options } = this.props;
    const select = (
      <div style={{ margin: '5px 0 10px' }}>
        <Select
          autoFocus
          style={{ width: '100%', minWidth: '150px' }}
          mode={this.props.mode}
          optionFilterProp="children"
          value={this.props.mode === 'multiple' ? value : value[0]}
          onChange={this.handleValChange}
          getPopupContainer={trigger => trigger.parentNode}
        >
          {options.map(option => (
            <Option key={option.value}>{option.label}</Option>
          ))}
        </Select>
      </div>
    );

    return (
      <Filterholder
        isMenuOpen={isMenuOpen}
        hasError={error}
        description={topic.description}
        text={this.display()}
        onMenuVisibleChange={this.handleMenuVisibleChange}
        onDelete={this.handleDelete}
      >
        <RadioGroup
          className={cx('filter-holder-dropdown')}
          value={operator}
          onChange={this.handleOpChange}
        >
          {this.props.operators.map(op => (
            <div key={op} style={{ marginBottom: '5px' }}>
              <Radio value={op}>{op}</Radio>
              {operator === op && select}
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

SelectFilter.propTypes = {
  topic: PropTypes.shape({
    key: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    display: PropTypes.func,
  }).isRequired,
  defaultOperator: PropTypes.string,
  defaultValue: PropTypes.array,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
  operators: PropTypes.arrayOf(PropTypes.string),
  onDelete: PropTypes.func,
  setTopic: PropTypes.func,
  mode: PropTypes.string,
};

SelectFilter.defaultProps = {
  defaultOperator: 'are',
  defaultValue: [],
  options: [],
  operators: ['are', 'are not'],
  onDelete: () => {},
  setTopic: () => {},
  mode: 'multiple',
};

export default SelectFilter;
