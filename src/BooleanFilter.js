import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio, Divider } from 'antd';

import Filterholder from './Filterholder';

const RadioGroup = Radio.Group;

const values = ['true', 'false'];


class BooleanFilter extends Component {
  state = {
    isMenuOpen: !this.props.defaultValue,
    value: this.props.defaultValue || 'true',
  };

  handleValChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleMenuVisibleChange = (visible) => {
    if (!visible) {
      this.closeMenu();
    } else {
      this.setState({ isMenuOpen: true });
    }
  };

  closeMenu = () => {
    const { topic, setTopic } = this.props;

    setTopic(topic.key, {
      value: this.state.value,
      operator: 'is',
      field: topic.field,
    });

    this.setState({ isMenuOpen: false });
  };

  handleDelete = (event) => {
    event.stopPropagation();
    this.props.onDelete(this.props.topic.key);
  };

  display() {
    const { value } = this.state;
    const { topic } = this.props;

    if (topic.display) {
      return topic.display('is', value);
    }

    return `${topic.text} is ${value}`;
  }

  render() {
    const { topic } = this.props;
    return (
      <Filterholder
        isMenuOpen={this.state.isMenuOpen}
        text={this.display()}
        description={topic.description}
        onMenuVisibleChange={this.handleMenuVisibleChange}
        onDelete={this.handleDelete}
      >
        <RadioGroup
          className="filter-holder-dropdown"
          value={this.state.value}
          onChange={this.handleValChange}
        >
          {values.map(value => (
            <div key={value} style={{ marginBottom: '5px' }}>
              <Radio autoFocus value={value}>{value}</Radio>
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

BooleanFilter.propTypes = {
  topic: PropTypes.shape({
    key: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    display: PropTypes.func,
    description: PropTypes.string,
  }).isRequired,
  defaultValue: PropTypes.string,
  onDelete: PropTypes.func,
  setTopic: PropTypes.func,
};

BooleanFilter.defaultProps = {
  defaultValue: null,
  onDelete: () => {},
  setTopic: () => {},
};

export default BooleanFilter;
