/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import { Row, Col, Typography } from 'antd';

import CategoryItemFilter from './ExploreCubesCategoryItemFilter';

import s from './ExploreCubesCategoryItem.module.css';

const { Paragraph } = Typography;

const CategoryItem = props => {
  const {
    onAction,
    member,
    category,
    selectedIndex,
    onFilterUpdate,
    selectedFilterIndex,
    hoverState,
  } = props;

  const isFilterVisible = member.type !== 'time' && category !== 'segments';

  return (
    <div 
      key={member.name}
      onBlur={() => {}}
      onFocus={() => {}}
      onClick={() => onAction('click', member)}
      onMouseOver={() => onAction('over', member)}
      onMouseOut={() => onAction('out', member)}
      onPointerDown={() => onAction('focus', member)}
      onPointerUp={() => onAction('out', member)}
      onMouseDown={() => onAction('focus', member)}
      onMouseUp={() => onAction('out', member)}
      className={
        cx({
          [s.pointer]: true,
          [s.memberActive]: selectedIndex > -1,
          [s.memberHovered]: hoverState === 'over',
          [s.memberFocused]: hoverState === 'focus',
        })
      }
    >
      <Paragraph className={s.memberSection}>
        <Row
          type="flex"
          justify="space-between"
          align="middle"
        >
          <Col
            xs={16}
          >
            <a className={cx(s.member)}>
              {member.shortTitle}
            </a>
          </Col>
          <CategoryItemFilter
            isVisible={isFilterVisible}
            onFilterUpdate={onFilterUpdate}
            selectedFilterIndex={selectedFilterIndex}
            member={member}
          />
        </Row>
      </Paragraph>
    </div>
  );
};

CategoryItem.propTypes = {
  member: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  selectedFilterIndex: PropTypes.number.isRequired,
  onFilterUpdate: PropTypes.shape({
    add: PropTypes.func,
    remove: PropTypes.func,
  }).isRequired,
  onAction: PropTypes.func,
  hoverState: PropTypes.oneOf(['over', 'focus', false]),
};

CategoryItem.defaultProps = {
  onAction: () => {},
  hoverState: false,
};

const CategoryItemMemo = React.memo(CategoryItem, (prevProps, nextProps) => {
  // memo only by these props
  if (
    prevProps.selectedIndex === nextProps.selectedIndex &&
    prevProps.selectedFilterIndex === nextProps.selectedFilterIndex &&
    prevProps.member.name === nextProps.member.name &&
    prevProps.hoverState === nextProps.hoverState
  ) {
    return true;
  }

  return false;
});

export default CategoryItemMemo;
