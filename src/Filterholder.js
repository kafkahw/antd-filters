import React from 'react';
import PropTypes from 'prop-types';
import {
  Popover,
  Button,
  Icon,
  Tooltip,
} from 'antd';


const Filterholder = ({
  text,
  children,
  hasError,
  isMenuOpen,
  onMenuVisibleChange,
  onDelete,
  description,
}) => (
  <Popover
    className="filter"
    content={children}
    trigger="click"
    placement="bottomLeft"
    visible={isMenuOpen}
    onVisibleChange={onMenuVisibleChange}
  >
    <Button
      type={hasError ? 'danger' : 'default'}
      className="filter-holder"
    >
      <Tooltip title={description} placement="topLeft">
        <div className="text">{text}</div>
      </Tooltip>
    </Button>
    <Tooltip title="Delete this filter">
      <Icon
        className="delete-filter"
        type="close-circle"
        theme="filled"
        onClick={onDelete}
      />
    </Tooltip>
  </Popover>
);


Filterholder.propTypes = {
  text: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  isMenuOpen: PropTypes.bool,
  hasError: PropTypes.bool,
  onMenuVisibleChange: PropTypes.func,
  onDelete: PropTypes.func,
};

Filterholder.defaultProps = {
  isMenuOpen: true,
  hasError: false,
  onMenuVisibleChange: () => {},
  onDelete: () => {},
};

export default Filterholder;
