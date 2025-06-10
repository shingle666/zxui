import ZxTable from './zx-table.vue';
import ZxTableColumn from '../zx-table-column/zx-table-column.vue';

// 导出组件
export { ZxTable, ZxTableColumn };

// 支持按需引入
export default {
  install: (app) => {
    app.component(ZxTable.name || 'zx-table', ZxTable);
    app.component(ZxTableColumn.name || 'zx-table-column', ZxTableColumn);
    return app;
  }
}; 