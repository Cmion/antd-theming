function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
require('remixicon/fonts/remixicon.css');
var antd = require('antd');
var PerfectScrollbar = _interopDefault(require('react-perfect-scrollbar'));
var lodash = require('lodash');
var reactBeautifulDnd = require('react-beautiful-dnd');
var framerMotion = require('framer-motion');
var icons = require('@ant-design/icons');
var moment = _interopDefault(require('moment'));

var ColumnDensity = (function () {
  var _useState = React.useState('default'),
      value = _useState[0],
      setValue = _useState[1];

  return React__default.createElement("div", {
    style: {
      marginRight: 20
    }
  }, React__default.createElement(antd.Radio.Group, {
    value: value,
    onChange: function onChange(e) {
      return setValue(e.target.value);
    },
    optionType: 'button',
    buttonStyle: 'solid'
  }, React__default.createElement(antd.Radio.Button, {
    value: 'small'
  }, React__default.createElement(antd.Tooltip, {
    title: 'Dense'
  }, React__default.createElement("span", {
    className: 'anticon'
  }, React__default.createElement("i", {
    className: 'ri-align-justify'
  })))), React__default.createElement(antd.Radio.Button, {
    value: 'default'
  }, React__default.createElement(antd.Tooltip, {
    title: 'Default'
  }, React__default.createElement("span", {
    className: 'anticon'
  }, React__default.createElement("i", {
    className: 'ri-menu-line'
  }))))));
});

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var reorder = function reorder(list, startIndex, endIndex) {
  var result = Array.from(list);

  var _result$splice = result.splice(startIndex, 1),
      removed = _result$splice[0];

  result.splice(endIndex, 0, removed);
  return result;
};

var Sortable = (function (props) {
  var setColumns = props.setColumns,
      columns = props.columns,
      maxColumns = props.maxColumns,
      minColumns = props.minColumns;

  var _onChange = function onChange(value, isSelected) {
    setColumns(function (prev) {
      if (isSelected) {
        return {
          selected: prev.selected.filter(function (o) {
            return (o === null || o === void 0 ? void 0 : o.key) !== (value === null || value === void 0 ? void 0 : value.key);
          }),
          unselected: prev.unselected.concat(value),
          all: prev.selected.filter(function (o) {
            return (o === null || o === void 0 ? void 0 : o.key) !== (value === null || value === void 0 ? void 0 : value.key);
          }).concat(prev.unselected.concat(value))
        };
      } else {
        return {
          selected: prev.selected.concat(value),
          unselected: prev.unselected.filter(function (f) {
            return (f === null || f === void 0 ? void 0 : f.key) !== (value === null || value === void 0 ? void 0 : value.key);
          }),
          all: prev.selected.concat(value, prev.unselected.filter(function (f) {
            return (f === null || f === void 0 ? void 0 : f.key) !== (value === null || value === void 0 ? void 0 : value.key);
          }))
        };
      }
    });
  };

  var onDragEnd = function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    var items = reorder(columns.all, result.source.index, result.destination.index);
    setColumns(function (prev) {
      var selected = items.filter(function (value) {
        return !lodash.isEmpty(lodash.find(prev.selected, function (o) {
          return o.key === value.key;
        }));
      });
      var all = selected.concat(items.filter(function (value) {
        return lodash.isEmpty(lodash.find(prev.selected, function (o) {
          return o.key === value.key;
        }));
      }));
      return _extends({}, prev, {
        all: all,
        selected: selected
      });
    });
  };

  var getItemStyle = function getItemStyle(isDragging, draggableStyle) {
    return _extends({
      userSelect: 'none',
      padding: '8px',
      margin: "10px 0",
      background: isDragging ? 'var(--draggable-background-1)' : 'var(--draggable-background-2)',
      border: isDragging ? '1px solid var(--border)' : 0,
      borderRadius: 4
    }, draggableStyle);
  };

  var getListStyle = function getListStyle() {
    return {
      width: '100%'
    };
  };

  return React__default.createElement(reactBeautifulDnd.DragDropContext, {
    onDragEnd: onDragEnd
  }, React__default.createElement(reactBeautifulDnd.Droppable, {
    droppableId: 'droppable'
  }, function (provided) {
    return React__default.createElement("div", Object.assign({}, provided.droppableProps, {
      ref: provided.innerRef,
      style: _extends({}, getListStyle(), {
        height: 350,
        overflowY: 'scroll'
      })
    }), columns.all.map(function (value, index) {
      var isSelected = columns.selected.find(function (o) {
        return (o === null || o === void 0 ? void 0 : o.key) === (value === null || value === void 0 ? void 0 : value.key);
      });
      var dragDisabled = columns.selected.length >= maxColumns && !isSelected || isSelected !== undefined && columns.selected.length <= minColumns;
      return React__default.createElement(reactBeautifulDnd.Draggable, {
        key: "column-item-" + index,
        draggableId: "column-item-" + index,
        index: index,
        isDragDisabled: dragDisabled
      }, function (provided, snapshot) {
        return React__default.createElement("div", Object.assign({
          ref: provided.innerRef
        }, provided.draggableProps, provided.dragHandleProps, {
          style: _extends({}, getItemStyle(snapshot.isDragging, provided.draggableProps.style), {
            pointerEvents: dragDisabled ? 'none' : 'all',
            opacity: dragDisabled ? 0.5 : 2
          })
        }), React__default.createElement("div", {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }
        }, React__default.createElement(antd.Checkbox, {
          disabled: columns.selected.length >= maxColumns && !isSelected || isSelected !== undefined && columns.selected.length <= minColumns,
          checked: isSelected !== undefined || false,
          onChange: function onChange() {
            return _onChange(value, isSelected);
          }
        }, value === null || value === void 0 ? void 0 : value.title), React__default.createElement("span", {
          style: {
            display: 'flex',
            alignItems: 'center'
          }
        }, React__default.createElement("svg", {
          xmlns: 'http://www.w3.org/2000/svg',
          height: '24',
          viewBox: '0 0 24 24',
          width: '24'
        }, React__default.createElement("path", {
          d: 'M0 0h24v24H0V0z',
          fill: 'none'
        }), React__default.createElement("path", {
          fill: snapshot.isDragging ? 'var(--accent)' : 'var(--accent35)',
          d: 'M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z'
        })))));
      });
    }), provided.placeholder);
  }));
});

var ColumnReorder = (function (props) {
  var setColumns = props.setColumns,
      columns = props.columns,
      maxColumns = props.maxColumns,
      minColumns = props.minColumns,
      defaultColumns = props.defaultColumns;
  return React__default.createElement("div", {
    className: '___table-column-filter'
  }, React__default.createElement("div", {
    className: '___table-column-filter-header'
  }, React__default.createElement("span", {
    className: '___table-column-filter-header-text'
  }, "Customize Column")), React__default.createElement(PerfectScrollbar, null, React__default.createElement(Sortable, {
    setColumns: setColumns,
    columns: columns,
    maxColumns: maxColumns,
    minColumns: minColumns
  })), React__default.createElement("div", {
    className: '___table-column-filter-footer'
  }, React__default.createElement(antd.Button, {
    type: 'primary',
    onClick: function onClick() {
      return null;
    },
    style: {
      marginRight: 10
    }
  }, "Save as preset"), React__default.createElement(antd.Button, {
    type: 'dashed',
    onClick: function onClick() {
      setColumns(function () {
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

var RenderOrder = (function (props) {
  var renderOrder = props.renderOrder,
      setRenderOrder = props.setRenderOrder;

  var _useState = React.useState([{
    label: "15 per page",
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
  }]),
      items = _useState[0],
      setItems = _useState[1];

  var _useState2 = React.useState(undefined),
      inputValue = _useState2[0],
      setInputValue = _useState2[1];

  var handleCustomize = function handleCustomize() {
    var findExisting = items.find(function (o) {
      return o.value === inputValue;
    });

    if (!findExisting && inputValue) {
      setItems(function (prev) {
        return [].concat(prev, [{
          label: inputValue + " per page",
          value: inputValue
        }]);
      });
    }

    setInputValue(0);
  };

  return React__default.createElement("div", {
    className: 'RenderOrder'
  }, React__default.createElement(antd.Button, {
    style: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      zIndex: 2
    },
    type: 'primary'
  }, "Showing"), React__default.createElement(antd.Select, {
    className: 'RenderOrder__select',
    placeholder: 'Customize data listing',
    defaultValue: 15,
    options: items,
    value: renderOrder,
    onChange: function onChange(value) {
      return lodash.isFunction(setRenderOrder) ? setRenderOrder(value) : null;
    },
    dropdownRender: function dropdownRender(menu) {
      return React__default.createElement("div", null, React__default.createElement("div", {
        className: '___data-sort-order-header'
      }, React__default.createElement("p", null, "Number of data")), menu, React__default.createElement(antd.Divider, {
        style: {
          margin: '4px 0'
        }
      }), React__default.createElement("div", {
        style: {
          display: 'flex',
          flexWrap: 'nowrap',
          padding: 8
        }
      }, React__default.createElement(antd.InputNumber, {
        min: 10,
        max: 500,
        step: 5,
        style: {
          flex: 'auto'
        },
        placeholder: 'Data per page',
        value: inputValue,
        onChange: function onChange(value) {
          return setInputValue(Number(value));
        }
      })), React__default.createElement(antd.Divider, {
        style: {
          margin: '4px 0'
        }
      }), React__default.createElement("div", {
        style: {
          display: 'flex',
          flexWrap: 'nowrap',
          padding: 8
        }
      }, React__default.createElement(antd.Button, {
        type: 'primary',
        block: true,
        icon: React__default.createElement("span", {
          className: 'anticon'
        }, React__default.createElement("i", {
          className: 'ri-add-line',
          style: {
            fontSize: 16
          }
        })),
        onClick: handleCustomize
      }, "Customize")));
    }
  }));
});

var ControlActions = (function () {
  var menu = React__default.createElement(antd.Menu, {
    className: 'CtrlActions__menu'
  }, React__default.createElement(antd.Menu.Item, {
    key: '0',
    icon: React__default.createElement("span", {
      className: 'anticon'
    }, React__default.createElement("i", {
      className: 'ri-refresh-line',
      style: {
        color: 'var(--accent)',
        paddingRight: 10,
        fontSize: 17
      }
    }))
  }, "Refresh"), React__default.createElement(antd.Menu.Item, {
    key: '1',
    icon: React__default.createElement("span", {
      className: 'anticon'
    }, React__default.createElement("i", {
      className: 'ri-file-line',
      style: {
        color: 'var(--accent)',
        paddingRight: 10,
        fontSize: 17
      }
    }))
  }, "Export as CSV"), React__default.createElement(antd.Menu.Item, {
    key: '3',
    icon: React__default.createElement("span", {
      className: 'anticon'
    }, React__default.createElement("i", {
      className: 'ri-file-excel-2-line',
      style: {
        color: 'var(--accent)',
        paddingRight: 10,
        fontSize: 17
      }
    }))
  }, "Export as Excel"), React__default.createElement(antd.Menu.Item, {
    key: '4',
    icon: React__default.createElement("span", {
      className: 'anticon'
    }, React__default.createElement("i", {
      className: 'ri-file-pdf-line',
      style: {
        color: 'var(--accent)',
        paddingRight: 10,
        fontSize: 17
      }
    }))
  }, "Export as PDF"));
  return React__default.createElement(antd.Dropdown, {
    overlay: menu,
    trigger: ['click']
  }, React__default.createElement(antd.Tooltip, {
    title: 'Export data'
  }, React__default.createElement(antd.Button, {
    icon: React__default.createElement("span", {
      className: 'anticon'
    }, React__default.createElement("i", {
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
  ColumnDensity: ColumnDensity,
  ColumnReorder: ColumnReorder,
  RenderOrder: RenderOrder,
  ControlActions: ControlActions
};

var TableHead = (function (props) {
  var columns = props.columns,
      columnKeys = props.columnKeys,
      checkState = props.checkState,
      onCheckAllChange = props.onCheckAllChange,
      setColumns = props.setColumns,
      maxColumns = props.maxColumns,
      minColumns = props.minColumns,
      defaultColumns = props.defaultColumns;
  return React__default.createElement(framerMotion.motion.thead, {
    className: '___table-header',
    transition: {
      type: 'inertia'
    }
  }, React__default.createElement("tr", {
    className: '___table-columns'
  }, React__default.createElement("th", {
    className: '___table-column',
    style: {
      width: '64px'
    }
  }, React__default.createElement("div", {
    className: '___table-header-checkbox-container'
  }, React__default.createElement(antd.Checkbox, {
    indeterminate: checkState.indeterminate,
    onChange: onCheckAllChange,
    checked: checkState.checkAll
  }))), columns.selected.map(function (value, index) {
    return React__default.createElement(framerMotion.motion.th, {
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
        width: "calc(100% / " + (columnKeys.length + 2) + ") - 120px"
      }
    }, React__default.createElement("div", {
      className: '___table-column-container'
    }, React__default.createElement("div", {
      className: '___table-column-title'
    }, value === null || value === void 0 ? void 0 : value.title)));
  }), React__default.createElement("th", {
    className: '___table-column selectable-columns',
    style: {
      width: 64
    }
  }, React__default.createElement(framerMotion.motion.div, {
    whileHover: {
      scale: 1.1
    },
    className: '___table-selectable-columns-child-container'
  }, React__default.createElement(antd.Popover, {
    placement: 'bottomRight',
    content: function content() {
      return React__default.createElement(TableControls.ColumnReorder, {
        columns: columns,
        setColumns: setColumns,
        maxColumns: maxColumns,
        minColumns: minColumns,
        defaultColumns: defaultColumns
      });
    },
    trigger: 'click',
    style: {
      borderRadius: 10
    }
  }, React__default.createElement(antd.Tooltip, {
    title: 'Customize columns',
    placement: 'left'
  }, React__default.createElement(antd.Button, {
    type: 'link',
    style: {
      background: 'transaparent'
    },
    icon: React__default.createElement("span", {
      className: 'anticon'
    }, React__default.createElement("span", {
      className: 'anticon'
    }, React__default.createElement("i", {
      className: 'ri-list-settings-line',
      style: {
        fontSize: 17
      }
    })))
  })))))));
});

var CellMenu = (function (props) {
  var showDrawer = props.showDrawer;
  var menu = React__default.createElement(antd.Menu, {
    style: {
      border: 0,
      background: 'var(--background-secondary)'
    }
  }, React__default.createElement(antd.Menu, {
    className: 'CellMenu__menu'
  }, React__default.createElement(antd.Menu.Item, {
    key: 'expand'
  }, React__default.createElement(framerMotion.motion.div, {
    initial: {
      color: 'var(--text-color)',
      cursor: 'pointer'
    },
    whileHover: {
      scale: 1.25
    }
  }, React__default.createElement(antd.Tooltip, {
    title: 'Expand column'
  }, React__default.createElement(antd.Button, {
    type: 'text',
    onClick: showDrawer,
    style: {
      color: 'var(--accent35)',
      width: 40,
      padding: 0
    }
  }, React__default.createElement(icons.FullscreenOutlined, null))))), React__default.createElement(antd.Menu.Item, {
    key: 'filter'
  }, React__default.createElement(framerMotion.motion.div, {
    initial: {
      color: 'var(--text-color)',
      cursor: 'pointer'
    },
    whileHover: {
      scale: 1.25
    }
  }, React__default.createElement(antd.Tooltip, {
    title: 'Edit'
  }, React__default.createElement(antd.Button, {
    type: 'text',
    style: {
      color: 'var(--accent35)',
      width: 40,
      padding: 0
    }
  }, React__default.createElement(icons.EditOutlined, null))))), React__default.createElement(antd.Menu.Item, {
    key: 'edit'
  }, React__default.createElement(framerMotion.motion.div, {
    initial: {
      color: 'var(--text-color)',
      cursor: 'pointer'
    },
    whileHover: {
      scale: 1.25
    }
  }, React__default.createElement(antd.Tooltip, {
    title: 'Filter data by value'
  }, React__default.createElement(antd.Button, {
    type: 'text',
    style: {
      color: 'var(--accent35)',
      width: 40,
      padding: 0
    }
  }, React__default.createElement(icons.FilterOutlined, null))))), React__default.createElement(antd.Menu.Item, {
    key: 'delete'
  }, React__default.createElement(framerMotion.motion.div, {
    initial: {
      color: 'var(--text-color)',
      cursor: 'pointer'
    },
    whileHover: {
      scale: 1.25
    }
  }, React__default.createElement(antd.Tooltip, {
    title: 'Delete'
  }, React__default.createElement(antd.Button, {
    danger: true,
    type: 'text',
    style: {
      width: 40,
      padding: 0
    }
  }, React__default.createElement(icons.DeleteOutlined, null)))))), React__default.createElement(antd.Menu, {
    style: {
      border: 0,
      background: 'var(--background-secondary)'
    }
  }, React__default.createElement(antd.Menu.Divider, null), React__default.createElement(antd.Menu.Item, {
    key: '0',
    icon: React__default.createElement(icons.ReloadOutlined, {
      style: {
        color: 'var(--accent)',
        paddingRight: 10
      }
    })
  }, "Refresh"), React__default.createElement(antd.Menu.Item, {
    key: '1',
    icon: React__default.createElement(icons.FileTextOutlined, {
      style: {
        color: 'var(--accent)',
        paddingRight: 10
      }
    })
  }, "Export as CSV"), React__default.createElement(antd.Menu.Item, {
    key: '3',
    icon: React__default.createElement(icons.FileExcelOutlined, {
      style: {
        color: 'var(--accent)',
        paddingRight: 10
      }
    })
  }, "Export as Excel"), React__default.createElement(antd.Menu.Item, {
    key: '4',
    icon: React__default.createElement(icons.FilePdfOutlined, {
      style: {
        color: 'var(--accent)',
        paddingRight: 10
      }
    })
  }, "Export as PDF")));
  return React__default.createElement(antd.Dropdown, {
    overlay: menu,
    trigger: ['click']
  }, React__default.createElement(antd.Tooltip, {
    title: 'Actions'
  }, React__default.createElement(framerMotion.motion.div, {
    whileHover: {
      scale: 1.2
    }
  }, React__default.createElement(antd.Button, {
    shape: 'circle',
    type: 'text',
    icon: React__default.createElement(icons.EllipsisOutlined, {
      style: {
        fontSize: 17
      }
    })
  }))));
});

var presentationHOC = function presentationHOC(_ref) {
  var extraColumnsLength = _ref.extraColumnsLength,
      columnKeys = _ref.columnKeys,
      columnType = _ref.columnType;
  return function (Component) {
    return React__default.createElement(framerMotion.motion.td, {
      layout: true,
      style: {
        width: "calc(100% / " + (columnKeys.length + extraColumnsLength) + " - 120px)"
      },
      className: '___table-row'
    }, React__default.createElement("div", {
      className: '___table-row-inner',
      style: {
        textAlign: columnType === 'number' || columnType === 'currency' ? 'right' : 'left'
      }
    }, Component));
  };
};

var Presentation = function Presentation(props) {
  var columnType = props.columnType,
      data = props.data,
      presentationType = props.presentationType,
      actionCallback = props.actionCallback,
      actionPresentationType = props.actionPresentationType,
      actionTitle = props.actionTitle,
      presentationColor = props.presentationColor,
      bold = props.bold,
      source = props.source,
      dateFormat = props.dateFormat;

  switch (columnType) {
    case 'action':
      return React__default.createElement(antd.Button, {
        type: actionPresentationType || 'default',
        onClick: function onClick() {
          return actionCallback ? actionCallback(source) : null;
        },
        size: 'small',
        style: {
          fontSize: 12
        }
      }, actionTitle || '');

    case 'currency':
      {
        var currency = Intl.NumberFormat('en-NG', {
          currency: 'NGN',
          style: 'currency'
        }).format(Number(data) || 0);

        if (presentationType === 'tag') {
          return React__default.createElement(antd.Tag, {
            color: presentationColor || 'gold',
            style: {
              fontWeight: bold ? 'bold' : 'normal'
            }
          }, currency);
        } else return React__default.createElement("span", {
          style: {
            fontWeight: bold ? 'bold' : 'normal'
          }
        }, currency);
      }

    case 'date':
    case 'datetime':
      {
        var format = dateFormat === 'datetime' ? 'lll LT' : 'lll';
        var date = moment(data).format(dateFormat || format) || moment(data).format(format);

        if (presentationType === 'tag') {
          return React__default.createElement(antd.Tag, {
            color: presentationColor || 'gold',
            style: {
              fontWeight: bold ? 'bold' : 'normal'
            }
          }, date);
        } else return React__default.createElement(antd.Tag, {
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
        return React__default.createElement(antd.Tag, {
          color: presentationColor || 'gold',
          style: {
            fontWeight: bold ? 'bold' : 'normal'
          }
        }, data || '⏤⏤⏤');
      } else return React__default.createElement(antd.Tag, {
        color: presentationColor || 'default',
        style: {
          fontWeight: bold ? 'bold' : 'normal',
          borderColor: 'transparent',
          background: 'transparent'
        }
      }, data || '⏤⏤⏤');

  }
};

var TableCell = (function (props) {
  var checked = props.checked,
      source = props.source,
      onCheckedChange = props.onCheckedChange,
      checkState = props.checkState,
      columnKeys = props.columnKeys,
      _props$extraColumnsLe = props.extraColumnsLength,
      extraColumnsLength = _props$extraColumnsLe === void 0 ? 1 : _props$extraColumnsLe,
      columns = props.columns,
      index = props.index;
  var trRef = React.useRef();

  var _useState = React.useState(false),
      drawerVisible = _useState[0],
      setDrawerVisible = _useState[1];

  var showDrawer = function showDrawer() {
    setDrawerVisible(true);
  };

  var onClose = function onClose() {
    setDrawerVisible(false);
  };

  return React__default.createElement(React__default.Fragment, null, React__default.createElement(framerMotion.motion.tr, {
    layout: true,
    ref: trRef,
    className: (checked ? '___table-rows-checked ' : '___table-rows') + " site-collapse-custom-collapse",
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
  }, React__default.createElement("td", {
    className: '___table-row',
    style: {
      width: '64px'
    }
  }, React__default.createElement("div", {
    className: '___table-row-checkbox-container'
  }, React__default.createElement(antd.Checkbox, {
    key: source === null || source === void 0 ? void 0 : source.key,
    onChange: function onChange(e) {
      var _e$target;

      onCheckedChange(!((_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.checked) ? checkState === null || checkState === void 0 ? void 0 : checkState.checkedList.filter(function (value) {
        return (value === null || value === void 0 ? void 0 : value.key) !== (source === null || source === void 0 ? void 0 : source.key);
      }) : checkState === null || checkState === void 0 ? void 0 : checkState.checkedList.concat(source));
    },
    checked: checked
  }))), columnKeys.map(function (value) {
    var retrieved = columns.find(function (c) {
      return (c === null || c === void 0 ? void 0 : c.key) === value;
    });
    var presentationType = retrieved === null || retrieved === void 0 ? void 0 : retrieved.presentationType;
    var presentationColor = retrieved === null || retrieved === void 0 ? void 0 : retrieved.presentationColor;
    var data = source[value];
    return presentationHOC({
      extraColumnsLength: extraColumnsLength,
      columnKeys: columnKeys,
      columnType: retrieved === null || retrieved === void 0 ? void 0 : retrieved.type
    })(React__default.createElement(Presentation, {
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
  }), React__default.createElement("td", {
    style: {
      width: 64
    },
    className: '___table-row'
  }, React__default.createElement("div", {
    className: '___table-utility'
  }, React__default.createElement(CellMenu, {
    showDrawer: showDrawer
  })))), React__default.createElement(antd.Drawer, {
    title: source[columnKeys[0]],
    placement: 'left',
    closable: true,
    onClose: onClose,
    visible: drawerVisible,
    key: 'Table-View-Drawer',
    width: '40%'
  }, React__default.createElement("p", null, "Some contents..."), React__default.createElement("p", null, "Some contents..."), React__default.createElement("p", null, "Some contents...")));
});

var Align = function Align(props) {
  var children = props.children,
      type = props.type,
      alignCenter = props.alignCenter,
      alignStart = props.alignStart,
      alignEnd = props.alignEnd,
      justifyCenter = props.justifyCenter,
      justifyBetween = props.justifyBetween,
      justifyEvenly = props.justifyEvenly,
      justifyStart = props.justifyStart,
      justifyEnd = props.justifyEnd,
      justifyAround = props.justifyAround,
      style = props.style,
      className = props.className,
      id = props.id;
  return React__default.createElement("div", {
    id: id || '',
    style: _extends({}, style, {
      display: 'flex',
      flexFlow: type || 'row'
    }, alignCenter ? {
      alignItems: 'center'
    } : {}, alignEnd ? {
      alignItems: 'flex-end'
    } : {}, alignStart ? {
      alignItems: 'flex-start'
    } : {}, justifyCenter ? {
      justifyContent: 'center'
    } : {}, justifyAround ? {
      justifyContent: 'space-around'
    } : {}, justifyBetween ? {
      justifyContent: 'space-between'
    } : {}, justifyEnd ? {
      justifyContent: 'flex-end'
    } : {}, justifyStart ? {
      justifyContent: 'flex-start'
    } : {}, justifyEvenly ? {
      justifyContent: 'space-evenly'
    } : {}),
    className: className || ''
  }, children);
};

var Padding = function Padding(props) {
  var left = props.left,
      right = props.right,
      top = props.top,
      bottom = props.bottom,
      children = props.children,
      _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style,
      className = props.className,
      vertical = props.vertical,
      horizontal = props.horizontal;
  return React__default.createElement("div", {
    style: _extends({
      paddingLeft: left || horizontal || 0,
      paddingRight: right || horizontal || 0,
      paddingTop: top || vertical || 0,
      paddingBottom: bottom || vertical || 0
    }, style),
    className: className || ''
  }, children);
};

var Margin = function Margin(props) {
  var left = props.left,
      right = props.right,
      top = props.top,
      bottom = props.bottom,
      children = props.children,
      _props$style2 = props.style,
      style = _props$style2 === void 0 ? {} : _props$style2,
      className = props.className,
      vertical = props.vertical,
      horizontal = props.horizontal;
  return React__default.createElement("div", {
    style: _extends({
      marginLeft: left || horizontal || 0,
      marginRight: right || horizontal || 0,
      marginTop: top || vertical || 0,
      marginBottom: bottom || vertical || 0
    }, style),
    className: className || ''
  }, children);
};

var Position = function Position(props) {
  var children = props.children,
      type = props.type,
      top = props.top,
      bottom = props.bottom,
      left = props.left,
      right = props.right,
      style = props.style,
      className = props.className;
  return React__default.createElement("div", {
    style: _extends({}, style, {
      position: type || 'relative',
      top: !lodash.isUndefined(top) && !lodash.isNull(top) ? top : 'auto',
      bottom: !lodash.isUndefined(bottom) && !lodash.isNull(bottom) ? bottom : 'auto',
      right: !lodash.isUndefined(right) && !lodash.isNull(right) ? right : 'auto',
      left: !lodash.isUndefined(left) && !lodash.isNull(left) ? left : 'auto'
    }),
    className: className || ''
  }, children);
};

var TableBody = (function (props) {
  var columns = props.columns,
      columnKeys = props.columnKeys,
      dataSource = props.dataSource,
      checkState = props.checkState,
      onCheckedChange = props.onCheckedChange,
      isLoadingContent = props.isLoadingContent,
      useSkeletonLoader = props.useSkeletonLoader;
  return React__default.createElement(framerMotion.motion.tbody, {
    className: '___table-body'
  }, isLoadingContent && React__default.createElement(framerMotion.motion.tr, {
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
  }, React__default.createElement(framerMotion.motion.td, {
    colSpan: columnKeys.length + 1,
    style: {
      padding: 10
    }
  }, useSkeletonLoader ? React__default.createElement("div", {
    style: {
      height: 450
    }
  }, ' ', React__default.createElement(antd.Skeleton, {
    active: true
  }), React__default.createElement(antd.Skeleton, {
    active: true
  }), React__default.createElement(antd.Skeleton, {
    active: true
  })) : React__default.createElement(Align, {
    alignCenter: true,
    justifyCenter: true,
    style: {
      height: 450
    },
    children: [React__default.createElement(icons.LoadingOutlined, {
      key: 'loading-0',
      style: {
        fontSize: 40,
        color: 'var(--accent)'
      },
      spin: true
    })]
  }))), !isLoadingContent && lodash.isEmpty(dataSource) && React__default.createElement(framerMotion.motion.td, {
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
  }, React__default.createElement(Align, {
    style: {
      height: 450
    },
    alignCenter: true,
    justifyCenter: true,
    children: [React__default.createElement(antd.Empty, {
      key: 'empty-0',
      image: antd.Empty.PRESENTED_IMAGE_SIMPLE
    })]
  })), !isLoadingContent && !lodash.isEmpty(dataSource) && dataSource.map(function (source, index) {
    var checked = lodash.find(checkState === null || checkState === void 0 ? void 0 : checkState.checkedList, ['key', source === null || source === void 0 ? void 0 : source.key]) !== undefined;
    return React__default.createElement(TableCell, {
      columns: columns.selected,
      checked: checked,
      onCheckedChange: onCheckedChange,
      checkState: checkState,
      columnKeys: columnKeys,
      extraColumnsLength: 1,
      source: source,
      key: "table_cell_" + (source === null || source === void 0 ? void 0 : source.key),
      index: index
    });
  }));
});

var TableFooter = (function (props) {
  var currentPage = props.currentPage,
      handlePagination = props.handlePagination,
      total = props.total,
      isLoadingContent = props.isLoadingContent,
      isAnEmptyContent = props.isAnEmptyContent;
  return !isLoadingContent && !isAnEmptyContent ? React__default.createElement(framerMotion.motion.div, {
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
  }, React__default.createElement("div", {
    className: '___table-pagination-container'
  }, React__default.createElement(antd.Pagination, {
    defaultCurrent: currentPage,
    showQuickJumper: true,
    total: total,
    current: currentPage,
    onChange: handlePagination
  }))) : null;
});

var Table = (function (props) {
  var columnKeys = props.columnKeys,
      maxColumns = props.maxColumns,
      minColumns = props.minColumns,
      checkState = props.checkState,
      columns = props.columns,
      dataSource = props.dataSource,
      defaultColumns = props.defaultColumns,
      onCheckAllChange = props.onCheckAllChange,
      setColumns = props.setColumns,
      onCheckedChange = props.onCheckedChange,
      tablePages = props.tablePages,
      handlePagination = props.handlePagination,
      isLoadingContent = props.isLoadingContent,
      useSkeletonLoader = props.useSkeletonLoader;
  return React__default.createElement("div", {
    className: '___table-wrapper'
  }, React__default.createElement("table", {
    className: '___table'
  }, React__default.createElement(TableHead, {
    columns: columns,
    columnKeys: columnKeys,
    onCheckAllChange: onCheckAllChange,
    setColumns: setColumns,
    checkState: checkState,
    maxColumns: maxColumns,
    minColumns: minColumns,
    defaultColumns: defaultColumns
  }), React__default.createElement(TableBody, {
    columns: columns,
    columnKeys: columnKeys,
    checkState: checkState,
    onCheckedChange: onCheckedChange,
    dataSource: dataSource,
    isLoadingContent: isLoadingContent,
    useSkeletonLoader: useSkeletonLoader
  })), React__default.createElement(TableFooter, {
    currentPage: tablePages.currentPage,
    handlePagination: handlePagination,
    total: tablePages.all,
    isLoadingContent: isLoadingContent,
    isAnEmptyContent: lodash.isEmpty(dataSource)
  }));
});

var useDimension = function useDimension(type, elementId) {
  if (type === void 0) {
    type = 'window';
  }

  if (elementId === void 0) {
    elementId = '';
  }

  var _useState = React.useState({
    height: 0,
    width: 0
  }),
      dimension = _useState[0],
      setDimension = _useState[1];

  React.useEffect(function () {
    if (type === 'window') {
      setDimension({
        height: window.innerHeight,
        width: window.innerWidth
      });
    }

    var handleDimensionChange = function handleDimensionChange() {
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

    return function () {
      return type === 'window' ? window.removeEventListener('resize', handleDimensionChange) : null;
    };
  }, []);
  React.useEffect(function () {
    var handleInitialDimension = function handleInitialDimension() {
      if (elementId) {
        var element = document.getElementById(elementId);
        setDimension({
          height: (element === null || element === void 0 ? void 0 : element.offsetHeight) || 0,
          width: (element === null || element === void 0 ? void 0 : element.offsetWidth) || 0
        });
      }
    };

    handleInitialDimension();

    var handleDimensionChange = function handleDimensionChange() {
      if (type === 'element' && elementId) {
        var element = document.getElementById(elementId);
        setDimension({
          height: (element === null || element === void 0 ? void 0 : element.offsetHeight) || 0,
          width: (element === null || element === void 0 ? void 0 : element.offsetWidth) || 0
        });
      }
    };

    if (type === 'element' && elementId) {
      window.addEventListener('resize', handleDimensionChange);
    }

    return function () {
      return type === 'element' && elementId ? window.removeEventListener('resize', handleDimensionChange) : null;
    };
  }, []);
  return dimension;
};

var toPercentage = function toPercentage(size, expectedRatio, sub, add) {
  if (size === void 0) {
    size = 1;
  }

  if (expectedRatio === void 0) {
    expectedRatio = 1;
  }

  if (sub === void 0) {
    sub = 0;
  }

  if (add === void 0) {
    add = 0;
  }

  return size * expectedRatio - sub + add;
};

var initDataManagementState = function initDataManagementState(columns) {
  return {
    filters: columns.slice(0, 3).map(function (value, index) {
      return _extends({}, value, {
        filterIndex: index,
        filterProps: {
          property: null,
          type: null,
          value: null
        }
      });
    }),
    sorts: [],
    search: {
      where: '',
      what: ''
    }
  };
};

var dataManagementReducer = function dataManagementReducer(state, action) {
  switch (action.type) {
    case 'ADD_FILTER':
      {
        var filterIndex = state.filters.length;
        return _extends({}, state, {
          filters: state.filters.concat(_extends({}, action.payload, {
            filterIndex: filterIndex
          }))
        });
      }

    case 'REMOVE_FILTER':
      return _extends({}, state, {
        filters: lodash.filter(state.filters, function (o) {
          var _action$payload;

          return o.filterIndex !== ((_action$payload = action.payload) === null || _action$payload === void 0 ? void 0 : _action$payload.filterIndex);
        })
      });

    case 'UPDATE_FILTER':
      {
        var _action$payload2;

        var filters = state.filters;

        var _filterIndex = (_action$payload2 = action.payload) === null || _action$payload2 === void 0 ? void 0 : _action$payload2.filterIndex;

        filters[_filterIndex] = action.payload;
        return _extends({}, state, {
          filters: filters
        });
      }

    case 'ADD_OR_UPDATE_SEARCH':
      return _extends({}, state, {
        search: action.payload
      });

    default:
      return state;
  }
};

var Option = antd.Select.Option;
var Search = (function (props) {
  var columns = props.columns;
  var dimension = useDimension('element', 'search__form__input');

  var _useState = React.useState(null),
      selectedField = _useState[0],
      setSelectedField = _useState[1];

  var onChange = function onChange(value) {
    var _columns$all, _columns$all$find;

    var type = (columns === null || columns === void 0 ? void 0 : (_columns$all = columns.all) === null || _columns$all === void 0 ? void 0 : (_columns$all$find = _columns$all.find) === null || _columns$all$find === void 0 ? void 0 : _columns$all$find.call(_columns$all, function (o) {
      return o.key === value;
    })) || null;
    setSelectedField(function () {
      return type;
    });
    console.log("selected", value, columns, type);
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

  var SearchType = function SearchType() {
    var displayType = (selectedField === null || selectedField === void 0 ? void 0 : selectedField.type) || 'text';

    if (displayType === 'number') {
      return React__default.createElement(antd.InputNumber, {
        style: {
          width: toPercentage(dimension.width, 0.45)
        },
        placeholder: 'Search value'
      });
    }

    if (displayType === 'boolean') {
      return React__default.createElement(antd.Select, {
        defaultValue: 'true',
        optionFilterProp: 'children',
        filterOption: function filterOption(input, option) {
          return (option || {}).children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        },
        style: {
          width: toPercentage(dimension.width, 0.45)
        }
      }, React__default.createElement(Option, {
        value: 'true'
      }, "True"), React__default.createElement(Option, {
        value: 'false'
      }, "False"));
    }

    if (displayType === 'date') {
      return React__default.createElement(antd.DatePicker, {
        style: {
          width: toPercentage(dimension.width, 0.45)
        },
        onChange: function onChange() {
          return null;
        }
      });
    }

    if (displayType === 'datetime') {
      return React__default.createElement(antd.DatePicker, {
        showTime: true,
        style: {
          width: toPercentage(dimension.width, 0.45)
        },
        onChange: function onChange(value) {
          return console.log(value);
        },
        onOk: function onOk(value) {
          return console.log("OK " + value);
        }
      });
    }

    return React__default.createElement(antd.Input, {
      style: {
        width: toPercentage(dimension.width, 0.45)
      },
      placeholder: 'Search value'
    });
  };

  return React__default.createElement(Align, {
    alignCenter: true,
    justifyCenter: true,
    type: 'column',
    style: {
      height: '100%'
    }
  }, React__default.createElement(Align, {
    style: {
      width: '100%'
    },
    alignCenter: true,
    justifyCenter: true
  }, React__default.createElement(Padding, {
    top: 30,
    bottom: 60
  }, React__default.createElement(antd.Typography.Text, {
    style: {
      fontSize: 30
    }
  }, "What are you looking for?"))), React__default.createElement(Align, {
    style: {
      width: '80%'
    },
    id: 'search__form__input',
    alignCenter: true,
    justifyBetween: true
  }, React__default.createElement(Padding, {
    right: 20
  }, React__default.createElement(Align, {
    type: 'column'
  }, React__default.createElement(antd.Typography.Text, {
    strong: true,
    style: {
      width: toPercentage(dimension.width, 0.4)
    }
  }, "Where"), React__default.createElement(Padding, {
    top: 30
  }, React__default.createElement(antd.Select, {
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
    filterOption: function filterOption(input, option) {
      return (option || {}).children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    }
  }, columns.selected.map(function (value, index) {
    return React__default.createElement(Option, {
      value: value.key,
      key: index
    }, value.title);
  }))))), React__default.createElement(Align, {
    type: 'column'
  }, React__default.createElement(antd.Typography.Text, {
    strong: true,
    style: {
      width: toPercentage(dimension.width, 0.5)
    }
  }, "What"), React__default.createElement(Padding, {
    top: 30
  }, React__default.createElement(SearchType, null)))), React__default.createElement(Align, {
    style: {
      width: '100%'
    },
    alignCenter: true,
    justifyCenter: true
  }, React__default.createElement(Padding, {
    top: 60
  }, React__default.createElement(antd.Button, {
    type: 'primary',
    icon: React__default.createElement("span", {
      className: 'anticon'
    }, React__default.createElement("i", {
      className: 'ri-search-2-line',
      style: {
        fontSize: 16
      }
    }))
  }, "Search"))));
});

var TagRender = (function (props) {
  var label = props.label,
      closable = props.closable,
      onClose = props.onClose;
  return React__default.createElement(antd.Tag, {
    color: 'magenta',
    closable: closable,
    onClose: onClose,
    style: {
      marginRight: 3
    }
  }, label);
});

var RenderFilterType = (function (props) {
  var _currentData$filterPr;

  var type = props.type,
      filterType = props.filterType,
      property = props.property,
      dimension = props.dimension,
      handleAutoComplete = props.handleAutoComplete,
      suffix = props.suffix,
      autoCompleteOptions = props.autoCompleteOptions,
      handleFilterValueChange = props.handleFilterValueChange,
      currentData = props.currentData;
  var SuffixStatement = suffix;
  var value = currentData === null || currentData === void 0 ? void 0 : (_currentData$filterPr = currentData.filterProps) === null || _currentData$filterPr === void 0 ? void 0 : _currentData$filterPr.value;
  if ((filterType || '').includes('between')) return React__default.createElement(Align, {
    style: {
      width: '100%'
    },
    alignCenter: true,
    justifyBetween: true
  }, type === 'date' || type === 'datetime' ? React__default.createElement(antd.DatePicker, {
    style: {
      width: '45%'
    },
    value: moment(lodash.isDate(value === null || value === void 0 ? void 0 : value.start) ? value === null || value === void 0 ? void 0 : value.start : new Date()),
    onChange: function onChange(date) {
      return handleFilterValueChange(moment(date || new Date()).toDate(), 'range', 'start');
    }
  }) : React__default.createElement(antd.InputNumber, {
    defaultValue: 0,
    value: lodash.isNumber(value === null || value === void 0 ? void 0 : value.start) ? value === null || value === void 0 ? void 0 : value.start : 0,
    style: {
      width: '45%'
    },
    onChange: function onChange(num) {
      return handleFilterValueChange(num, 'range', 'end');
    }
  }), React__default.createElement(SuffixStatement, null), type === 'date' || type === 'datetime' ? React__default.createElement(antd.DatePicker, {
    style: {
      width: '45%'
    },
    value: moment(lodash.isDate(value === null || value === void 0 ? void 0 : value.end) ? value === null || value === void 0 ? void 0 : value.end : new Date()),
    onChange: function onChange(date) {
      return handleFilterValueChange(moment(date || new Date()).toDate(), 'range', 'start');
    }
  }) : React__default.createElement(antd.InputNumber, {
    defaultValue: 0,
    style: {
      width: '45%'
    },
    value: lodash.isNumber(value === null || value === void 0 ? void 0 : value.end) ? value === null || value === void 0 ? void 0 : value.end : 0,
    onChange: function onChange(num) {
      return handleFilterValueChange(num, 'range', 'end');
    }
  }));

  switch (type) {
    case 'number':
      return React__default.createElement(antd.InputNumber, {
        defaultValue: 0,
        value: lodash.isNumber(value) ? value : 0,
        style: {
          width: '100%'
        },
        onChange: function onChange(num) {
          return handleFilterValueChange(num);
        }
      });

    case 'date':
      return React__default.createElement(antd.DatePicker, {
        style: {
          width: '100%'
        },
        value: moment(lodash.isDate(value) ? value : new Date()),
        onChange: function onChange(date) {
          return handleFilterValueChange(moment(date || new Date()).toDate());
        }
      });

    case 'datetime':
      return React__default.createElement(antd.DatePicker, {
        showTime: true,
        style: {
          width: '100%'
        },
        value: moment(lodash.isDate(value) ? value : new Date()),
        onChange: function onChange(date) {
          return handleFilterValueChange(moment(date || new Date()).toDate());
        }
      });

    case 'list':
      if (lodash.has(property, 'listMenu') && !lodash.isEmpty(property === null || property === void 0 ? void 0 : property.listMenu)) {
        var _property$title;

        return React__default.createElement(antd.Select, {
          mode: (property === null || property === void 0 ? void 0 : property.multiple) ? 'multiple' : undefined,
          style: {
            width: toPercentage(dimension.width, 0.4)
          },
          placeholder: (property === null || property === void 0 ? void 0 : property.title) ? "Select " + (property === null || property === void 0 ? void 0 : (_property$title = property.title) === null || _property$title === void 0 ? void 0 : _property$title.toLowerCase()) : '',
          value: value || undefined,
          onChange: function onChange(value) {
            return handleFilterValueChange(value);
          },
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

        return React__default.createElement(antd.AutoComplete, {
          options: autoCompleteOptions,
          onSelect: function onSelect(value) {
            return handleFilterValueChange(value);
          },
          onSearch: handleAutoComplete,
          style: {
            width: '100%'
          },
          placeholder: (property === null || property === void 0 ? void 0 : property.title) ? "Specify " + ((_property$title2 = property.title) === null || _property$title2 === void 0 ? void 0 : (_property$title2$toLo = _property$title2.toLowerCase) === null || _property$title2$toLo === void 0 ? void 0 : _property$title2$toLo.call(_property$title2)) : ''
        });
      } else {
        var _property$title3, _property$title3$toLo;

        return React__default.createElement(antd.Input, {
          style: {
            width: '100%'
          },
          value: value,
          onChange: function onChange(e) {
            return handleFilterValueChange(e.target.value);
          },
          placeholder: (property === null || property === void 0 ? void 0 : property.title) ? "Specify " + ((_property$title3 = property.title) === null || _property$title3 === void 0 ? void 0 : (_property$title3$toLo = _property$title3.toLowerCase) === null || _property$title3$toLo === void 0 ? void 0 : _property$title3$toLo.call(_property$title3)) : ''
        });
      }

  }
});

var Option$1 = antd.Select.Option;
var FilterItem = (function (props) {
  var _evalType, _evalType$, _ref, _ref$map, _ref3;

  var columns = props.columns,
      filterData = props.filterData,
      logicType = props.logicType,
      isLastIndex = props.isLastIndex,
      isMoreThanOne = props.isMoreThanOne,
      isFirstIndex = props.isFirstIndex,
      dataSource = props.dataSource,
      dispatch = props.dispatch,
      dimension = props.dimension;
  var validColumns = React.useMemo(function () {
    return columns.selected.filter(function (o) {
      return o.type !== 'action';
    });
  }, [columns.selected]);
  var stringFilters = [{
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
  var numberFilters = [{
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
  var dateFilters = [{
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
  var booleanFilters = [{
    label: 'True',
    value: 'true'
  }, {
    label: 'False',
    value: 'false'
  }];
  var listFilters = [{
    label: 'Equals',
    value: 'equals'
  }, {
    label: 'Does not equal',
    value: 'does not equal'
  }];

  var evalType = function evalType(type) {
    if (type === 'number') return numberFilters;
    if (type === 'boolean') return booleanFilters;
    if (type === 'date' || type === 'datetime') return dateFilters;
    if (type === 'list') return listFilters;
    return stringFilters;
  };

  var _useState = React.useState(filterData),
      property = _useState[0],
      setProperty = _useState[1];

  var _useState2 = React.useState(((_evalType = evalType(property === null || property === void 0 ? void 0 : property.type)) === null || _evalType === void 0 ? void 0 : (_evalType$ = _evalType[0]) === null || _evalType$ === void 0 ? void 0 : _evalType$.value) || ''),
      filterType = _useState2[0],
      setFilterType = _useState2[1];

  var _useState3 = React.useState(null),
      autoCompleteProps = _useState3[0],
      setAutoCompleteProps = _useState3[1];

  var _useState4 = React.useState([]),
      autoCompleteOptions = _useState4[0],
      setAutoCompleteOptions = _useState4[1];

  var type = (property === null || property === void 0 ? void 0 : property.type) || 'text';
  var handleAutoCompleteResource = React.useCallback(function (acc, current, index) {
    var currentValue = current[(property === null || property === void 0 ? void 0 : property.key) || ''] || '';
    var tokenize = currentValue.trim().split(' ').join('_');
    return index === 0 ? acc.concat(tokenize) : acc.concat("\n" + tokenize);
  }, [property]);
  React.useEffect(function () {
    if (type === 'text' && (property === null || property === void 0 ? void 0 : property.autoComplete)) {
      setAutoCompleteProps(dataSource.reduce(handleAutoCompleteResource, ''));
    }
  }, [dataSource, handleAutoCompleteResource, property, type]);

  var handleAutoComplete = function handleAutoComplete(value) {
    var regex = new RegExp("(^|\\s)" + value + "+(?:\\w)*(\\s|$)|(^|\\s)\\w+(?:\\w)*(?:_)" + value + "+(?:\\w)*(\\s|$)", 'gim');
    var options = autoCompleteProps === null || autoCompleteProps === void 0 ? void 0 : autoCompleteProps.match(regex);

    if (options) {
      setAutoCompleteOptions((options || []).map(function (o) {
        return {
          value: o.split('_').join(' ').trim()
        };
      }));
    }
  };

  var handleFilterRemoval = function handleFilterRemoval(filterIndex) {
    dispatch({
      type: 'REMOVE_FILTER',
      payload: {
        filterIndex: filterIndex
      }
    });
  };

  var handlePropertyChange = function handlePropertyChange(value) {
    var key = value;
    var newProperty = columns.all.find(function (o) {
      return o.key === key;
    });
    setProperty(function (prevState) {
      return _extends({}, prevState, newProperty, {
        filterProps: {
          property: null,
          type: null,
          value: null
        }
      });
    });
  };

  var handleFilterValueChange = function handleFilterValueChange(value, valueType, rangePosition) {
    if (valueType === void 0) {
      valueType = 'fixed';
    }

    if (valueType === 'range' && rangePosition) {
      var _extends2;

      var _filterProps = {
        property: property === null || property === void 0 ? void 0 : property.key,
        type: filterType,
        value: _extends({}, filterData.filterProps.value, (_extends2 = {}, _extends2[rangePosition] = value, _extends2))
      };
      dispatch({
        type: 'UPDATE_FILTER',
        payload: _extends({}, filterData, {
          filterProps: _filterProps
        })
      });
      return null;
    }

    var filterProps = {
      property: property === null || property === void 0 ? void 0 : property.key,
      type: filterType,
      value: value
    };
    dispatch({
      type: 'UPDATE_FILTER',
      payload: _extends({}, filterData, {
        filterProps: filterProps
      })
    });
    return null;
  };

  var PrefixStatement = function PrefixStatement() {
    var prefix = function prefix() {
      if (type === 'number' || type === 'boolean' || type === 'date' || type === 'datetime') return 'is';
      return null;
    };

    return type !== 'text' && type !== 'list' ? React__default.createElement(Margin, {
      right: 20
    }, React__default.createElement(antd.Tag, {
      style: {
        height: 32,
        lineHeight: '32px'
      },
      color: 'processing'
    }, prefix())) : null;
  };

  var SuffixStatement = function SuffixStatement() {
    var suffix = function suffix() {
      if ((type === 'number' || type === 'date' || type === 'datetime') && (filterType || '').includes('between')) return 'and';
      return null;
    };

    return (type === 'number' || type === 'date' || type === 'datetime') && (filterType || '').includes('between') ? React__default.createElement(Margin, {
      horizontal: 20
    }, React__default.createElement(antd.Tag, {
      style: {
        height: 32,
        lineHeight: '32px'
      },
      color: 'processing'
    }, suffix())) : null;
  };

  return React__default.createElement(Align, {
    justifyCenter: true,
    style: {
      width: '100%'
    },
    type: 'column'
  }, isFirstIndex && React__default.createElement(Align, {
    justifyCenter: true,
    alignCenter: true,
    type: 'column',
    style: {
      width: 'fit-content'
    }
  }, React__default.createElement(antd.Tag, {
    color: 'processing'
  }, "FIND DATA WHERE"), React__default.createElement("div", {
    style: {
      height: 20,
      width: 5,
      borderLeft: '1.5px solid var(--border)'
    }
  })), React__default.createElement(Margin, {
    style: {
      width: '100%'
    }
  }, React__default.createElement(Align, {
    alignCenter: true,
    style: {
      width: '100%'
    }
  }, React__default.createElement(Margin, {
    right: 20
  }, React__default.createElement(antd.Select, {
    showSearch: true,
    style: {
      width: toPercentage(dimension.width, type === 'boolean' ? 0.45 : 0.3)
    },
    placeholder: 'Select a property',
    onChange: handlePropertyChange,
    value: property === null || property === void 0 ? void 0 : property.key,
    filterOption: true
  }, (_ref = validColumns || []) === null || _ref === void 0 ? void 0 : (_ref$map = _ref.map) === null || _ref$map === void 0 ? void 0 : _ref$map.call(_ref, function (value, index) {
    return React__default.createElement(Option$1, {
      value: value.key,
      key: index
    }, value.title);
  }))), React__default.createElement(Margin, {
    right: 20
  }, React__default.createElement(Align, {
    alignCenter: true
  }, React__default.createElement(PrefixStatement, null), React__default.createElement(antd.Select, {
    style: {
      width: toPercentage(dimension.width, type === 'boolean' ? 0.41 : 0.2)
    },
    onChange: function onChange(value) {
      return setFilterType(value);
    },
    value: filterType || ''
  }, (evalType((property === null || property === void 0 ? void 0 : property.type) || 'text') || stringFilters).map(function (_ref2, index) {
    var value = _ref2.value,
        label = _ref2.label;
    return React__default.createElement(Option$1, {
      value: value,
      key: index
    }, label);
  })))), type !== 'boolean' && React__default.createElement(Align, {
    alignCenter: true,
    style: {
      width: toPercentage(dimension.width, 0.5)
    }
  }, React__default.createElement(RenderFilterType, {
    autoCompleteOptions: autoCompleteOptions,
    suffix: SuffixStatement,
    property: property,
    filterType: filterType,
    dimension: dimension,
    type: type,
    handleAutoComplete: handleAutoComplete,
    handleFilterValueChange: handleFilterValueChange,
    currentData: filterData
  })), React__default.createElement(antd.Tooltip, {
    title: 'Remove'
  }, React__default.createElement(antd.Button, {
    type: 'link',
    danger: true,
    onClick: function onClick() {
      return handleFilterRemoval(filterData.filterIndex);
    }
  }, React__default.createElement("span", {
    className: 'anticon'
  }, React__default.createElement("i", {
    className: 'ri-delete-bin-2-line',
    style: {
      fontSize: 16
    }
  })))))), !isLastIndex && isMoreThanOne && React__default.createElement(Align, {
    justifyCenter: true,
    alignCenter: true,
    type: 'column',
    style: {
      width: 'fit-content'
    }
  }, React__default.createElement("div", {
    style: {
      height: 20,
      width: 5,
      borderLeft: '1.5px solid var(--border)'
    }
  }), React__default.createElement(antd.Tag, {
    color: 'processing'
  }, (_ref3 = logicType || '') === null || _ref3 === void 0 ? void 0 : _ref3.toUpperCase()), React__default.createElement("div", {
    style: {
      height: 20,
      width: 5,
      borderLeft: '1.5px solid var(--border)'
    }
  })));
});

var Filter = (function (props) {
  var columns = props.columns,
      dataSource = props.dataSource,
      dispatch = props.dispatch,
      state = props.state;
  var windowDimension = useDimension();
  var dimension = useDimension('element', 'filter__field__container');

  var _useState = React.useState('or'),
      logicType = _useState[0],
      setLogicType = _useState[1];

  var filterDataLength = state.filters.length;
  return React__default.createElement(PerfectScrollbar, null, React__default.createElement(Padding, {
    horizontal: 20,
    style: {
      height: toPercentage(windowDimension.height, 0.65, 80)
    }
  }, React__default.createElement(Align, {
    alignCenter: true,
    justifyCenter: true,
    style: {
      width: '100%'
    }
  }, React__default.createElement(Padding, {
    bottom: 20
  }, React__default.createElement(antd.Radio.Group, {
    onChange: function onChange(e) {
      return setLogicType(e.target.value);
    },
    value: logicType,
    optionType: 'button',
    buttonStyle: 'solid'
  }, React__default.createElement(antd.Tooltip, {
    title: "Returns result if there's a match for any of the queries (read guide below)."
  }, React__default.createElement(antd.Radio, {
    value: 'or'
  }, "Match any query")), React__default.createElement(antd.Tooltip, {
    title: "Returns result if there's a match for all of the queries  (read guide below)."
  }, React__default.createElement(antd.Radio, {
    value: 'and'
  }, "Match all queries"))))), React__default.createElement(Align, {
    style: {
      width: '100%',
      paddingBottom: 20
    },
    type: 'column',
    alignCenter: true,
    justifyCenter: true,
    id: 'filter__field__container'
  }, ((state === null || state === void 0 ? void 0 : state.filters) || []).map(function (data, index) {
    return React__default.createElement(FilterItem, {
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

var Sort = (function () {
  return React__default.createElement("div", null, "Hello Sort");
});

var TabPane = antd.Tabs.TabPane;
var DataManagement = (function (props) {
  var visible = props.visible,
      handleCancel = props.handleCancel,
      columns = props.columns,
      dataSource = props.dataSource;

  var _useState = React.useState('filter'),
      activeTab = _useState[0],
      setActiveTab = _useState[1];

  var _useReducer = React.useReducer(dataManagementReducer, columns.selected, initDataManagementState),
      state = _useReducer[0],
      dispatch = _useReducer[1];

  console.log(state);
  var dimension = useDimension();

  var ModalFooter = function ModalFooter(props) {
    var activeTab = props.activeTab,
        dispatch = props.dispatch,
        state = props.state;

    if (activeTab === 'search') {
      return React__default.createElement(Align, {
        style: {
          width: '100%'
        },
        alignCenter: true,
        justifyBetween: true
      }, React__default.createElement(antd.Popover, {
        style: {
          width: 240
        },
        title: React__default.createElement("strong", {
          style: {
            color: 'var(--text-color)'
          }
        }, "Using the search"),
        content: React__default.createElement("p", {
          style: {
            width: 240,
            fontSize: 13,
            color: 'var(--text-color)'
          }
        }, "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."),
        trigger: 'click'
      }, React__default.createElement(antd.Tooltip, {
        title: 'Help'
      }, React__default.createElement(antd.Button, {
        type: 'link'
      }, React__default.createElement("span", {
        className: 'anticon'
      }, React__default.createElement("i", {
        className: 'ri-question-line',
        style: {
          fontSize: 20
        }
      }))))), React__default.createElement(antd.Button, null, "Clear search"));
    }

    if (activeTab === 'filter') {
      var addFilter = function addFilter() {
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

      var applyFilter = function applyFilter() {
        console.log(state === null || state === void 0 ? void 0 : state.filters);
      };

      return React__default.createElement(Align, {
        style: {
          width: '100%'
        },
        alignCenter: true,
        justifyBetween: true
      }, React__default.createElement(Align, {
        alignCenter: true
      }, React__default.createElement(antd.Popover, {
        style: {
          width: 240
        },
        title: React__default.createElement("strong", {
          style: {
            color: 'var(--text-color)'
          }
        }, "Using the filter"),
        content: React__default.createElement("p", {
          style: {
            width: 240,
            fontSize: 13,
            color: 'var(--text-color)'
          }
        }, "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."),
        trigger: 'click'
      }, React__default.createElement(antd.Tooltip, {
        title: 'Help'
      }, React__default.createElement(antd.Button, {
        type: 'link'
      }, React__default.createElement("span", {
        className: 'anticon'
      }, React__default.createElement("i", {
        className: 'ri-question-line',
        style: {
          fontSize: 20
        }
      }))))), React__default.createElement(Margin, {
        left: 20
      }, React__default.createElement(antd.Button, {
        type: 'primary',
        icon: React__default.createElement("span", {
          className: 'anticon'
        }, React__default.createElement("i", {
          className: 'ri-add-line',
          style: {
            fontSize: 16
          }
        })),
        onClick: addFilter
      }, "Add Filter"))), React__default.createElement(Align, null, ' ', React__default.createElement(antd.Button, null, "Clear filter"), React__default.createElement(Margin, {
        left: 20
      }, React__default.createElement(antd.Button, {
        icon: React__default.createElement("span", {
          className: 'anticon'
        }, React__default.createElement("i", {
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
      return React__default.createElement(Align, {
        style: {
          width: '100%'
        },
        alignCenter: true,
        justifyBetween: true
      }, React__default.createElement(Align, {
        alignCenter: true
      }, React__default.createElement(antd.Popover, {
        style: {
          width: 240
        },
        title: React__default.createElement("strong", {
          style: {
            color: 'var(--text-color)'
          }
        }, "Using the sort"),
        content: React__default.createElement("p", {
          style: {
            width: 240,
            fontSize: 13,
            color: 'var(--text-color)'
          }
        }, "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."),
        trigger: 'click'
      }, React__default.createElement(antd.Tooltip, {
        title: 'Help'
      }, React__default.createElement(antd.Button, {
        type: 'link'
      }, React__default.createElement("span", {
        className: 'anticon'
      }, React__default.createElement("i", {
        className: 'ri-question-line',
        style: {
          fontSize: 20
        }
      }))))), React__default.createElement(Margin, {
        left: 20
      }, React__default.createElement(antd.Button, {
        type: 'primary',
        icon: React__default.createElement("span", {
          className: 'anticon'
        }, React__default.createElement("i", {
          className: 'ri-add-line',
          style: {
            fontSize: 16
          }
        }))
      }, "Add sort"))), React__default.createElement(Align, null, ' ', React__default.createElement(antd.Button, null, "Clear sort"), React__default.createElement(Margin, {
        left: 20
      }, React__default.createElement(antd.Button, {
        icon: React__default.createElement("span", {
          className: 'anticon'
        }, React__default.createElement("i", {
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

  return React__default.createElement(antd.Modal, {
    visible: visible,
    title: 'Data Management',
    onCancel: handleCancel,
    centered: true,
    width: '75%',
    bodyStyle: {
      height: dimension.height * 0.65,
      padding: 0
    },
    footer: [React__default.createElement(ModalFooter, {
      key: 'modal-footer',
      activeTab: activeTab,
      dispatch: dispatch,
      state: state
    })]
  }, React__default.createElement(antd.Tabs, {
    defaultActiveKey: 'filter',
    centered: true,
    tabBarStyle: {
      height: 50
    },
    tabBarGutter: 40,
    onChange: function onChange(key) {
      return setActiveTab(key);
    }
  }, React__default.createElement(TabPane, {
    tab: 'Search',
    key: 'search'
  }, React__default.createElement(framerMotion.motion.div, {
    layout: true
  }, React__default.createElement(Search, {
    columns: columns
  }))), React__default.createElement(TabPane, {
    tab: 'Filter',
    key: 'filter'
  }, React__default.createElement(Filter, {
    columns: columns,
    dataSource: dataSource,
    dispatch: dispatch,
    state: state
  })), React__default.createElement(TabPane, {
    tab: 'Sort',
    key: 'sort'
  }, React__default.createElement(Sort, null))));
});

var Header = (function (props) {
  var dataSource = props.dataSource,
      columns = props.columns,
      _props$renderOrder = props.renderOrder,
      pageRenderOrder = _props$renderOrder.pageRenderOrder,
      setPageRenderOrder = _props$renderOrder.setPageRenderOrder;

  var _useState = React.useState({
    visible: false
  }),
      filterColumn = _useState[0],
      setFilterColumn = _useState[1];

  var handleFilterColumnCancel = function handleFilterColumnCancel() {
    setFilterColumn(function (prev) {
      return _extends({}, prev, {
        visible: false
      });
    });
  };

  return React__default.createElement("div", {
    className: '___table-container-header'
  }, React__default.createElement("div", {
    className: '___table-container-header-inner-left'
  }, React__default.createElement("div", {
    className: '___table-filter-radio-sort'
  }, React__default.createElement(antd.Tooltip, {
    title: 'Manage data'
  }, React__default.createElement(antd.Button, {
    icon: React__default.createElement("span", {
      className: 'anticon'
    }, React__default.createElement("i", {
      className: 'ri-database-2-line',
      style: {
        fontSize: 17
      }
    })),
    onClick: function onClick() {
      setFilterColumn(function (prev) {
        return _extends({}, prev, {
          visible: true
        });
      });
    },
    type: 'primary'
  }, "Data Management")), React__default.createElement(DataManagement, {
    visible: filterColumn.visible,
    handleCancel: handleFilterColumnCancel,
    columns: columns,
    dataSource: dataSource
  })), React__default.createElement("div", {
    className: '___table-filter-btn-container'
  }, React__default.createElement(TableControls.ControlActions, null))), React__default.createElement("div", {
    className: '___table-container-header-inner-right'
  }, React__default.createElement(TableControls.ColumnDensity, null), React__default.createElement(TableControls.RenderOrder, {
    renderOrder: pageRenderOrder,
    setRenderOrder: setPageRenderOrder
  })));
});

var initQuickFilterState = function initQuickFilterState(columns) {
  return {
    filters: columns.slice(0, 4).map(function (value, index) {
      return _extends({}, value, {
        filterIndex: index,
        property: value === null || value === void 0 ? void 0 : value.key,
        value: null
      });
    })
  };
};

var quickFilterReducer = function quickFilterReducer(state, action) {
  switch (action.type) {
    case 'ADD_FILTER':
      {
        var filterIndex = state.filters.length;
        return _extends({}, state, {
          filters: state.filters.concat(_extends({}, action.payload, {
            filterIndex: filterIndex
          }))
        });
      }

    case 'REMOVE_FILTER':
      return _extends({}, state, {
        filters: lodash.filter(state.filters, function (o) {
          var _action$payload;

          return o.filterIndex !== ((_action$payload = action.payload) === null || _action$payload === void 0 ? void 0 : _action$payload.filterIndex);
        })
      });

    case 'UPDATE_FILTER':
      {
        var _action$payload2;

        var filters = state.filters;

        var _filterIndex = (_action$payload2 = action.payload) === null || _action$payload2 === void 0 ? void 0 : _action$payload2.filterIndex;

        filters[_filterIndex] = action.payload;
        return _extends({}, state, {
          filters: filters
        });
      }

    case 'RESET':
      return {
        filters: []
      };

    default:
      return state;
  }
};

var RenderQuickFilterType = (function (props) {
  var type = props.type,
      property = props.property,
      handleAutoComplete = props.handleAutoComplete,
      autoCompleteOptions = props.autoCompleteOptions,
      handleFilterValueChange = props.handleFilterValueChange;
  var value = property === null || property === void 0 ? void 0 : property.value;

  switch (type) {
    case 'number':
      return React__default.createElement(antd.InputNumber, {
        defaultValue: 0,
        value: lodash.isNumber(value) ? value : 0,
        style: {
          width: '100%'
        },
        onChange: function onChange(num) {
          return handleFilterValueChange(num);
        }
      });

    case 'date':
      return React__default.createElement(antd.DatePicker, {
        style: {
          width: '100%'
        },
        value: moment(lodash.isDate(value) ? value : new Date()),
        onChange: function onChange(date) {
          return handleFilterValueChange(moment(date || new Date()).toDate());
        }
      });

    case 'datetime':
      return React__default.createElement(antd.DatePicker, {
        showTime: true,
        style: {
          width: '100%'
        },
        value: moment(lodash.isDate(value) ? value : new Date()),
        onChange: function onChange(date) {
          return handleFilterValueChange(moment(date || new Date()).toDate());
        }
      });

    case 'list':
      if (lodash.has(property, 'listMenu') && !lodash.isEmpty(property === null || property === void 0 ? void 0 : property.listMenu)) {
        var _property$title;

        return React__default.createElement(antd.Select, {
          mode: (property === null || property === void 0 ? void 0 : property.multiple) ? 'multiple' : undefined,
          style: {
            width: '100%'
          },
          placeholder: (property === null || property === void 0 ? void 0 : property.title) ? "Select " + (property === null || property === void 0 ? void 0 : (_property$title = property.title) === null || _property$title === void 0 ? void 0 : _property$title.toLowerCase()) : '',
          value: value || undefined,
          onChange: function onChange(value) {
            return handleFilterValueChange(value);
          },
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

        return React__default.createElement(antd.AutoComplete, {
          options: autoCompleteOptions,
          onSelect: function onSelect(value) {
            return handleFilterValueChange(value);
          },
          onSearch: handleAutoComplete,
          style: {
            width: '100%'
          },
          placeholder: (property === null || property === void 0 ? void 0 : property.title) ? "Specify " + ((_property$title2 = property.title) === null || _property$title2 === void 0 ? void 0 : (_property$title2$toLo = _property$title2.toLowerCase) === null || _property$title2$toLo === void 0 ? void 0 : _property$title2$toLo.call(_property$title2)) : ''
        });
      } else {
        var _property$title3, _property$title3$toLo;

        return React__default.createElement(antd.Input, {
          style: {
            width: '100%'
          },
          value: value,
          onChange: function onChange(e) {
            return handleFilterValueChange(e.target.value);
          },
          placeholder: (property === null || property === void 0 ? void 0 : property.title) ? "Specify " + ((_property$title3 = property.title) === null || _property$title3 === void 0 ? void 0 : (_property$title3$toLo = _property$title3.toLowerCase) === null || _property$title3$toLo === void 0 ? void 0 : _property$title3$toLo.call(_property$title3)) : ''
        });
      }

  }
});

var QuickFilterItem = (function (props) {
  var dataSource = props.dataSource,
      property = props.property,
      dispatch = props.dispatch;
  var type = (property === null || property === void 0 ? void 0 : property.type) || 'text';

  var _useState = React.useState(null),
      autoCompleteProps = _useState[0],
      setAutoCompleteProps = _useState[1];

  var _useState2 = React.useState([]),
      autoCompleteOptions = _useState2[0],
      setAutoCompleteOptions = _useState2[1];

  var handleAutoCompleteResource = React.useCallback(function (acc, current, index) {
    var currentValue = current[(property === null || property === void 0 ? void 0 : property.key) || ''] || '';
    var tokenize = currentValue.trim().split(' ').join('_');
    return index === 0 ? acc.concat(tokenize) : acc.concat("\n" + tokenize);
  }, [property]);
  React.useEffect(function () {
    if (type === 'text' && (property === null || property === void 0 ? void 0 : property.autoComplete)) {
      setAutoCompleteProps(dataSource.reduce(handleAutoCompleteResource, ''));
    }
  }, [dataSource, handleAutoCompleteResource, property, type]);

  var handleAutoComplete = function handleAutoComplete(value) {
    var regex = new RegExp("(^|\\s)" + value + "+(?:\\w)*(\\s|$)|(^|\\s)\\w+(?:\\w)*(?:_)" + value + "+(?:\\w)*(\\s|$)", 'gim');
    var options = autoCompleteProps === null || autoCompleteProps === void 0 ? void 0 : autoCompleteProps.match(regex);

    if (options) {
      setAutoCompleteOptions((options || []).map(function (o) {
        return {
          value: o.split('_').join(' ').trim()
        };
      }));
    }
  };

  var handleFilterRemoval = function handleFilterRemoval(filterIndex) {
    dispatch({
      type: 'REMOVE_FILTER',
      payload: {
        filterIndex: filterIndex
      }
    });
  };

  var handleFilterValueChange = function handleFilterValueChange(value) {
    dispatch({
      type: 'UPDATE_FILTER',
      payload: _extends({}, property, {
        value: value
      })
    });
    return null;
  };

  return React__default.createElement(antd.Col, {
    span: 6
  }, React__default.createElement(framerMotion.motion.div, {
    layout: true
  }, React__default.createElement(Align, {
    justifyCenter: true,
    type: 'column',
    style: {
      width: '100%'
    }
  }, React__default.createElement(Padding, {
    bottom: 10
  }, React__default.createElement(Align, {
    style: {
      width: '100%'
    },
    justifyBetween: true,
    alignCenter: true
  }, React__default.createElement("span", {
    className: 'filter-title'
  }, (property === null || property === void 0 ? void 0 : property.title) || '⏤⏤⏤⏤'), React__default.createElement(antd.Tooltip, {
    title: 'Remove filter'
  }, React__default.createElement(antd.Button, {
    type: 'text',
    onClick: function onClick() {
      return handleFilterRemoval(property.filterIndex);
    },
    icon: React__default.createElement("span", {
      className: 'anticon'
    }, React__default.createElement("i", {
      className: 'ri-close-line'
    }))
  })))), React__default.createElement(RenderQuickFilterType, {
    property: property,
    autoCompleteOptions: autoCompleteOptions,
    type: type,
    handleAutoComplete: handleAutoComplete,
    handleFilterValueChange: handleFilterValueChange
  }))));
});

var Panel = antd.Collapse.Panel;
var EmptyImage = React__default.createElement("svg", {
  xmlns: 'http://www.w3.org/2000/svg',
  width: '123.58',
  height: '66.37',
  viewBox: '0 0 123.58 66.37'
}, React__default.createElement("g", {
  transform: 'translate(0 1.25)'
}, React__default.createElement("path", {
  d: 'M34.04,51.8a5.18,5.18,0,1,1,0-10.36H5.18a5.18,5.18,0,1,1,0-10.36h29.6a5.18,5.18,0,0,0,0-10.36H16.28a5.18,5.18,0,0,1,0-10.36h29.6A5.18,5.18,0,1,1,45.88,0H118.4a5.18,5.18,0,0,1,0,10.36H88.8a5.18,5.18,0,1,1,0,10.36h16.28a5.18,5.18,0,1,1,0,10.36H97.551c-3.607,0-6.531,2.319-6.531,5.179s4.44,5.18,4.44,5.18a5.18,5.18,0,1,1,0,10.36Zm79.18-25.9a5.18,5.18,0,1,1,5.18,5.18A5.18,5.18,0,0,1,113.22,25.9Z',
  transform: 'translate(0 7.4)',
  fill: '#f3f7ff'
}), React__default.createElement("path", {
  d: 'M21.548,0A8.88,8.88,0,1,0,39.132,0H60.68V19.753a2.22,2.22,0,0,1-2.22,2.22H2.22A2.22,2.22,0,0,1,0,19.753V0Z',
  transform: 'translate(31.08 43.147)',
  fill: '#fff'
}), React__default.createElement("path", {
  d: 'M39.96,22.94a9.62,9.62,0,0,1-19.24,0q0-.258.013-.513H0L7.075,1.509A2.22,2.22,0,0,1,9.178,0H51.5a2.22,2.22,0,0,1,2.1,1.509L60.68,22.427H39.947Q39.96,22.682,39.96,22.94Z',
  transform: 'translate(31.08 19.98)',
  fill: '#fff'
}), React__default.createElement("path", {
  d: 'M31.892,16.986A8.468,8.468,0,0,1,23.68,25.16a8.468,8.468,0,0,1-8.212-8.174c0-.133,0-1.005.011-1.136H0L6.039,1.166A1.89,1.89,0,0,1,7.835,0H39.525a1.89,1.89,0,0,1,1.8,1.166L47.36,15.85H31.881C31.888,15.981,31.892,16.853,31.892,16.986Z',
  transform: 'translate(37.74 26.64)',
  fill: '#e8f0fe'
}), React__default.createElement("g", {
  transform: 'translate(31.08 19.98)',
  fill: 'none',
  strokeLinejoin: 'round',
  strokeMiterlimit: '10'
}, React__default.createElement("path", {
  d: 'M7.075,1.509A2.22,2.22,0,0,1,9.178,0H51.5a2.22,2.22,0,0,1,2.1,1.509L60.68,22.427V42.18a2.22,2.22,0,0,1-2.22,2.22H2.22A2.22,2.22,0,0,1,0,42.18V22.427Z',
  stroke: 'none'
}), React__default.createElement("path", {
  d: 'M 9.378589630126953 2.5 L 2.5 22.8382453918457 L 2.5 41.89999771118164 L 58.18000030517578 41.89999771118164 L 58.18000030517578 22.8382453918457 L 51.30142211914062 2.5 L 9.378589630126953 2.5 M 9.177707672119141 0 L 51.50229263305664 0 C 52.45426559448242 0 53.3002815246582 0.6069602966308594 53.60527801513672 1.508747100830078 L 60.68000030517578 22.42690467834473 L 60.68000030517578 42.18000030517578 C 60.68000030517578 43.40606689453125 59.68606567382812 44.39999771118164 58.45999908447266 44.39999771118164 L 2.220001220703125 44.39999771118164 C 0.9939193725585938 44.39999771118164 0 43.40606689453125 0 42.18000030517578 L 0 22.42690467834473 L 7.074718475341797 1.508747100830078 C 7.379718780517578 0.6069602966308594 8.225734710693359 0 9.177707672119141 0 Z',
  stroke: 'none',
  fill: '#75a4fe'
})), React__default.createElement("path", {
  d: 'M10.473,10.361a9.131,9.131,0,0,1-6.423-2.6A8.723,8.723,0,0,1,1.389,1.481C1.389.963,1.389,0,0,0H20.878c-1.321.032-1.321.974-1.321,1.481A8.723,8.723,0,0,1,16.9,7.76,9.131,9.131,0,0,1,10.473,10.361Z',
  transform: 'translate(50.871 42.179)',
  fill: 'none',
  stroke: '#75a4fe',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeMiterlimit: '10',
  strokeWidth: '2.5'
}), React__default.createElement("path", {
  d: 'M38.553,3.184,30.34,12.4ZM19.314,0V0ZM0,3.184,8.214,12.4Z',
  transform: 'translate(41.44)',
  fill: 'none',
  stroke: '#a4c3fe',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeMiterlimit: '10',
  strokeWidth: '2.5'
})));
var QuickFilter = (function (props) {
  var columns = props.columns,
      dataSource = props.dataSource;

  var _useReducer = React.useReducer(quickFilterReducer, columns.selected, initQuickFilterState),
      state = _useReducer[0],
      dispatch = _useReducer[1];

  var addFilter = function addFilter(propertyIndex) {
    var columnProperty = columns.all[parseInt(propertyIndex, 10)];
    dispatch({
      type: 'ADD_FILTER',
      payload: _extends({}, columnProperty, {
        property: columnProperty === null || columnProperty === void 0 ? void 0 : columnProperty.key,
        value: null
      })
    });
  };

  var clearFilter = function clearFilter() {
    return dispatch({
      type: 'RESET'
    });
  };

  var applyFilter = function applyFilter() {
    var filters = state.filters.map(function (value) {
      return lodash.pick(value, ['property', 'value']);
    });
    console.log(filters);
    return filters;
  };

  var menu = React__default.createElement(antd.Menu, {
    onClick: function onClick(_ref) {
      var key = _ref.key;
      return addFilter(String(key));
    }
  }, columns.all.map(function (value, index) {
    return React__default.createElement(antd.Menu.Item, {
      key: index
    }, (value === null || value === void 0 ? void 0 : value.title) || '_____');
  }));
  return React__default.createElement("div", {
    className: 'QuickFilter'
  }, React__default.createElement(antd.Collapse, {
    expandIconPosition: 'right'
  }, React__default.createElement(Panel, {
    header: React__default.createElement(Align, {
      alignCenter: true
    }, React__default.createElement(Margin, {
      right: 20
    }, React__default.createElement(antd.Typography.Text, null, "Quick Filter"))),
    key: '1'
  }, React__default.createElement(Align, {
    className: 'filter-container',
    alignCenter: true,
    justifyCenter: lodash.isEmpty(state.filters)
  }, lodash.isEmpty(state.filters) ? React__default.createElement(framerMotion.motion.div, {
    layout: true,
    style: {
      width: '100%'
    }
  }, React__default.createElement(antd.Empty, {
    image: EmptyImage,
    imageStyle: {
      height: 60
    },
    description: 'Please add a filter'
  }, React__default.createElement(antd.Dropdown, {
    overlay: menu,
    trigger: ['click']
  }, React__default.createElement(antd.Button, {
    type: 'default',
    icon: React__default.createElement("span", {
      className: 'anticon'
    }, React__default.createElement("i", {
      className: 'ri-add-line',
      style: {
        fontSize: 16
      }
    }))
  }, "Add filter")))) : React__default.createElement(framerMotion.motion.div, {
    layout: true,
    style: {
      width: '100%'
    }
  }, React__default.createElement(Align, {
    className: 'filter-body',
    type: 'column'
  }, React__default.createElement(Align, {
    alignStart: true,
    className: 'filter-header'
  }, React__default.createElement(antd.Dropdown, {
    overlay: menu,
    trigger: ['click']
  }, React__default.createElement(antd.Button, {
    type: 'link',
    icon: React__default.createElement("span", {
      className: 'anticon'
    }, React__default.createElement("i", {
      className: 'ri-add-line',
      style: {
        fontSize: 16
      }
    }))
  }, "Add filter"))), React__default.createElement(Padding, {
    className: 'filter-elements-wrapper',
    vertical: 16,
    horizontal: 16
  }, React__default.createElement(antd.Row, {
    gutter: [15, 20]
  }, state.filters.map(function (property, index) {
    return React__default.createElement(QuickFilterItem, {
      key: property.type + "___" + index,
      dataSource: dataSource,
      dispatch: dispatch,
      property: property
    });
  }))), React__default.createElement(Position, {
    type: 'absolute',
    bottom: 0,
    style: {
      width: '100%'
    },
    className: 'filter-footer'
  }, React__default.createElement(Align, {
    style: {
      width: '100%'
    },
    justifyBetween: true,
    alignCenter: true
  }, React__default.createElement(antd.Button, {
    type: 'link',
    onClick: clearFilter,
    icon: React__default.createElement("span", {
      className: 'anticon'
    }, React__default.createElement("i", {
      className: 'ri-close-line',
      style: {
        fontSize: 16
      }
    }))
  }, "Clear filter"), React__default.createElement(antd.Button, {
    onClick: applyFilter,
    icon: React__default.createElement("span", {
      className: 'anticon'
    }, React__default.createElement("i", {
      className: 'ri-filter-line',
      style: {
        fontSize: 16
      }
    }))
  }, "Apply filter")))))))));
});

var DataTable = function DataTable(props) {
  var _defaultColumns$slice, _defaultColumns$slice2;

  var defaultColumns = props.columns,
      dataSource = props.dataSource,
      defaultMinCol = props.minColumns,
      defaultMaxCol = props.maxColumns,
      useSkeletonLoader = props.useSkeletonLoader,
      isLoadingContent = props.isLoadingContent,
      pageRenderOrder = props.pageRenderOrder,
      onRenderOrderChange = props.onRenderOrderChange,
      pagination = props.pagination,
      onPaginationChange = props.onPaginationChange;
  if (!defaultColumns || !lodash.isArray(defaultColumns)) throw new Error("DataTable expects column to be of type Array, got " + typeof defaultColumns + " instead");
  if (!dataSource || !lodash.isArray(dataSource)) throw new Error("DataTable expects dataSource to be of type Array, got " + typeof dataSource + " instead");
  var minColumns = lodash.clamp(defaultMinCol || 3, 3, 6);
  var maxColumns = lodash.clamp(defaultMaxCol || 3, minColumns, 6);

  var _useState = React.useState({
    all: defaultColumns || [],
    selected: (defaultColumns === null || defaultColumns === void 0 ? void 0 : (_defaultColumns$slice = defaultColumns.slice) === null || _defaultColumns$slice === void 0 ? void 0 : _defaultColumns$slice.call(defaultColumns, 0, maxColumns)) || [],
    unselected: (defaultColumns === null || defaultColumns === void 0 ? void 0 : defaultColumns.length) > maxColumns ? defaultColumns === null || defaultColumns === void 0 ? void 0 : (_defaultColumns$slice2 = defaultColumns.slice) === null || _defaultColumns$slice2 === void 0 ? void 0 : _defaultColumns$slice2.call(defaultColumns, maxColumns, defaultColumns.length) : []
  }),
      columns = _useState[0],
      setColumns = _useState[1];

  var _useState2 = React.useState({
    checkedList: [],
    indeterminate: true,
    checkAll: false
  }),
      checkState = _useState2[0],
      setCheckedState = _useState2[1];

  var onCheckedChange = function onCheckedChange(checkedList) {
    setCheckedState({
      checkedList: checkedList,
      indeterminate: checkedList.length > 0 && checkedList.length !== dataSource.length,
      checkAll: checkedList.length === dataSource.length
    });
  };

  var onCheckAllChange = function onCheckAllChange(e) {
    setCheckedState({
      checkedList: e.target.checked ? dataSource : [],
      indeterminate: false,
      checkAll: e.target.checked
    });
  };

  var columnKeys = React.useMemo(function () {
    return columns.selected.map(function (value) {
      return value === null || value === void 0 ? void 0 : value.key;
    });
  }, [columns.selected]);

  var handlePagination = function handlePagination(page) {
    onPaginationChange(page);
  };

  return React__default.createElement("div", {
    className: '___table-container'
  }, React__default.createElement(Header, {
    columns: columns,
    dataSource: dataSource,
    renderOrder: {
      pageRenderOrder: pageRenderOrder || 15,
      setPageRenderOrder: onRenderOrderChange || null
    }
  }), React__default.createElement(QuickFilter, {
    columns: columns,
    dataSource: dataSource
  }), React__default.createElement(Table, {
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

exports.Align = Align;
exports.DataTable = DataTable;
exports.Margin = Margin;
exports.Padding = Padding;
exports.Position = Position;
exports.toPercentage = toPercentage;
exports.useDimension = useDimension;
//# sourceMappingURL=index.js.map
