import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Tooltip } from 'antd';


class SimpleFilter extends Component {
  componentDidMount() {
    const { topic, setTopic } = this.props;
    const {
      key, operator, value, field,
    } = topic;

    setTopic(key, { operator, value, field });
  }

  handleDelete = () => {
    const { key } = this.props.topic;

    this.props.onDelete(key);
  }

  render() {
    const { text, display } = this.props.topic;

    return (
      <span className="filter">
        <Button className="filter-holder">
          <div className="text">{display ? display() : text}</div>
        </Button>
        <Tooltip title="Delete this filter">
          <Icon
            className="delete-filter"
            type="close-circle"
            theme="filled"
            onClick={this.handleDelete}
          />
        </Tooltip>
      </span>
    );
  }
}

SimpleFilter.propTypes = {
  topic: PropTypes.shape({
    key: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    operator: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    display: PropTypes.func,
  }).isRequired,
  setTopic: PropTypes.func,
  onDelete: PropTypes.func,
};

SimpleFilter.defaultProps = {
  setTopic: () => {},
  onDelete: () => {},
};


export default SimpleFilter;
