import React, { useState, useRef, useEffect, useMemo, useCallback, useReducer } from 'react';
import 'remixicon/fonts/remixicon.css';
import { Radio, Tooltip, Checkbox, Button, Select, Divider, InputNumber, Menu, Dropdown, Popover, Drawer, Tag, Skeleton, Empty, Pagination, Typography, DatePicker, Input, AutoComplete, Modal, Tabs, Col, Collapse, Row } from 'antd';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { isEmpty, find, isFunction, isUndefined, isNull, filter, isDate, isNumber, has, pick, isArray, clamp } from 'lodash';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import { FullscreenOutlined, EditOutlined, FilterOutlined, DeleteOutlined, ReloadOutlined, FileTextOutlined, FileExcelOutlined, FilePdfOutlined, EllipsisOutlined, LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';

var ColumnDensity = (() => {
  const [value, setValue] = useState('default');
  return React.createElement("div", {
    style: {
      marginRight: 20
    }
  }, React.createElement(Radio.Group, {
    value: value,
    onChange: e => setValue(e.target.value),
    optionType: 'button',
    buttonStyle: 'solid'
  }, React.createElement(Radio.Button, {
    value: 'small'
  }, React.createElement(Tooltip, {
    title: 'Dense'
  }, React.createElement("span", {
    className: 'anticon'
  }, React.createElement("i", {
    className: 'ri-align-justify'
  })))), React.createElement(Radio.Button, {
    value: 'default'
  }, React.createElement(Tooltip, {
    title: 'Default'
  }, React.createElement("span", {
    className: 'anticon'
  }, React.createElement("i", {
    className: 'ri-menu-line'
  }))))));
});

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

var Sortable = (props => {
  const {
    setColumns,
    columns,
    maxColumns,
    minColumns
  } = props;

  const onChange = (value, isSelected) => {
    setColumns(prev => {
      if (isSelected) {
        return {
          selected: prev.selected.filter(o => (o === null || o === void 0 ? void 0 : o.key) !== (value === null || value === void 0 ? void 0 : value.key)),
          unselected: prev.unselected.concat(value),
          all: prev.selected.filter(o => (o === null || o === void 0 ? void 0 : o.key) !== (value === null || value === void 0 ? void 0 : value.key)).concat(prev.unselected.concat(value))
        };
      } else {
        return {
          selected: prev.selected.concat(value),
          unselected: prev.unselected.filter(f => (f === null || f === void 0 ? void 0 : f.key) !== (value === null || value === void 0 ? void 0 : value.key)),
          all: prev.selected.concat(value, prev.unselected.filter(f => (f === null || f === void 0 ? void 0 : f.key) !== (value === null || value === void 0 ? void 0 : value.key)))
        };
      }
    });
  };

  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const items = reorder(columns.all, result.source.index, result.destination.index);
    setColumns(prev => {
      const selected = items.filter(value => !isEmpty(find(prev.selected, o => o.key === value.key)));
      const all = selected.concat(items.filter(value => isEmpty(find(prev.selected, o => o.key === value.key))));
      return { ...prev,
        all,
        selected
      };
    });
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: '8px',
    margin: `10px 0`,
    background: isDragging ? 'var(--draggable-background-1)' : 'var(--draggable-background-2)',
    border: isDragging ? '1px solid var(--border)' : 0,
    borderRadius: 4,
    ...draggableStyle
  });

  const getListStyle = () => ({
    width: '100%'
  });

  return React.createElement(DragDropContext, {
    onDragEnd: onDragEnd
  }, React.createElement(Droppable, {
    droppableId: 'droppable'
  }, provided => React.createElement("div", Object.assign({}, provided.droppableProps, {
    ref: provided.innerRef,
    style: { ...getListStyle(),
      height: 350,
      overflowY: 'scroll'
    }
  }), columns.all.map((value, index) => {
    const isSelected = columns.selected.find(o => (o === null || o === void 0 ? void 0 : o.key) === (value === null || value === void 0 ? void 0 : value.key));
    const dragDisabled = columns.selected.length >= maxColumns && !isSelected || isSelected !== undefined && columns.selected.length <= minColumns;
    return React.createElement(Draggable, {
      key: `column-item-${index}`,
      draggableId: `column-item-${index}`,
      index: index,
      isDragDisabled: dragDisabled
    }, (provided, snapshot) => React.createElement("div", Object.assign({
      ref: provided.innerRef
    }, provided.draggableProps, provided.dragHandleProps, {
      style: { ...getItemStyle(snapshot.isDragging, provided.draggableProps.style),
        pointerEvents: dragDisabled ? 'none' : 'all',
        opacity: dragDisabled ? 0.5 : 2
      }
    }), React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }, React.createElement(Checkbox, {
      disabled: columns.selected.length >= maxColumns && !isSelected || isSelected !== undefined && columns.selected.length <= minColumns,
      checked: isSelected !== undefined || false,
      onChange: () => onChange(value, isSelected)
    }, value === null || value === void 0 ? void 0 : value.title), React.createElement("span", {
      style: {
        display: 'flex',
        alignItems: 'center'
      }
    }, React.createElement("svg", {
      xmlns: 'http://www.w3.org/2000/svg',
      height: '24',
      viewBox: '0 0 24 24',
      width: '24'
    }, React.createElement("path", {
      d: 'M0 0h24v24H0V0z',
      fill: 'none'
    }), React.createElement("path", {
      fill: snapshot.isDragging ? 'var(--accent)' : 'var(--accent35)',
      d: 'M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z'
    }))))));
  }), provided.placeholder)));
});

var ColumnReorder = (props => {
  const {
    setColumns,
    columns,
    maxColumns,
    minColumns,
    defaultColumns
  } = props;
  return React.createElement("div", {
    className: '___table-column-filter'
  }, React.createElement("div", {
    className: '___table-column-filter-header'
  }, React.createElement("span", {
    className: '___table-column-filter-header-text'
  }, "Customize Column")), React.createElement(PerfectScrollbar, null, React.createElement(Sortable, {
    setColumns: setColumns,
    columns: columns,
    maxColumns: maxColumns,
    minColumns: minColumns
  })), React.createElement("div", {
    className: '___table-column-filter-footer'
  }, React.createElement(Button, {
    type: 'primary',
    onClick: () => null,
    style: {
      marginRight: 10
    }
  }, "Save as preset"), React.createElement(Button, {
    type: 'dashed',
    onClick: () => {
      setColumns(() => {
        var _defaultColumns$slice, _defaultColumns$slice2;

        return {
          selected: defaultColumns === null || defaultColumns === void 0 ? void 0 : (_defaultColumns$slice = defaultColumns.slice) === null || _defaultColumns$slice === void 0 ? void 0 : _defaultColumns$slice.call(defaultColumns, 0, maxColumns),
          unselected: (defaultColumns === null || defaultColumns === void 0 ? void 0 : defaultColumns.length) > maxColumns ? defaultColumns === null || defaultColumns === void 0 ? void 0 : (_defaultColumns$slice2 = defaultColumns.slice) === null || _defaultColumns$slice2 === void 0 ? void 0 : _defaultColumns$slice2.call(defaultColumns, 0, defaultColumns.length) : [],
          all: defaultColumns
        };
      });
    }
  }, "Clear all")));
});

var RenderOrder = (props => {
  const {
    renderOrder,
    setRenderOrder
  } = props;
  const [items, setItems] = useState([{
    label: `15 per page`,
    value: 15
  }, {
    label: '30 per page',
    value: 30
  }, {
    label: '50 per page',
    value: 50
  }, {
    label: '100 per page',
    value: 100
  }]);
  const [inputValue, setInputValue] = useState(undefined);

  const handleCustomize = () => {
    const findExisting = items.find(o => o.value === inputValue);

    if (!findExisting && inputValue) {
      setItems(prev => [...prev, {
        label: `${inputValue} per page`,
        value: inputValue
      }]);
    }

    setInputValue(0);
  };

  return React.createElement("div", {
    className: 'RenderOrder'
  }, React.createElement(Button, {
    style: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      zIndex: 2
    },
    type: 'primary'
  }, "Showing"), React.createElement(Select, {
    className: 'RenderOrder__select',
    placeholder: 'Customize data listing',
    defaultValue: 15,
    options: items,
    value: renderOrder,
    onChange: value => isFunction(setRenderOrder) ? setRenderOrder(value) : null,
    dropdownRender: menu => React.createElement("div", null, React.createElement("div", {
      className: '___data-sort-order-header'
    }, React.createElement("p", null, "Number of data")), menu, React.createElement(Divider, {
      style: {
        margin: '4px 0'
      }
    }), React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'nowrap',
        padding: 8
      }
    }, React.createElement(InputNumber, {
      min: 10,
      max: 500,
      step: 5,
      style: {
        flex: 'auto'
      },
      placeholder: 'Data per page',
      value: inputValue,
      onChange: value => setInputValue(Number(value))
    })), React.createElement(Divider, {
      style: {
        margin: '4px 0'
      }
    }), React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'nowrap',
        padding: 8
      }
    }, React.createElement(Button, {
      type: 'primary',
      block: true,
      icon: React.createElement("span", {
        className: 'anticon'
      }, React.createElement("i", {
        className: 'ri-add-line',
        style: {
          fontSize: 16
        }
      })),
      onClick: handleCustomize
    }, "Customize")))
  }));
});

var ControlActions = (() => {
  const menu = React.createElement(Menu, {
    className: 'CtrlActions__menu'
  }, React.createElement(Menu.Item, {
    key: '0',
    icon: React.createElement("span", {
      className: 'anticon'
    }, React.createElement("i", {
      className: 'ri-refresh-line',
      style: {
        color: 'var(--accent)',
        paddingRight: 10,
        fontSize: 17
      }
    }))
  }, "Refresh"), React.createElement(Menu.Item, {
    key: '1',
    icon: React.createElement("span", {
      className: 'anticon'
    }, React.createElement("i", {
      className: 'ri-file-line',
      style: {
        color: 'var(--accent)',
        paddingRight: 10,
        fontSize: 17
      }
    }))
  }, "Export as CSV"), React.createElement(Menu.Item, {
    key: '3',
    icon: React.createElement("span", {
      className: 'anticon'
    }, React.createElement("i", {
      className: 'ri-file-excel-2-line',
      style: {
        color: 'var(--accent)',
        paddingRight: 10,
        fontSize: 17
      }
    }))
  }, "Export as Excel"), React.createElement(Menu.Item, {
    key: '4',
    icon: React.createElement("span", {
      className: 'anticon'
    }, React.createElement("i", {
      className: 'ri-file-pdf-line',
      style: {
        color: 'var(--accent)',
        paddingRight: 10,
        fontSize: 17
      }
    }))
  }, "Export as PDF"));
  return React.createElement(Dropdown, {
    overlay: menu,
    trigger: ['click']
  }, React.createElement(Tooltip, {
    title: 'Export data'
  }, React.createElement(Button, {
    icon: React.createElement("span", {
      className: 'anticon'
    }, React.createElement("i", {
      className: 'ri-download-cloud-2-line',
      style: {
        fontSize: 17
      }
    })),
    style: {
      width: 160
    }
  }, "Export data")));
});

var TableControls = {
  ColumnDensity,
  ColumnReorder,
  RenderOrder,
  ControlActions
};

var TableHead = (props => {
  const {
    columns,
    columnKeys,
    checkState,
    onCheckAllChange,
    setColumns,
    maxColumns,
    minColumns,
    defaultColumns
  } = props;
  return React.createElement(motion.thead, {
    className: '___table-header',
    transition: {
      type: 'inertia'
    }
  }, React.createElement("tr", {
    className: '___table-columns'
  }, React.createElement("th", {
    className: '___table-column',
    style: {
      width: '64px'
    }
  }, React.createElement("div", {
    className: '___table-header-checkbox-container'
  }, React.createElement(Checkbox, {
    indeterminate: checkState.indeterminate,
    onChange: onCheckAllChange,
    checked: checkState.checkAll
  }))), columns.selected.map((value, index) => {
    return React.createElement(motion.th, {
      initial: {
        y: 50
      },
      animate: {
        y: 0
      },
      exit: {
        y: 50
      },
      transition: {
        type: 'spring',
        delay: (index || 1) * 0.02,
        stiffness: 100,
        damping: 13
      },
      className: '___table-column',
      key: value === null || value === void 0 ? void 0 : value.key,
      style: {
        width: `calc(100% / ${columnKeys.length + 2}) - 120px`
      }
    }, React.createElement("div", {
      className: '___table-column-container'
    }, React.createElement("div", {
      className: '___table-column-title'
    }, value === null || value === void 0 ? void 0 : value.title)));
  }), React.createElement("th", {
    className: '___table-column selectable-columns',
    style: {
      width: 64
    }
  }, React.createElement(motion.div, {
    whileHover: {
      scale: 1.1
    },
    className: '___table-selectable-columns-child-container'
  }, React.createElement(Popover, {
    placement: 'bottomRight',
    content: () => React.createElement(TableControls.ColumnReorder, {
      columns: columns,
      setColumns: setColumns,
      maxColumns: maxColumns,
      minColumns: minColumns,
      defaultColumns: defaultColumns
    }),
    trigger: 'click',
    style: {
      borderRadius: 10
    }
  }, React.createElement(Tooltip, {
    title: 'Customize columns',
    placement: 'left'
  }, React.createElement(Button, {
    type: 'link',
    style: {
      background: 'transaparent'
    },
    icon: React.createElement("span", {
      className: 'anticon'
    }, React.createElement("span", {
      className: 'anticon'
    }, React.createElement("i", {
      className: 'ri-list-settings-line',
      style: {
        fontSize: 17
      }
    })))
  })))))));
});

var CellMenu = (props => {
  const {
    showDrawer
  } = props;
  const menu = React.createElement(Menu, {
    style: {
      border: 0,
      background: 'var(--background-secondary)'
    }
  }, React.createElement(Menu, {
    className: 'CellMenu__menu'
  }, React.createElement(Menu.Item, {
    key: 'expand'
  }, React.createElement(motion.div, {
    initial: {
      color: 'var(--text-color)',
      cursor: 'pointer'
    },
    whileHover: {
      scale: 1.25
    }
  }, React.createElement(Tooltip, {
    title: 'Expand column'
  }, React.createElement(Button, {
    type: 'text',
    onClick: showDrawer,
    style: {
      color: 'var(--accent35)',
      width: 40,
      padding: 0
    }
  }, React.createElement(FullscreenOutlined, null))))), React.createElement(Menu.Item, {
    key: 'filter'
  }, React.createElement(motion.div, {
    initial: {
      color: 'var(--text-color)',
      cursor: 'pointer'
    },
    whileHover: {
      scale: 1.25
    }
  }, React.createElement(Tooltip, {
    title: 'Edit'
  }, React.createElement(Button, {
    type: 'text',
    style: {
      color: 'var(--accent35)',
      width: 40,
      padding: 0
    }
  }, React.createElement(EditOutlined, null))))), React.createElement(Menu.Item, {
    key: 'edit'
  }, React.createElement(motion.div, {
    initial: {
      color: 'var(--text-color)',
      cursor: 'pointer'
    },
    whileHover: {
      scale: 1.25
    }
  }, React.createElement(Tooltip, {
    title: 'Filter data by value'
  }, React.createElement(Button, {
    type: 'text',
    style: {
      color: 'var(--accent35)',
      width: 40,
      padding: 0
    }
  }, React.createElement(FilterOutlined, null))))), React.createElement(Menu.Item, {
    key: 'delete'
  }, React.createElement(motion.div, {
    initial: {
      color: 'var(--text-color)',
      cursor: 'pointer'
    },
    whileHover: {
      scale: 1.25
    }
  }, React.createElement(Tooltip, {
    title: 'Delete'
  }, React.createElement(Button, {
    danger: true,
    type: 'text',
    style: {
      width: 40,
      padding: 0
    }
  }, React.createElement(DeleteOutlined, null)))))), React.createElement(Menu, {
    style: {
      border: 0,
      background: 'var(--background-secondary)'
    }
  }, React.createElement(Menu.Divider, null), React.createElement(Menu.Item, {
    key: '0',
    icon: React.createElement(ReloadOutlined, {
      style: {
        color: 'var(--accent)',
        paddingRight: 10
      }
    })
  }, "Refresh"), React.createElement(Menu.Item, {
    key: '1',
    icon: React.createElement(FileTextOutlined, {
      style: {
        color: 'var(--accent)',
        paddingRight: 10
      }
    })
  }, "Export as CSV"), React.createElement(Menu.Item, {
    key: '3',
    icon: React.createElement(FileExcelOutlined, {
      style: {
        color: 'var(--accent)',
        paddingRight: 10
      }
    })
  }, "Export as Excel"), React.createElement(Menu.Item, {
    key: '4',
    icon: React.createElement(FilePdfOutlined, {
      style: {
        color: 'var(--accent)',
        paddingRight: 10
      }
    })
  }, "Export as PDF")));
  return React.createElement(Dropdown, {
    overlay: menu,
    trigger: ['click']
  }, React.createElement(Tooltip, {
    title: 'Actions'
  }, React.createElement(motion.div, {
    whileHover: {
      scale: 1.2
    }
  }, React.createElement(Button, {
    shape: 'circle',
    type: 'text',
    icon: React.createElement(EllipsisOutlined, {
      style: {
        fontSize: 17
      }
    })
  }))));
});

const presentationHOC = ({
  extraColumnsLength,
  columnKeys,
  columnType
}) => Component => React.createElement(motion.td, {
  layout: true,
  style: {
    width: `calc(100% / ${columnKeys.length + extraColumnsLength} - 120px)`
  },
  className: '___table-row'
}, React.createElement("div", {
  className: '___table-row-inner',
  style: {
    textAlign: columnType === 'number' || columnType === 'currency' ? 'right' : 'left'
  }
}, Component));

const Presentation = props => {
  const {
    columnType,
    data,
    presentationType,
    actionCallback,
    actionPresentationType,
    actionTitle,
    presentationColor,
    bold,
    source,
    dateFormat
  } = props;

  switch (columnType) {
    case 'action':
      return React.createElement(Button, {
        type: actionPresentationType || 'default',
        onClick: () => actionCallback ? actionCallback(source) : null,
        size: 'small',
        style: {
          fontSize: 12
        }
      }, actionTitle || '');

    case 'currency':
      {
        const currency = Intl.NumberFormat('en-NG', {
          currency: 'NGN',
          style: 'currency'
        }).format(Number(data) || 0);

        if (presentationType === 'tag') {
          return React.createElement(Tag, {
            color: presentationColor || 'gold',
            style: {
              fontWeight: bold ? 'bold' : 'normal'
            }
          }, currency);
        } else return React.createElement("span", {
          style: {
            fontWeight: bold ? 'bold' : 'normal'
          }
        }, currency);
      }

    case 'date':
    case 'datetime':
      {
        const format = dateFormat === 'datetime' ? 'lll LT' : 'lll';
        const date = moment(data).format(dateFormat || format) || moment(data).format(format);

        if (presentationType === 'tag') {
          return React.createElement(Tag, {
            color: presentationColor || 'gold',
            style: {
              fontWeight: bold ? 'bold' : 'normal'
            }
          }, date);
        } else return React.createElement(Tag, {
          color: presentationColor || 'default',
          style: {
            fontWeight: bold ? 'bold' : 'normal',
            borderColor: 'transparent',
            background: 'transparent'
          }
        }, date);
      }

    default:
      if (presentationType === 'tag') {
        return React.createElement(Tag, {
          color: presentationColor || 'gold',
          style: {
            fontWeight: bold ? 'bold' : 'normal'
          }
        }, data || '⏤⏤⏤');
      } else return React.createElement(Tag, {
        color: presentationColor || 'default',
        style: {
          fontWeight: bold ? 'bold' : 'normal',
          borderColor: 'transparent',
          background: 'transparent'
        }
      }, data || '⏤⏤⏤');

  }
};

var TableCell = (props => {
  const {
    checked,
    source,
    onCheckedChange,
    checkState,
    columnKeys,
    extraColumnsLength = 1,
    columns,
    index
  } = props;
  const trRef = useRef();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  return React.createElement(React.Fragment, null, React.createElement(motion.tr, {
    layout: true,
    ref: trRef,
    className: `${checked ? '___table-rows-checked ' : '___table-rows'} site-collapse-custom-collapse`,
    key: source === null || source === void 0 ? void 0 : source.key,
    initial: {
      y: 50
    },
    animate: {
      y: 0
    },
    exit: {
      y: 50
    },
    transition: {
      type: 'spring',
      delay: (index || 1) * 0.02,
      stiffness: 100,
      damping: 13
    }
  }, React.createElement("td", {
    className: '___table-row',
    style: {
      width: '64px'
    }
  }, React.createElement("div", {
    className: '___table-row-checkbox-container'
  }, React.createElement(Checkbox, {
    key: source === null || source === void 0 ? void 0 : source.key,
    onChange: e => {
      var _e$target;

      onCheckedChange(!((_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.checked) ? checkState === null || checkState === void 0 ? void 0 : checkState.checkedList.filter(value => (value === null || value === void 0 ? void 0 : value.key) !== (source === null || source === void 0 ? void 0 : source.key)) : checkState === null || checkState === void 0 ? void 0 : checkState.checkedList.concat(source));
    },
    checked: checked
  }))), columnKeys.map(value => {
    const retrieved = columns.find(c => (c === null || c === void 0 ? void 0 : c.key) === value);
    const presentationType = retrieved === null || retrieved === void 0 ? void 0 : retrieved.presentationType;
    const presentationColor = retrieved === null || retrieved === void 0 ? void 0 : retrieved.presentationColor;
    const data = source[value];
    return presentationHOC({
      extraColumnsLength,
      columnKeys,
      columnType: retrieved === null || retrieved === void 0 ? void 0 : retrieved.type
    })(React.createElement(Presentation, {
      data: data,
      presentationColor: presentationColor,
      presentationType: presentationType,
      actionCallback: retrieved === null || retrieved === void 0 ? void 0 : retrieved.actionCallback,
      actionPresentationType: retrieved === null || retrieved === void 0 ? void 0 : retrieved.actionPresentationType,
      columnType: retrieved === null || retrieved === void 0 ? void 0 : retrieved.type,
      bold: retrieved === null || retrieved === void 0 ? void 0 : retrieved.bold,
      actionTitle: retrieved === null || retrieved === void 0 ? void 0 : retrieved.actionTitle,
      source: source,
      dateFormat: retrieved === null || retrieved === void 0 ? void 0 : retrieved.dateFormat
    }));
  }), React.createElement("td", {
    style: {
      width: 64
    },
    className: '___table-row'
  }, React.createElement("div", {
    className: '___table-utility'
  }, React.createElement(CellMenu, {
    showDrawer: showDrawer
  })))), React.createElement(Drawer, {
    title: source[columnKeys[0]],
    placement: 'left',
    closable: true,
    onClose: onClose,
    visible: drawerVisible,
    key: 'Table-View-Drawer',
    width: '40%'
  }, React.createElement("p", null, "Some contents..."), React.createElement("p", null, "Some contents..."), React.createElement("p", null, "Some contents...")));
});

const Align = props => {
  const {
    children,
    type,
    alignCenter,
    alignStart,
    alignEnd,
    justifyCenter,
    justifyBetween,
    justifyEvenly,
    justifyStart,
    justifyEnd,
    justifyAround,
    style,
    className,
    id
  } = props;
  return React.createElement("div", {
    id: id || '',
    style: { ...style,
      display: 'flex',
      flexFlow: type || 'row',
      ...(alignCenter ? {
        alignItems: 'center'
      } : {}),
      ...(alignEnd ? {
        alignItems: 'flex-end'
      } : {}),
      ...(alignStart ? {
        alignItems: 'flex-start'
      } : {}),
      ...(justifyCenter ? {
        justifyContent: 'center'
      } : {}),
      ...(justifyAround ? {
        justifyContent: 'space-around'
      } : {}),
      ...(justifyBetween ? {
        justifyContent: 'space-between'
      } : {}),
      ...(justifyEnd ? {
        justifyContent: 'flex-end'
      } : {}),
      ...(justifyStart ? {
        justifyContent: 'flex-start'
      } : {}),
      ...(justifyEvenly ? {
        justifyContent: 'space-evenly'
      } : {})
    },
    className: className || ''
  }, children);
};

const Padding = props => {
  const {
    left,
    right,
    top,
    bottom,
    children,
    style = {},
    className,
    vertical,
    horizontal
  } = props;
  return React.createElement("div", {
    style: {
      paddingLeft: left || horizontal || 0,
      paddingRight: right || horizontal || 0,
      paddingTop: top || vertical || 0,
      paddingBottom: bottom || vertical || 0,
      ...style
    },
    className: className || ''
  }, children);
};

const Margin = props => {
  const {
    left,
    right,
    top,
    bottom,
    children,
    style = {},
    className,
    vertical,
    horizontal
  } = props;
  return React.createElement("div", {
    style: {
      marginLeft: left || horizontal || 0,
      marginRight: right || horizontal || 0,
      marginTop: top || vertical || 0,
      marginBottom: bottom || vertical || 0,
      ...style
    },
    className: className || ''
  }, children);
};

const Position = props => {
  const {
    children,
    type,
    top,
    bottom,
    left,
    right,
    style,
    className
  } = props;
  return React.createElement("div", {
    style: { ...style,
      position: type || 'relative',
      top: !isUndefined(top) && !isNull(top) ? top : 'auto',
      bottom: !isUndefined(bottom) && !isNull(bottom) ? bottom : 'auto',
      right: !isUndefined(right) && !isNull(right) ? right : 'auto',
      left: !isUndefined(left) && !isNull(left) ? left : 'auto'
    },
    className: className || ''
  }, children);
};

var TableBody = (props => {
  const {
    columns,
    columnKeys,
    dataSource,
    checkState,
    onCheckedChange,
    isLoadingContent,
    useSkeletonLoader
  } = props;
  return React.createElement(motion.tbody, {
    className: '___table-body'
  }, isLoadingContent && React.createElement(motion.tr, {
    exit: {
      opacity: 0
    },
    animate: {
      opacity: 1
    },
    initial: {
      opacity: 0
    },
    style: {
      width: '100%',
      padding: 10
    }
  }, React.createElement(motion.td, {
    colSpan: columnKeys.length + 1,
    style: {
      padding: 10
    }
  }, useSkeletonLoader ? React.createElement("div", {
    style: {
      height: 450
    }
  }, ' ', React.createElement(Skeleton, {
    active: true
  }), React.createElement(Skeleton, {
    active: true
  }), React.createElement(Skeleton, {
    active: true
  })) : React.createElement(Align, {
    alignCenter: true,
    justifyCenter: true,
    style: {
      height: 450
    },
    children: [React.createElement(LoadingOutlined, {
      key: 'loading-0',
      style: {
        fontSize: 40,
        color: 'var(--accent)'
      },
      spin: true
    })]
  }))), !isLoadingContent && isEmpty(dataSource) && React.createElement(motion.td, {
    exit: {
      opacity: 0
    },
    animate: {
      opacity: 1
    },
    initial: {
      opacity: 0
    },
    style: {
      width: '100%',
      padding: 10
    },
    colSpan: columnKeys.length + 1
  }, React.createElement(Align, {
    style: {
      height: 450
    },
    alignCenter: true,
    justifyCenter: true,
    children: [React.createElement(Empty, {
      key: 'empty-0',
      image: Empty.PRESENTED_IMAGE_SIMPLE
    })]
  })), !isLoadingContent && !isEmpty(dataSource) && dataSource.map((source, index) => {
    const checked = find(checkState === null || checkState === void 0 ? void 0 : checkState.checkedList, ['key', source === null || source === void 0 ? void 0 : source.key]) !== undefined;
    return React.createElement(TableCell, {
      columns: columns.selected,
      checked: checked,
      onCheckedChange: onCheckedChange,
      checkState: checkState,
      columnKeys: columnKeys,
      extraColumnsLength: 1,
      source: source,
      key: `table_cell_${source === null || source === void 0 ? void 0 : source.key}`,
      index: index
    });
  }));
});

var TableFooter = (props => {
  const {
    currentPage,
    handlePagination,
    total,
    isLoadingContent,
    isAnEmptyContent
  } = props;
  return !isLoadingContent && !isAnEmptyContent ? React.createElement(motion.div, {
    className: '___table-footer',
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1
    },
    exit: {
      opacity: 0
    }
  }, React.createElement("div", {
    className: '___table-pagination-container'
  }, React.createElement(Pagination, {
    defaultCurrent: currentPage,
    showQuickJumper: true,
    total: total,
    current: currentPage,
    onChange: handlePagination
  }))) : null;
});

var Table = (props => {
  const {
    columnKeys,
    maxColumns,
    minColumns,
    checkState,
    columns,
    dataSource,
    defaultColumns,
    onCheckAllChange,
    setColumns,
    onCheckedChange,
    tablePages,
    handlePagination,
    isLoadingContent,
    useSkeletonLoader
  } = props;
  return React.createElement("div", {
    className: '___table-wrapper'
  }, React.createElement("table", {
    className: '___table'
  }, React.createElement(TableHead, {
    columns: columns,
    columnKeys: columnKeys,
    onCheckAllChange: onCheckAllChange,
    setColumns: setColumns,
    checkState: checkState,
    maxColumns: maxColumns,
    minColumns: minColumns,
    defaultColumns: defaultColumns
  }), React.createElement(TableBody, {
    columns: columns,
    columnKeys: columnKeys,
    checkState: checkState,
    onCheckedChange: onCheckedChange,
    dataSource: dataSource,
    isLoadingContent: isLoadingContent,
    useSkeletonLoader: useSkeletonLoader
  })), React.createElement(TableFooter, {
    currentPage: tablePages.currentPage,
    handlePagination: handlePagination,
    total: tablePages.all,
    isLoadingContent: isLoadingContent,
    isAnEmptyContent: isEmpty(dataSource)
  }));
});

const useDimension = (type = 'window', elementId = '') => {
  const [dimension, setDimension] = useState({
    height: 0,
    width: 0
  });
  useEffect(() => {
    if (type === 'window') {
      setDimension({
        height: window.innerHeight,
        width: window.innerWidth
      });
    }

    const handleDimensionChange = () => {
      if (type === 'window') {
        setDimension({
          height: window.innerHeight,
          width: window.innerWidth
        });
      }
    };

    if (type === 'window') {
      window.addEventListener('resize', handleDimensionChange);
    }

    return () => type === 'window' ? window.removeEventListener('resize', handleDimensionChange) : null;
  }, []);
  useEffect(() => {
    const handleInitialDimension = () => {
      if (elementId) {
        const element = document.getElementById(elementId);
        setDimension({
          height: (element === null || element === void 0 ? void 0 : element.offsetHeight) || 0,
          width: (element === null || element === void 0 ? void 0 : element.offsetWidth) || 0
        });
      }
    };

    handleInitialDimension();

    const handleDimensionChange = () => {
      if (type === 'element' && elementId) {
        const element = document.getElementById(elementId);
        setDimension({
          height: (element === null || element === void 0 ? void 0 : element.offsetHeight) || 0,
          width: (element === null || element === void 0 ? void 0 : element.offsetWidth) || 0
        });
      }
    };

    if (type === 'element' && elementId) {
      window.addEventListener('resize', handleDimensionChange);
    }

    return () => type === 'element' && elementId ? window.removeEventListener('resize', handleDimensionChange) : null;
  }, []);
  return dimension;
};

const toPercentage = (size = 1, expectedRatio = 1, sub = 0, add = 0) => size * expectedRatio - sub + add;

const initDataManagementState = columns => {
  return {
    filters: columns.slice(0, 3).map((value, index) => {
      return { ...value,
        filterIndex: index,
        filterProps: {
          property: null,
          type: null,
          value: null
        }
      };
    }),
    sorts: [],
    search: {
      where: '',
      what: ''
    }
  };
};

const dataManagementReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FILTER':
      {
        const filterIndex = state.filters.length;
        return { ...state,
          filters: state.filters.concat({ ...action.payload,
            filterIndex
          })
        };
      }

    case 'REMOVE_FILTER':
      return { ...state,
        filters: filter(state.filters, o => {
          var _action$payload;

          return o.filterIndex !== ((_action$payload = action.payload) === null || _action$payload === void 0 ? void 0 : _action$payload.filterIndex);
        })
      };

    case 'UPDATE_FILTER':
      {
        var _action$payload2;

        const filters = state.filters;
        const filterIndex = (_action$payload2 = action.payload) === null || _action$payload2 === void 0 ? void 0 : _action$payload2.filterIndex;
        filters[filterIndex] = action.payload;
        return { ...state,
          filters
        };
      }

    case 'ADD_OR_UPDATE_SEARCH':
      return { ...state,
        search: action.payload
      };

    default:
      return state;
  }
};

const {
  Option
} = Select;
var Search = (props => {
  const {
    columns
  } = props;
  const dimension = useDimension('element', 'search__form__input');
  const [selectedField, setSelectedField] = useState(null);

  const onChange = value => {
    var _columns$all, _columns$all$find;

    const type = (columns === null || columns === void 0 ? void 0 : (_columns$all = columns.all) === null || _columns$all === void 0 ? void 0 : (_columns$all$find = _columns$all.find) === null || _columns$all$find === void 0 ? void 0 : _columns$all$find.call(_columns$all, o => o.key === value)) || null;
    setSelectedField(() => type);
    console.log(`selected`, value, columns, type);
  };

  function onBlur() {
    console.log('blur');
  }

  function onFocus() {
    console.log('focus');
  }

  function onSearch(val) {
    console.log('search:', val);
  }

  const SearchType = () => {
    const displayType = (selectedField === null || selectedField === void 0 ? void 0 : selectedField.type) || 'text';

    if (displayType === 'number') {
      return React.createElement(InputNumber, {
        style: {
          width: toPercentage(dimension.width, 0.45)
        },
        placeholder: 'Search value'
      });
    }

    if (displayType === 'boolean') {
      return React.createElement(Select, {
        defaultValue: 'true',
        optionFilterProp: 'children',
        filterOption: (input, option) => (option || {}).children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
        style: {
          width: toPercentage(dimension.width, 0.45)
        }
      }, React.createElement(Option, {
        value: 'true'
      }, "True"), React.createElement(Option, {
        value: 'false'
      }, "False"));
    }

    if (displayType === 'date') {
      return React.createElement(DatePicker, {
        style: {
          width: toPercentage(dimension.width, 0.45)
        },
        onChange: () => null
      });
    }

    if (displayType === 'datetime') {
      return React.createElement(DatePicker, {
        showTime: true,
        style: {
          width: toPercentage(dimension.width, 0.45)
        },
        onChange: value => console.log(value),
        onOk: value => console.log(`OK ${value}`)
      });
    }

    return React.createElement(Input, {
      style: {
        width: toPercentage(dimension.width, 0.45)
      },
      placeholder: 'Search value'
    });
  };

  return React.createElement(Align, {
    alignCenter: true,
    justifyCenter: true,
    type: 'column',
    style: {
      height: '100%'
    }
  }, React.createElement(Align, {
    style: {
      width: '100%'
    },
    alignCenter: true,
    justifyCenter: true
  }, React.createElement(Padding, {
    top: 30,
    bottom: 60
  }, React.createElement(Typography.Text, {
    style: {
      fontSize: 30
    }
  }, "What are you looking for?"))), React.createElement(Align, {
    style: {
      width: '80%'
    },
    id: 'search__form__input',
    alignCenter: true,
    justifyBetween: true
  }, React.createElement(Padding, {
    right: 20
  }, React.createElement(Align, {
    type: 'column'
  }, React.createElement(Typography.Text, {
    strong: true,
    style: {
      width: toPercentage(dimension.width, 0.4)
    }
  }, "Where"), React.createElement(Padding, {
    top: 30
  }, React.createElement(Select, {
    showSearch: true,
    style: {
      width: toPercentage(dimension.width, 0.4)
    },
    placeholder: 'Select a search field',
    optionFilterProp: 'children',
    onChange: onChange,
    onFocus: onFocus,
    onBlur: onBlur,
    onSearch: onSearch,
    filterOption: (input, option) => (option || {}).children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }, columns.selected.map((value, index) => {
    return React.createElement(Option, {
      value: value.key,
      key: index
    }, value.title);
  }))))), React.createElement(Align, {
    type: 'column'
  }, React.createElement(Typography.Text, {
    strong: true,
    style: {
      width: toPercentage(dimension.width, 0.5)
    }
  }, "What"), React.createElement(Padding, {
    top: 30
  }, React.createElement(SearchType, null)))), React.createElement(Align, {
    style: {
      width: '100%'
    },
    alignCenter: true,
    justifyCenter: true
  }, React.createElement(Padding, {
    top: 60
  }, React.createElement(Button, {
    type: 'primary',
    icon: React.createElement("span", {
      className: 'anticon'
    }, React.createElement("i", {
      className: 'ri-search-2-line',
      style: {
        fontSize: 16
      }
    }))
  }, "Search"))));
});

var TagRender = (props => {
  const {
    label,
    closable,
    onClose
  } = props;
  return React.createElement(Tag, {
    color: 'magenta',
    closable: closable,
    onClose: onClose,
    style: {
      marginRight: 3
    }
  }, label);
});

var RenderFilterType = (props => {
  var _currentData$filterPr;

  const {
    type,
    filterType,
    property,
    dimension,
    handleAutoComplete,
    suffix,
    autoCompleteOptions,
    handleFilterValueChange,
    currentData
  } = props;
  const SuffixStatement = suffix;
  const value = currentData === null || currentData === void 0 ? void 0 : (_currentData$filterPr = currentData.filterProps) === null || _currentData$filterPr === void 0 ? void 0 : _currentData$filterPr.value;
  if ((filterType || '').includes('between')) return React.createElement(Align, {
    style: {
      width: '100%'
    },
    alignCenter: true,
    justifyBetween: true
  }, type === 'date' || type === 'datetime' ? React.createElement(DatePicker, {
    style: {
      width: '45%'
    },
    value: moment(isDate(value === null || value === void 0 ? void 0 : value.start) ? value === null || value === void 0 ? void 0 : value.start : new Date()),
    onChange: date => handleFilterValueChange(moment(date || new Date()).toDate(), 'range', 'start')
  }) : React.createElement(InputNumber, {
    defaultValue: 0,
    value: isNumber(value === null || value === void 0 ? void 0 : value.start) ? value === null || value === void 0 ? void 0 : value.start : 0,
    style: {
      width: '45%'
    },
    onChange: num => handleFilterValueChange(num, 'range', 'end')
  }), React.createElement(SuffixStatement, null), type === 'date' || type === 'datetime' ? React.createElement(DatePicker, {
    style: {
      width: '45%'
    },
    value: moment(isDate(value === null || value === void 0 ? void 0 : value.end) ? value === null || value === void 0 ? void 0 : value.end : new Date()),
    onChange: date => handleFilterValueChange(moment(date || new Date()).toDate(), 'range', 'start')
  }) : React.createElement(InputNumber, {
    defaultValue: 0,
    style: {
      width: '45%'
    },
    value: isNumber(value === null || value === void 0 ? void 0 : value.end) ? value === null || value === void 0 ? void 0 : value.end : 0,
    onChange: num => handleFilterValueChange(num, 'range', 'end')
  }));

  switch (type) {
    case 'number':
      return React.createElement(InputNumber, {
        defaultValue: 0,
        value: isNumber(value) ? value : 0,
        style: {
          width: '100%'
        },
        onChange: num => handleFilterValueChange(num)
      });

    case 'date':
      return React.createElement(DatePicker, {
        style: {
          width: '100%'
        },
        value: moment(isDate(value) ? value : new Date()),
        onChange: date => handleFilterValueChange(moment(date || new Date()).toDate())
      });

    case 'datetime':
      return React.createElement(DatePicker, {
        showTime: true,
        style: {
          width: '100%'
        },
        value: moment(isDate(value) ? value : new Date()),
        onChange: date => handleFilterValueChange(moment(date || new Date()).toDate())
      });

    case 'list':
      if (has(property, 'listMenu') && !isEmpty(property === null || property === void 0 ? void 0 : property.listMenu)) {
        var _property$title;

        return React.createElement(Select, {
          mode: (property === null || property === void 0 ? void 0 : property.multiple) ? 'multiple' : undefined,
          style: {
            width: toPercentage(dimension.width, 0.4)
          },
          placeholder: (property === null || property === void 0 ? void 0 : property.title) ? `Select ${property === null || property === void 0 ? void 0 : (_property$title = property.title) === null || _property$title === void 0 ? void 0 : _property$title.toLowerCase()}` : '',
          value: value || undefined,
          onChange: value => handleFilterValueChange(value),
          filterOption: true,
          options: (property === null || property === void 0 ? void 0 : property.listMenu) || [],
          showSearch: true,
          showArrow: true,
          tagRender: TagRender
        });
      } else return null;

    default:
      if (property.autoComplete) {
        var _property$title2, _property$title2$toLo;

        return React.createElement(AutoComplete, {
          options: autoCompleteOptions,
          onSelect: value => handleFilterValueChange(value),
          onSearch: handleAutoComplete,
          style: {
            width: '100%'
          },
          placeholder: (property === null || property === void 0 ? void 0 : property.title) ? `Specify ${(_property$title2 = property.title) === null || _property$title2 === void 0 ? void 0 : (_property$title2$toLo = _property$title2.toLowerCase) === null || _property$title2$toLo === void 0 ? void 0 : _property$title2$toLo.call(_property$title2)}` : ''
        });
      } else {
        var _property$title3, _property$title3$toLo;

        return React.createElement(Input, {
          style: {
            width: '100%'
          },
          value: value,
          onChange: e => handleFilterValueChange(e.target.value),
          placeholder: (property === null || property === void 0 ? void 0 : property.title) ? `Specify ${(_property$title3 = property.title) === null || _property$title3 === void 0 ? void 0 : (_property$title3$toLo = _property$title3.toLowerCase) === null || _property$title3$toLo === void 0 ? void 0 : _property$title3$toLo.call(_property$title3)}` : ''
        });
      }

  }
});

const {
  Option: Option$1
} = Select;
var FilterItem = (props => {
  var _evalType, _evalType$, _ref, _ref$map, _ref2;

  const {
    columns,
    filterData,
    logicType,
    isLastIndex,
    isMoreThanOne,
    isFirstIndex,
    dataSource,
    dispatch,
    dimension
  } = props;
  const validColumns = useMemo(() => columns.selected.filter(o => o.type !== 'action'), [columns.selected]);
  const stringFilters = [{
    label: 'Equals',
    value: 'equals'
  }, {
    label: 'Does not equal',
    value: 'does not equal'
  }, {
    label: 'Begins with',
    value: 'begins with'
  }, {
    label: 'Ends with',
    value: 'ends with'
  }, {
    label: 'Contains',
    value: 'contains'
  }, {
    label: 'Does not contains',
    value: 'does not contains'
  }];
  const numberFilters = [{
    label: 'Equals to',
    value: 'equals'
  }, {
    label: 'Greater than',
    value: 'greater than'
  }, {
    label: 'Less than',
    value: 'less than'
  }, {
    label: 'In between',
    value: 'in between'
  }];
  const dateFilters = [{
    label: 'more than',
    value: 'more than'
  }, {
    label: 'less than',
    value: 'less than'
  }, {
    label: 'on',
    value: 'on'
  }, {
    label: 'between',
    value: 'between'
  }];
  const booleanFilters = [{
    label: 'True',
    value: 'true'
  }, {
    label: 'False',
    value: 'false'
  }];
  const listFilters = [{
    label: 'Equals',
    value: 'equals'
  }, {
    label: 'Does not equal',
    value: 'does not equal'
  }];

  const evalType = type => {
    if (type === 'number') return numberFilters;
    if (type === 'boolean') return booleanFilters;
    if (type === 'date' || type === 'datetime') return dateFilters;
    if (type === 'list') return listFilters;
    return stringFilters;
  };

  const [property, setProperty] = useState(filterData);
  const [filterType, setFilterType] = useState(((_evalType = evalType(property === null || property === void 0 ? void 0 : property.type)) === null || _evalType === void 0 ? void 0 : (_evalType$ = _evalType[0]) === null || _evalType$ === void 0 ? void 0 : _evalType$.value) || '');
  const [autoCompleteProps, setAutoCompleteProps] = useState(null);
  const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);
  const type = (property === null || property === void 0 ? void 0 : property.type) || 'text';
  const handleAutoCompleteResource = useCallback((acc, current, index) => {
    const currentValue = current[(property === null || property === void 0 ? void 0 : property.key) || ''] || '';
    const tokenize = currentValue.trim().split(' ').join('_');
    return index === 0 ? acc.concat(tokenize) : acc.concat(`\n${tokenize}`);
  }, [property]);
  useEffect(() => {
    if (type === 'text' && (property === null || property === void 0 ? void 0 : property.autoComplete)) {
      setAutoCompleteProps(dataSource.reduce(handleAutoCompleteResource, ''));
    }
  }, [dataSource, handleAutoCompleteResource, property, type]);

  const handleAutoComplete = value => {
    const regex = new RegExp(`(^|\\s)${value}+(?:\\w)*(\\s|$)|(^|\\s)\\w+(?:\\w)*(?:_)${value}+(?:\\w)*(\\s|$)`, 'gim');
    const options = autoCompleteProps === null || autoCompleteProps === void 0 ? void 0 : autoCompleteProps.match(regex);

    if (options) {
      setAutoCompleteOptions((options || []).map(o => ({
        value: o.split('_').join(' ').trim()
      })));
    }
  };

  const handleFilterRemoval = filterIndex => {
    dispatch({
      type: 'REMOVE_FILTER',
      payload: {
        filterIndex
      }
    });
  };

  const handlePropertyChange = value => {
    const key = value;
    const newProperty = columns.all.find(o => o.key === key);
    setProperty(prevState => ({ ...prevState,
      ...newProperty,
      filterProps: {
        property: null,
        type: null,
        value: null
      }
    }));
  };

  const handleFilterValueChange = (value, valueType = 'fixed', rangePosition) => {
    if (valueType === 'range' && rangePosition) {
      const _filterProps = {
        property: property === null || property === void 0 ? void 0 : property.key,
        type: filterType,
        value: { ...filterData.filterProps.value,
          [rangePosition]: value
        }
      };
      dispatch({
        type: 'UPDATE_FILTER',
        payload: { ...filterData,
          filterProps: _filterProps
        }
      });
      return null;
    }

    const filterProps = {
      property: property === null || property === void 0 ? void 0 : property.key,
      type: filterType,
      value
    };
    dispatch({
      type: 'UPDATE_FILTER',
      payload: { ...filterData,
        filterProps
      }
    });
    return null;
  };

  const PrefixStatement = () => {
    const prefix = () => {
      if (type === 'number' || type === 'boolean' || type === 'date' || type === 'datetime') return 'is';
      return null;
    };

    return type !== 'text' && type !== 'list' ? React.createElement(Margin, {
      right: 20
    }, React.createElement(Tag, {
      style: {
        height: 32,
        lineHeight: '32px'
      },
      color: 'processing'
    }, prefix())) : null;
  };

  const SuffixStatement = () => {
    const suffix = () => {
      if ((type === 'number' || type === 'date' || type === 'datetime') && (filterType || '').includes('between')) return 'and';
      return null;
    };

    return (type === 'number' || type === 'date' || type === 'datetime') && (filterType || '').includes('between') ? React.createElement(Margin, {
      horizontal: 20
    }, React.createElement(Tag, {
      style: {
        height: 32,
        lineHeight: '32px'
      },
      color: 'processing'
    }, suffix())) : null;
  };

  return React.createElement(Align, {
    justifyCenter: true,
    style: {
      width: '100%'
    },
    type: 'column'
  }, isFirstIndex && React.createElement(Align, {
    justifyCenter: true,
    alignCenter: true,
    type: 'column',
    style: {
      width: 'fit-content'
    }
  }, React.createElement(Tag, {
    color: 'processing'
  }, "FIND DATA WHERE"), React.createElement("div", {
    style: {
      height: 20,
      width: 5,
      borderLeft: '1.5px solid var(--border)'
    }
  })), React.createElement(Margin, {
    style: {
      width: '100%'
    }
  }, React.createElement(Align, {
    alignCenter: true,
    style: {
      width: '100%'
    }
  }, React.createElement(Margin, {
    right: 20
  }, React.createElement(Select, {
    showSearch: true,
    style: {
      width: toPercentage(dimension.width, type === 'boolean' ? 0.45 : 0.3)
    },
    placeholder: 'Select a property',
    onChange: handlePropertyChange,
    value: property === null || property === void 0 ? void 0 : property.key,
    filterOption: true
  }, (_ref = validColumns || []) === null || _ref === void 0 ? void 0 : (_ref$map = _ref.map) === null || _ref$map === void 0 ? void 0 : _ref$map.call(_ref, (value, index) => {
    return React.createElement(Option$1, {
      value: value.key,
      key: index
    }, value.title);
  }))), React.createElement(Margin, {
    right: 20
  }, React.createElement(Align, {
    alignCenter: true
  }, React.createElement(PrefixStatement, null), React.createElement(Select, {
    style: {
      width: toPercentage(dimension.width, type === 'boolean' ? 0.41 : 0.2)
    },
    onChange: value => setFilterType(value),
    value: filterType || ''
  }, (evalType((property === null || property === void 0 ? void 0 : property.type) || 'text') || stringFilters).map(({
    value,
    label
  }, index) => {
    return React.createElement(Option$1, {
      value: value,
      key: index
    }, label);
  })))), type !== 'boolean' && React.createElement(Align, {
    alignCenter: true,
    style: {
      width: toPercentage(dimension.width, 0.5)
    }
  }, React.createElement(RenderFilterType, {
    autoCompleteOptions: autoCompleteOptions,
    suffix: SuffixStatement,
    property: property,
    filterType: filterType,
    dimension: dimension,
    type: type,
    handleAutoComplete: handleAutoComplete,
    handleFilterValueChange: handleFilterValueChange,
    currentData: filterData
  })), React.createElement(Tooltip, {
    title: 'Remove'
  }, React.createElement(Button, {
    type: 'link',
    danger: true,
    onClick: () => handleFilterRemoval(filterData.filterIndex)
  }, React.createElement("span", {
    className: 'anticon'
  }, React.createElement("i", {
    className: 'ri-delete-bin-2-line',
    style: {
      fontSize: 16
    }
  })))))), !isLastIndex && isMoreThanOne && React.createElement(Align, {
    justifyCenter: true,
    alignCenter: true,
    type: 'column',
    style: {
      width: 'fit-content'
    }
  }, React.createElement("div", {
    style: {
      height: 20,
      width: 5,
      borderLeft: '1.5px solid var(--border)'
    }
  }), React.createElement(Tag, {
    color: 'processing'
  }, (_ref2 = logicType || '') === null || _ref2 === void 0 ? void 0 : _ref2.toUpperCase()), React.createElement("div", {
    style: {
      height: 20,
      width: 5,
      borderLeft: '1.5px solid var(--border)'
    }
  })));
});

var Filter = (props => {
  const {
    columns,
    dataSource,
    dispatch,
    state
  } = props;
  const windowDimension = useDimension();
  const dimension = useDimension('element', 'filter__field__container');
  const [logicType, setLogicType] = useState('or');
  const filterDataLength = state.filters.length;
  return React.createElement(PerfectScrollbar, null, React.createElement(Padding, {
    horizontal: 20,
    style: {
      height: toPercentage(windowDimension.height, 0.65, 80)
    }
  }, React.createElement(Align, {
    alignCenter: true,
    justifyCenter: true,
    style: {
      width: '100%'
    }
  }, React.createElement(Padding, {
    bottom: 20
  }, React.createElement(Radio.Group, {
    onChange: e => setLogicType(e.target.value),
    value: logicType,
    optionType: 'button',
    buttonStyle: 'solid'
  }, React.createElement(Tooltip, {
    title: "Returns result if there's a match for any of the queries (read guide below)."
  }, React.createElement(Radio, {
    value: 'or'
  }, "Match any query")), React.createElement(Tooltip, {
    title: "Returns result if there's a match for all of the queries  (read guide below)."
  }, React.createElement(Radio, {
    value: 'and'
  }, "Match all queries"))))), React.createElement(Align, {
    style: {
      width: '100%',
      paddingBottom: 20
    },
    type: 'column',
    alignCenter: true,
    justifyCenter: true,
    id: 'filter__field__container'
  }, ((state === null || state === void 0 ? void 0 : state.filters) || []).map((data, index) => {
    return React.createElement(FilterItem, {
      key: (data === null || data === void 0 ? void 0 : data.filterIndex) || index,
      columns: columns,
      filterData: data,
      logicType: logicType,
      isLastIndex: index === filterDataLength - 1,
      isMoreThanOne: filterDataLength > 1,
      isFirstIndex: index === 0,
      dataSource: dataSource,
      dispatch: dispatch,
      dimension: dimension
    });
  }))));
});

var Sort = (() => {
  return React.createElement("div", null, "Hello Sort");
});

const {
  TabPane
} = Tabs;
var DataManagement = (props => {
  const {
    visible,
    handleCancel,
    columns,
    dataSource
  } = props;
  const [activeTab, setActiveTab] = useState('filter');
  const [state, dispatch] = useReducer(dataManagementReducer, columns.selected, initDataManagementState);
  console.log(state);
  const dimension = useDimension();

  const ModalFooter = props => {
    const {
      activeTab,
      dispatch,
      state
    } = props;

    if (activeTab === 'search') {
      return React.createElement(Align, {
        style: {
          width: '100%'
        },
        alignCenter: true,
        justifyBetween: true
      }, React.createElement(Popover, {
        style: {
          width: 240
        },
        title: React.createElement("strong", {
          style: {
            color: 'var(--text-color)'
          }
        }, "Using the search"),
        content: React.createElement("p", {
          style: {
            width: 240,
            fontSize: 13,
            color: 'var(--text-color)'
          }
        }, "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."),
        trigger: 'click'
      }, React.createElement(Tooltip, {
        title: 'Help'
      }, React.createElement(Button, {
        type: 'link'
      }, React.createElement("span", {
        className: 'anticon'
      }, React.createElement("i", {
        className: 'ri-question-line',
        style: {
          fontSize: 20
        }
      }))))), React.createElement(Button, null, "Clear search"));
    }

    if (activeTab === 'filter') {
      const addFilter = () => {
        dispatch({
          type: 'ADD_FILTER',
          payload: {
            filterProps: {
              property: null,
              type: null,
              value: null
            }
          }
        });
      };

      const applyFilter = () => {
        console.log(state === null || state === void 0 ? void 0 : state.filters);
      };

      return React.createElement(Align, {
        style: {
          width: '100%'
        },
        alignCenter: true,
        justifyBetween: true
      }, React.createElement(Align, {
        alignCenter: true
      }, React.createElement(Popover, {
        style: {
          width: 240
        },
        title: React.createElement("strong", {
          style: {
            color: 'var(--text-color)'
          }
        }, "Using the filter"),
        content: React.createElement("p", {
          style: {
            width: 240,
            fontSize: 13,
            color: 'var(--text-color)'
          }
        }, "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."),
        trigger: 'click'
      }, React.createElement(Tooltip, {
        title: 'Help'
      }, React.createElement(Button, {
        type: 'link'
      }, React.createElement("span", {
        className: 'anticon'
      }, React.createElement("i", {
        className: 'ri-question-line',
        style: {
          fontSize: 20
        }
      }))))), React.createElement(Margin, {
        left: 20
      }, React.createElement(Button, {
        type: 'primary',
        icon: React.createElement("span", {
          className: 'anticon'
        }, React.createElement("i", {
          className: 'ri-add-line',
          style: {
            fontSize: 16
          }
        })),
        onClick: addFilter
      }, "Add Filter"))), React.createElement(Align, null, ' ', React.createElement(Button, null, "Clear filter"), React.createElement(Margin, {
        left: 20
      }, React.createElement(Button, {
        icon: React.createElement("span", {
          className: 'anticon'
        }, React.createElement("i", {
          className: 'ri-filter-line',
          style: {
            fontSize: 16
          }
        })),
        onClick: applyFilter,
        type: 'primary'
      }, "Apply filter"))));
    }

    if (activeTab === 'sort') {
      return React.createElement(Align, {
        style: {
          width: '100%'
        },
        alignCenter: true,
        justifyBetween: true
      }, React.createElement(Align, {
        alignCenter: true
      }, React.createElement(Popover, {
        style: {
          width: 240
        },
        title: React.createElement("strong", {
          style: {
            color: 'var(--text-color)'
          }
        }, "Using the sort"),
        content: React.createElement("p", {
          style: {
            width: 240,
            fontSize: 13,
            color: 'var(--text-color)'
          }
        }, "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."),
        trigger: 'click'
      }, React.createElement(Tooltip, {
        title: 'Help'
      }, React.createElement(Button, {
        type: 'link'
      }, React.createElement("span", {
        className: 'anticon'
      }, React.createElement("i", {
        className: 'ri-question-line',
        style: {
          fontSize: 20
        }
      }))))), React.createElement(Margin, {
        left: 20
      }, React.createElement(Button, {
        type: 'primary',
        icon: React.createElement("span", {
          className: 'anticon'
        }, React.createElement("i", {
          className: 'ri-add-line',
          style: {
            fontSize: 16
          }
        }))
      }, "Add sort"))), React.createElement(Align, null, ' ', React.createElement(Button, null, "Clear sort"), React.createElement(Margin, {
        left: 20
      }, React.createElement(Button, {
        icon: React.createElement("span", {
          className: 'anticon'
        }, React.createElement("i", {
          className: 'ri-sort-desc',
          style: {
            fontSize: 16
          }
        })),
        type: 'primary'
      }, "Apply sort"))));
    }

    return null;
  };

  return React.createElement(Modal, {
    visible: visible,
    title: 'Data Management',
    onCancel: handleCancel,
    centered: true,
    width: '75%',
    bodyStyle: {
      height: dimension.height * 0.65,
      padding: 0
    },
    footer: [React.createElement(ModalFooter, {
      key: 'modal-footer',
      activeTab: activeTab,
      dispatch: dispatch,
      state: state
    })]
  }, React.createElement(Tabs, {
    defaultActiveKey: 'filter',
    centered: true,
    tabBarStyle: {
      height: 50
    },
    tabBarGutter: 40,
    onChange: key => setActiveTab(key)
  }, React.createElement(TabPane, {
    tab: 'Search',
    key: 'search'
  }, React.createElement(motion.div, {
    layout: true
  }, React.createElement(Search, {
    columns: columns
  }))), React.createElement(TabPane, {
    tab: 'Filter',
    key: 'filter'
  }, React.createElement(Filter, {
    columns: columns,
    dataSource: dataSource,
    dispatch: dispatch,
    state: state
  })), React.createElement(TabPane, {
    tab: 'Sort',
    key: 'sort'
  }, React.createElement(Sort, null))));
});

var Header = (props => {
  const {
    dataSource,
    columns,
    renderOrder: {
      pageRenderOrder,
      setPageRenderOrder
    }
  } = props;
  const [filterColumn, setFilterColumn] = useState({
    visible: false
  });

  const handleFilterColumnCancel = () => {
    setFilterColumn(prev => ({ ...prev,
      visible: false
    }));
  };

  return React.createElement("div", {
    className: '___table-container-header'
  }, React.createElement("div", {
    className: '___table-container-header-inner-left'
  }, React.createElement("div", {
    className: '___table-filter-radio-sort'
  }, React.createElement(Tooltip, {
    title: 'Manage data'
  }, React.createElement(Button, {
    icon: React.createElement("span", {
      className: 'anticon'
    }, React.createElement("i", {
      className: 'ri-database-2-line',
      style: {
        fontSize: 17
      }
    })),
    onClick: () => {
      setFilterColumn(prev => ({ ...prev,
        visible: true
      }));
    },
    type: 'primary'
  }, "Data Management")), React.createElement(DataManagement, {
    visible: filterColumn.visible,
    handleCancel: handleFilterColumnCancel,
    columns: columns,
    dataSource: dataSource
  })), React.createElement("div", {
    className: '___table-filter-btn-container'
  }, React.createElement(TableControls.ControlActions, null))), React.createElement("div", {
    className: '___table-container-header-inner-right'
  }, React.createElement(TableControls.ColumnDensity, null), React.createElement(TableControls.RenderOrder, {
    renderOrder: pageRenderOrder,
    setRenderOrder: setPageRenderOrder
  })));
});

const initQuickFilterState = columns => {
  return {
    filters: columns.slice(0, 4).map((value, index) => {
      return { ...value,
        filterIndex: index,
        property: value === null || value === void 0 ? void 0 : value.key,
        value: null
      };
    })
  };
};

const quickFilterReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FILTER':
      {
        const filterIndex = state.filters.length;
        return { ...state,
          filters: state.filters.concat({ ...action.payload,
            filterIndex
          })
        };
      }

    case 'REMOVE_FILTER':
      return { ...state,
        filters: filter(state.filters, o => {
          var _action$payload;

          return o.filterIndex !== ((_action$payload = action.payload) === null || _action$payload === void 0 ? void 0 : _action$payload.filterIndex);
        })
      };

    case 'UPDATE_FILTER':
      {
        var _action$payload2;

        const filters = state.filters;
        const filterIndex = (_action$payload2 = action.payload) === null || _action$payload2 === void 0 ? void 0 : _action$payload2.filterIndex;
        filters[filterIndex] = action.payload;
        return { ...state,
          filters
        };
      }

    case 'RESET':
      return {
        filters: []
      };

    default:
      return state;
  }
};

var RenderQuickFilterType = (props => {
  const {
    type,
    property,
    handleAutoComplete,
    autoCompleteOptions,
    handleFilterValueChange
  } = props;
  const value = property === null || property === void 0 ? void 0 : property.value;

  switch (type) {
    case 'number':
      return React.createElement(InputNumber, {
        defaultValue: 0,
        value: isNumber(value) ? value : 0,
        style: {
          width: '100%'
        },
        onChange: num => handleFilterValueChange(num)
      });

    case 'date':
      return React.createElement(DatePicker, {
        style: {
          width: '100%'
        },
        value: moment(isDate(value) ? value : new Date()),
        onChange: date => handleFilterValueChange(moment(date || new Date()).toDate())
      });

    case 'datetime':
      return React.createElement(DatePicker, {
        showTime: true,
        style: {
          width: '100%'
        },
        value: moment(isDate(value) ? value : new Date()),
        onChange: date => handleFilterValueChange(moment(date || new Date()).toDate())
      });

    case 'list':
      if (has(property, 'listMenu') && !isEmpty(property === null || property === void 0 ? void 0 : property.listMenu)) {
        var _property$title;

        return React.createElement(Select, {
          mode: (property === null || property === void 0 ? void 0 : property.multiple) ? 'multiple' : undefined,
          style: {
            width: '100%'
          },
          placeholder: (property === null || property === void 0 ? void 0 : property.title) ? `Select ${property === null || property === void 0 ? void 0 : (_property$title = property.title) === null || _property$title === void 0 ? void 0 : _property$title.toLowerCase()}` : '',
          value: value || undefined,
          onChange: value => handleFilterValueChange(value),
          filterOption: true,
          options: (property === null || property === void 0 ? void 0 : property.listMenu) || [],
          showSearch: true,
          showArrow: true,
          tagRender: TagRender
        });
      } else return null;

    default:
      if (property.autoComplete) {
        var _property$title2, _property$title2$toLo;

        return React.createElement(AutoComplete, {
          options: autoCompleteOptions,
          onSelect: value => handleFilterValueChange(value),
          onSearch: handleAutoComplete,
          style: {
            width: '100%'
          },
          placeholder: (property === null || property === void 0 ? void 0 : property.title) ? `Specify ${(_property$title2 = property.title) === null || _property$title2 === void 0 ? void 0 : (_property$title2$toLo = _property$title2.toLowerCase) === null || _property$title2$toLo === void 0 ? void 0 : _property$title2$toLo.call(_property$title2)}` : ''
        });
      } else {
        var _property$title3, _property$title3$toLo;

        return React.createElement(Input, {
          style: {
            width: '100%'
          },
          value: value,
          onChange: e => handleFilterValueChange(e.target.value),
          placeholder: (property === null || property === void 0 ? void 0 : property.title) ? `Specify ${(_property$title3 = property.title) === null || _property$title3 === void 0 ? void 0 : (_property$title3$toLo = _property$title3.toLowerCase) === null || _property$title3$toLo === void 0 ? void 0 : _property$title3$toLo.call(_property$title3)}` : ''
        });
      }

  }
});

var QuickFilterItem = (props => {
  const {
    dataSource,
    property,
    dispatch
  } = props;
  const type = (property === null || property === void 0 ? void 0 : property.type) || 'text';
  const [autoCompleteProps, setAutoCompleteProps] = useState(null);
  const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);
  const handleAutoCompleteResource = useCallback((acc, current, index) => {
    const currentValue = current[(property === null || property === void 0 ? void 0 : property.key) || ''] || '';
    const tokenize = currentValue.trim().split(' ').join('_');
    return index === 0 ? acc.concat(tokenize) : acc.concat(`\n${tokenize}`);
  }, [property]);
  useEffect(() => {
    if (type === 'text' && (property === null || property === void 0 ? void 0 : property.autoComplete)) {
      setAutoCompleteProps(dataSource.reduce(handleAutoCompleteResource, ''));
    }
  }, [dataSource, handleAutoCompleteResource, property, type]);

  const handleAutoComplete = value => {
    const regex = new RegExp(`(^|\\s)${value}+(?:\\w)*(\\s|$)|(^|\\s)\\w+(?:\\w)*(?:_)${value}+(?:\\w)*(\\s|$)`, 'gim');
    const options = autoCompleteProps === null || autoCompleteProps === void 0 ? void 0 : autoCompleteProps.match(regex);

    if (options) {
      setAutoCompleteOptions((options || []).map(o => ({
        value: o.split('_').join(' ').trim()
      })));
    }
  };

  const handleFilterRemoval = filterIndex => {
    dispatch({
      type: 'REMOVE_FILTER',
      payload: {
        filterIndex
      }
    });
  };

  const handleFilterValueChange = value => {
    dispatch({
      type: 'UPDATE_FILTER',
      payload: { ...property,
        value
      }
    });
    return null;
  };

  return React.createElement(Col, {
    span: 6
  }, React.createElement(motion.div, {
    layout: true
  }, React.createElement(Align, {
    justifyCenter: true,
    type: 'column',
    style: {
      width: '100%'
    }
  }, React.createElement(Padding, {
    bottom: 10
  }, React.createElement(Align, {
    style: {
      width: '100%'
    },
    justifyBetween: true,
    alignCenter: true
  }, React.createElement("span", {
    className: 'filter-title'
  }, (property === null || property === void 0 ? void 0 : property.title) || '⏤⏤⏤⏤'), React.createElement(Tooltip, {
    title: 'Remove filter'
  }, React.createElement(Button, {
    type: 'text',
    onClick: () => handleFilterRemoval(property.filterIndex),
    icon: React.createElement("span", {
      className: 'anticon'
    }, React.createElement("i", {
      className: 'ri-close-line'
    }))
  })))), React.createElement(RenderQuickFilterType, {
    property: property,
    autoCompleteOptions: autoCompleteOptions,
    type: type,
    handleAutoComplete: handleAutoComplete,
    handleFilterValueChange: handleFilterValueChange
  }))));
});

const {
  Panel
} = Collapse;
const EmptyImage = React.createElement("svg", {
  xmlns: 'http://www.w3.org/2000/svg',
  width: '123.58',
  height: '66.37',
  viewBox: '0 0 123.58 66.37'
}, React.createElement("g", {
  transform: 'translate(0 1.25)'
}, React.createElement("path", {
  d: 'M34.04,51.8a5.18,5.18,0,1,1,0-10.36H5.18a5.18,5.18,0,1,1,0-10.36h29.6a5.18,5.18,0,0,0,0-10.36H16.28a5.18,5.18,0,0,1,0-10.36h29.6A5.18,5.18,0,1,1,45.88,0H118.4a5.18,5.18,0,0,1,0,10.36H88.8a5.18,5.18,0,1,1,0,10.36h16.28a5.18,5.18,0,1,1,0,10.36H97.551c-3.607,0-6.531,2.319-6.531,5.179s4.44,5.18,4.44,5.18a5.18,5.18,0,1,1,0,10.36Zm79.18-25.9a5.18,5.18,0,1,1,5.18,5.18A5.18,5.18,0,0,1,113.22,25.9Z',
  transform: 'translate(0 7.4)',
  fill: '#f3f7ff'
}), React.createElement("path", {
  d: 'M21.548,0A8.88,8.88,0,1,0,39.132,0H60.68V19.753a2.22,2.22,0,0,1-2.22,2.22H2.22A2.22,2.22,0,0,1,0,19.753V0Z',
  transform: 'translate(31.08 43.147)',
  fill: '#fff'
}), React.createElement("path", {
  d: 'M39.96,22.94a9.62,9.62,0,0,1-19.24,0q0-.258.013-.513H0L7.075,1.509A2.22,2.22,0,0,1,9.178,0H51.5a2.22,2.22,0,0,1,2.1,1.509L60.68,22.427H39.947Q39.96,22.682,39.96,22.94Z',
  transform: 'translate(31.08 19.98)',
  fill: '#fff'
}), React.createElement("path", {
  d: 'M31.892,16.986A8.468,8.468,0,0,1,23.68,25.16a8.468,8.468,0,0,1-8.212-8.174c0-.133,0-1.005.011-1.136H0L6.039,1.166A1.89,1.89,0,0,1,7.835,0H39.525a1.89,1.89,0,0,1,1.8,1.166L47.36,15.85H31.881C31.888,15.981,31.892,16.853,31.892,16.986Z',
  transform: 'translate(37.74 26.64)',
  fill: '#e8f0fe'
}), React.createElement("g", {
  transform: 'translate(31.08 19.98)',
  fill: 'none',
  strokeLinejoin: 'round',
  strokeMiterlimit: '10'
}, React.createElement("path", {
  d: 'M7.075,1.509A2.22,2.22,0,0,1,9.178,0H51.5a2.22,2.22,0,0,1,2.1,1.509L60.68,22.427V42.18a2.22,2.22,0,0,1-2.22,2.22H2.22A2.22,2.22,0,0,1,0,42.18V22.427Z',
  stroke: 'none'
}), React.createElement("path", {
  d: 'M 9.378589630126953 2.5 L 2.5 22.8382453918457 L 2.5 41.89999771118164 L 58.18000030517578 41.89999771118164 L 58.18000030517578 22.8382453918457 L 51.30142211914062 2.5 L 9.378589630126953 2.5 M 9.177707672119141 0 L 51.50229263305664 0 C 52.45426559448242 0 53.3002815246582 0.6069602966308594 53.60527801513672 1.508747100830078 L 60.68000030517578 22.42690467834473 L 60.68000030517578 42.18000030517578 C 60.68000030517578 43.40606689453125 59.68606567382812 44.39999771118164 58.45999908447266 44.39999771118164 L 2.220001220703125 44.39999771118164 C 0.9939193725585938 44.39999771118164 0 43.40606689453125 0 42.18000030517578 L 0 22.42690467834473 L 7.074718475341797 1.508747100830078 C 7.379718780517578 0.6069602966308594 8.225734710693359 0 9.177707672119141 0 Z',
  stroke: 'none',
  fill: '#75a4fe'
})), React.createElement("path", {
  d: 'M10.473,10.361a9.131,9.131,0,0,1-6.423-2.6A8.723,8.723,0,0,1,1.389,1.481C1.389.963,1.389,0,0,0H20.878c-1.321.032-1.321.974-1.321,1.481A8.723,8.723,0,0,1,16.9,7.76,9.131,9.131,0,0,1,10.473,10.361Z',
  transform: 'translate(50.871 42.179)',
  fill: 'none',
  stroke: '#75a4fe',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeMiterlimit: '10',
  strokeWidth: '2.5'
}), React.createElement("path", {
  d: 'M38.553,3.184,30.34,12.4ZM19.314,0V0ZM0,3.184,8.214,12.4Z',
  transform: 'translate(41.44)',
  fill: 'none',
  stroke: '#a4c3fe',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeMiterlimit: '10',
  strokeWidth: '2.5'
})));
var QuickFilter = (props => {
  const {
    columns,
    dataSource
  } = props;
  const [state, dispatch] = useReducer(quickFilterReducer, columns.selected, initQuickFilterState);

  const addFilter = propertyIndex => {
    const columnProperty = columns.all[parseInt(propertyIndex, 10)];
    dispatch({
      type: 'ADD_FILTER',
      payload: { ...columnProperty,
        property: columnProperty === null || columnProperty === void 0 ? void 0 : columnProperty.key,
        value: null
      }
    });
  };

  const clearFilter = () => dispatch({
    type: 'RESET'
  });

  const applyFilter = () => {
    const filters = state.filters.map(value => pick(value, ['property', 'value']));
    console.log(filters);
    return filters;
  };

  const menu = React.createElement(Menu, {
    onClick: ({
      key
    }) => addFilter(String(key))
  }, columns.all.map((value, index) => {
    return React.createElement(Menu.Item, {
      key: index
    }, (value === null || value === void 0 ? void 0 : value.title) || '_____');
  }));
  return React.createElement("div", {
    className: 'QuickFilter'
  }, React.createElement(Collapse, {
    expandIconPosition: 'right'
  }, React.createElement(Panel, {
    header: React.createElement(Align, {
      alignCenter: true
    }, React.createElement(Margin, {
      right: 20
    }, React.createElement(Typography.Text, null, "Quick Filter"))),
    key: '1'
  }, React.createElement(Align, {
    className: 'filter-container',
    alignCenter: true,
    justifyCenter: isEmpty(state.filters)
  }, isEmpty(state.filters) ? React.createElement(motion.div, {
    layout: true,
    style: {
      width: '100%'
    }
  }, React.createElement(Empty, {
    image: EmptyImage,
    imageStyle: {
      height: 60
    },
    description: 'Please add a filter'
  }, React.createElement(Dropdown, {
    overlay: menu,
    trigger: ['click']
  }, React.createElement(Button, {
    type: 'default',
    icon: React.createElement("span", {
      className: 'anticon'
    }, React.createElement("i", {
      className: 'ri-add-line',
      style: {
        fontSize: 16
      }
    }))
  }, "Add filter")))) : React.createElement(motion.div, {
    layout: true,
    style: {
      width: '100%'
    }
  }, React.createElement(Align, {
    className: 'filter-body',
    type: 'column'
  }, React.createElement(Align, {
    alignStart: true,
    className: 'filter-header'
  }, React.createElement(Dropdown, {
    overlay: menu,
    trigger: ['click']
  }, React.createElement(Button, {
    type: 'link',
    icon: React.createElement("span", {
      className: 'anticon'
    }, React.createElement("i", {
      className: 'ri-add-line',
      style: {
        fontSize: 16
      }
    }))
  }, "Add filter"))), React.createElement(Padding, {
    className: 'filter-elements-wrapper',
    vertical: 16,
    horizontal: 16
  }, React.createElement(Row, {
    gutter: [15, 20]
  }, state.filters.map((property, index) => {
    return React.createElement(QuickFilterItem, {
      key: `${property.type}___${index}`,
      dataSource: dataSource,
      dispatch: dispatch,
      property: property
    });
  }))), React.createElement(Position, {
    type: 'absolute',
    bottom: 0,
    style: {
      width: '100%'
    },
    className: 'filter-footer'
  }, React.createElement(Align, {
    style: {
      width: '100%'
    },
    justifyBetween: true,
    alignCenter: true
  }, React.createElement(Button, {
    type: 'link',
    onClick: clearFilter,
    icon: React.createElement("span", {
      className: 'anticon'
    }, React.createElement("i", {
      className: 'ri-close-line',
      style: {
        fontSize: 16
      }
    }))
  }, "Clear filter"), React.createElement(Button, {
    onClick: applyFilter,
    icon: React.createElement("span", {
      className: 'anticon'
    }, React.createElement("i", {
      className: 'ri-filter-line',
      style: {
        fontSize: 16
      }
    }))
  }, "Apply filter")))))))));
});

const DataTable = props => {
  var _defaultColumns$slice, _defaultColumns$slice2;

  const {
    columns: defaultColumns,
    dataSource,
    minColumns: defaultMinCol,
    maxColumns: defaultMaxCol,
    useSkeletonLoader,
    isLoadingContent,
    pageRenderOrder,
    onRenderOrderChange,
    pagination,
    onPaginationChange
  } = props;
  if (!defaultColumns || !isArray(defaultColumns)) throw new Error(`DataTable expects column to be of type Array, got ${typeof defaultColumns} instead`);
  if (!dataSource || !isArray(dataSource)) throw new Error(`DataTable expects dataSource to be of type Array, got ${typeof dataSource} instead`);
  const minColumns = clamp(defaultMinCol || 3, 3, 6);
  const maxColumns = clamp(defaultMaxCol || 3, minColumns, 6);
  const [columns, setColumns] = useState({
    all: defaultColumns || [],
    selected: (defaultColumns === null || defaultColumns === void 0 ? void 0 : (_defaultColumns$slice = defaultColumns.slice) === null || _defaultColumns$slice === void 0 ? void 0 : _defaultColumns$slice.call(defaultColumns, 0, maxColumns)) || [],
    unselected: (defaultColumns === null || defaultColumns === void 0 ? void 0 : defaultColumns.length) > maxColumns ? defaultColumns === null || defaultColumns === void 0 ? void 0 : (_defaultColumns$slice2 = defaultColumns.slice) === null || _defaultColumns$slice2 === void 0 ? void 0 : _defaultColumns$slice2.call(defaultColumns, maxColumns, defaultColumns.length) : []
  });
  const [checkState, setCheckedState] = useState({
    checkedList: [],
    indeterminate: true,
    checkAll: false
  });

  const onCheckedChange = checkedList => {
    setCheckedState({
      checkedList,
      indeterminate: checkedList.length > 0 && checkedList.length !== dataSource.length,
      checkAll: checkedList.length === dataSource.length
    });
  };

  const onCheckAllChange = e => {
    setCheckedState({
      checkedList: e.target.checked ? dataSource : [],
      indeterminate: false,
      checkAll: e.target.checked
    });
  };

  const columnKeys = useMemo(() => columns.selected.map(value => value === null || value === void 0 ? void 0 : value.key), [columns.selected]);

  const handlePagination = page => {
    onPaginationChange(page);
  };

  return React.createElement("div", {
    className: '___table-container'
  }, React.createElement(Header, {
    columns: columns,
    dataSource: dataSource,
    renderOrder: {
      pageRenderOrder: pageRenderOrder || 15,
      setPageRenderOrder: onRenderOrderChange || null
    }
  }), React.createElement(QuickFilter, {
    columns: columns,
    dataSource: dataSource
  }), React.createElement(Table, {
    setColumns: setColumns,
    handlePagination: handlePagination,
    columns: columns,
    columnKeys: columnKeys,
    checkState: checkState,
    dataSource: dataSource,
    defaultColumns: defaultColumns,
    maxColumns: maxColumns,
    minColumns: minColumns,
    onCheckAllChange: onCheckAllChange,
    onCheckedChange: onCheckedChange,
    tablePages: pagination,
    isLoadingContent: Boolean(isLoadingContent),
    useSkeletonLoader: Boolean(useSkeletonLoader)
  }));
};

export { Align, DataTable, Margin, Padding, Position, toPercentage, useDimension };
//# sourceMappingURL=index.modern.js.map
