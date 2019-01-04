import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio, Divider } from 'antd';
import classNames from 'classnames/bind';

import styles from './Filter.less';
import Filterholder from './Filterholder';

const cx = classNames.bind(styles);

const RadioGroup = Radio.Group;

const operators = ['exists', 'not exists'];


class ExistsFilter extends Component {
  state = {
    isMenuOpen: !this.props.defaultOperator,
    operator: this.props.defaultOperator || 'exists',
  };

  handleOpChange = (event) => {
    this.setState({ operator: event.target.value });
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
      operator: this.state.operator,
      field: topic.field,
    });

    this.setState({ isMenuOpen: false });
  };

  handleDelete = (event) => {
    event.stopPropagation();
    this.props.onDelete(this.props.topic.key);
  };

  display() {
    const { operator } = this.state;
    const { topic } = this.props;

    if (topic.display) {
      return topic.display(operator);
    }

    return `${topic.text} ${operator}`;
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
          className={cx('filter-holder-dropdown')}
          value={this.state.operator}
          onChange={this.handleOpChange}
        >
          {operators.map(operator => (
            <div key={operator} style={{ marginBottom: '5px' }}>
              <Radio autoFocus value={operator}>{operator}</Radio>
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

ExistsFilter.propTypes = {
  topic: PropTypes.shape({
    key: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    display: PropTypes.func,
    description: PropTypes.string,
  }).isRequired,
  defaultOperator: PropTypes.string,
  onDelete: PropTypes.func,
  setTopic: PropTypes.func,
};

ExistsFilter.defaultProps = {
  defaultOperator: null,
  onDelete: () => { },
  setTopic: () => { },
};

export default ExistsFilter;
