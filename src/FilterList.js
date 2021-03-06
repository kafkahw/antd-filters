import React from 'react';
import PropTypes from 'prop-types';

import AddFilter from './AddFilter';

class FilterList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.updateFilter = this.updateFilter.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  state = {
    filters: this.props.selectedFilters.map(filter => filter.key),
  };

  filters = this.props.selectedFilters.reduce(
    (acc, curr) => ({ ...acc, [curr.key]: curr }),
    {},
  );

  updateFilter(topic, value) {
    this.filters[topic] = value && { ...value, key: topic };

    this.submitFilters();
  }

  handleDelete(topic) {
    // Removes topic from filters and adds it into unselectedFilters
    this.setState(prevState => ({
      filters: prevState.filters.filter(filter => filter !== topic),
    }));

    delete this.filters[topic];

    this.submitFilters();
  }

  handleSelect(topic) {
    // Adds selected topic to filters and removes it from unselectedFilters
    this.setState(prevState => ({
      filters: [...prevState.filters, topic],
    }));
  }

  submitFilters = () => {
    const filters = Object.values(this.filters).filter(Boolean);
    this.props.onSubmit(filters);
  };

  render() {
    const { filters } = this.state;
    const { topics } = this.props;
    const unselectedFilters = Object.keys(topics).filter(topic => !filters.includes(topic));

    return (
      <div className="filterlist">
        {filters.map((filter) => {
          const topic = topics[filter];
          const defaultFilter = this.filters[filter];
          const { operator: defaultOperator, value: defaultValue } = defaultFilter || {};
          return (
            <topic.element
              key={filter}
              topic={topic}
              setTopic={this.updateFilter}
              onDelete={this.handleDelete}
              defaultValue={defaultValue}
              defaultOperator={defaultOperator}
              options={this.props.options[filter]}
            />
          );
        })}
        {unselectedFilters.length > 0 && (
          <AddFilter
            filters={unselectedFilters}
            onSelect={this.handleSelect}
            topics={topics}
          />
        )}
      </div>
    );
  }
}

FilterList.propTypes = {
  topics: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  selectedFilters: PropTypes.array,
  options: PropTypes.object,
};

FilterList.defaultProps = {
  options: {},
  selectedFilters: [],
  onSubmit: () => {},
};

export default FilterList;
