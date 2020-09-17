# @voomsway/react-table

> React table for voomsway web application

[![NPM](https://img.shields.io/npm/v/@voomsway/react-table.svg)](https://www.npmjs.com/package/@voomsway/react-table) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @voomsway/react-table
```

## Usage

```tsx
import React, { Component } from 'react'

import {DataTable, Padding} from '@voomsway/react-table'
import '@voomsway/react-table/dist/index.css'

class Example extends Component {
  render() {
    return <Padding horizontal={20} vertical={20}>
      <DataTable columns={columns} dataSource={dataSource} minColumns={minColumns} maxColumns={maxColumns} pagination={pagination} onPaginationChange={onPaginationChange} pageRenderOrder={pageRenderOrder} onRenderOrderChange={onRenderOrderChange}>
    </Padding>
  }
}
```

## License

MIT © [Cmion](https://github.com/Cmion)
