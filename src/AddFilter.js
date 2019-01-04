import React from 'react';
import PropTypes from 'prop-types';
import { Popover, Button, Icon, Select, Tooltip } from 'antd';
import classNames from 'classnames/bind';

import styles from './Filter.less';

const { Option } = Select;

const cx = classNames.bind(styles);


const AddFilter = ({ onSelect, filters, topics }) => {
  const sortedFilters = filters.slice().sort((a, b) => topics[a].text.localeCompare(topics[b].text));

  return (
    <Popover
      content={
        <Select
          style={{ minWidth: '190px' }}
          value="Select a filter"
          optionFilterProp="title"
          onSelect={onSelect}
          showSearch
        >
          {sortedFilters.map((filter) => {
            const { text, description } = topics[filter];
            return (
              <Option key={filter} title={text}>
                <Tooltip title={description} placement="right">
                  <div>
                    {text}
                  </div>
                </Tooltip>
              </Option>
            );
          })}
        </Select>
      }
      trigger="click"
      placement="bottomLeft"
    >
      <Button className={cx('btn-add-filter')}>
        <Icon type="plus" /> Add filter
      </Button>
    </Popover>
  );
};

AddFilter.propTypes = {
  topics: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  filters: PropTypes.arrayOf(PropTypes.string),
};

AddFilter.defaultProps = {
  onSelect: () => {},
  filters: [],
};

export default AddFilter;
