<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Search, Download } from '@element-plus/icons-vue'
import { useSystemStore } from '../stores/useSystemStore'

const { historyRecords } = useSystemStore()

const startDate = ref('2026-07-19')
const endDate = ref('2026-07-19')
const deviceFilter = ref('all')

const deviceOptions = [
  { label: '全部设备节点', value: 'all' },
  { label: '1# 危废焚烧线', value: 'line1' },
  { label: '2# 危废焚烧线', value: 'line2' }
]

const currentPage = ref(1)
const pageSize = ref(10)

function handleQuery() {
  ElMessage({ message: '数据查询完成，共 ' + historyRecords.length + ' 条记录', type: 'success' })
}

function handleExport() {
  var csv = '\uFEFF\u65F6\u95F4,SO\u2082\u6D53\u5EA6(mg/m\u00B3),NOx\u6D53\u5EA6(mg/m\u00B3),\u7089\u6E29(\u00B0C),\u55B7\u6C28\u91CF(L/h),AI\u5EFA\u8BAE\u6267\u884C\u72B6\u6001\n'
  historyRecords.forEach(function (r) {
    csv += r.time + ',' + r.so2 + ',' + r.nox + ',' + r.temp + ',' + r.sncrFlow + ',' + r.suggestionApplied + '\n'
  })
  var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  var link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = '\u5386\u53F2\u62A5\u8868_\u70DF\u6C14\u6CBB\u7406_' + new Date().toISOString().slice(0, 10) + '.csv'
  link.click()
  URL.revokeObjectURL(link.href)
  ElMessage.success('历史报表已导出为 CSV 文件')
}

function handlePageSizeChange(val) { pageSize.value = val }
function handleCurrentChange(val) { currentPage.value = val }

function getTagType(status) {
  return status === '未采纳' ? 'info' : 'success'
}
</script>

<template>
  <div>
    <el-card style="margin-bottom:20px;">
      <div class="filter-row">
        <div class="filter-group">
          <span class="filter-label">起始日期</span>
          <input type="date" v-model="startDate" class="native-date-input" />
        </div>
        <div class="filter-group">
          <span class="filter-label">结束日期</span>
          <input type="date" v-model="endDate" class="native-date-input" />
        </div>
        <div class="filter-group">
          <span class="filter-label">设备节点</span>
          <el-select v-model="deviceFilter" placeholder="选择设备" style="width:180px;">
            <el-option v-for="opt in deviceOptions" :key="opt.value" :label="opt.label" :value="opt.value" />
          </el-select>
        </div>
        <div class="filter-actions">
          <el-button type="primary" :icon="Search" @click="handleQuery">查询</el-button>
          <el-button type="warning" :icon="Download" @click="handleExport">导出 Excel</el-button>
        </div>
      </div>
    </el-card>

    <el-card>
      <template #header>
        <span>📊 历史运行数据</span>
      </template>
      <el-table
        :data="historyRecords"
        stripe border
        style="width:100%;"
        :header-cell-style="{ background: '#0A1920', color: '#40C9C0', fontWeight: 700, fontSize: '13px' }"
        :cell-style="{ background: 'transparent', color: '#172720' }"
        :row-style="{ background: 'transparent' }"
      >
        <el-table-column prop="time" label="时间" width="190" />
        <el-table-column prop="so2" label="SO₂浓度 (mg/m³)" width="150" />
        <el-table-column prop="nox" label="NOx浓度 (mg/m³)" width="150" />
        <el-table-column prop="temp" label="炉温 (°C)" width="120" />
        <el-table-column prop="sncrFlow" label="喷氨量 (L/h)" width="130" />
        <el-table-column prop="suggestionApplied" label="AI 建议执行状态" width="160">
          <template #default="{ row }">
            <el-tag :type="getTagType(row.suggestionApplied)" size="small" effect="plain">
              {{ row.suggestionApplied }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>

      <div style="display:flex;justify-content:flex-end;margin-top:20px;padding-top:8px;border-top:1px solid var(--border-subtle);">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50]"
          :total="historyRecords.length"
          layout="total, sizes, prev, pager, next, jumper"
          background
          @size-change="handlePageSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<style>
.filter-row {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}
.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
}
.filter-label {
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
}
.filter-actions {
  display: flex;
  gap: 10px;
  margin-left: auto;
}
.native-date-input {
  width: 170px;
  height: 34px;
  padding: 4px 10px;
  border: 1px solid var(--border-card);
  border-radius: var(--radius-sm);
  font-size: 0.88rem;
  color: var(--text-primary);
  background: var(--bg-card);
  font-family: var(--font-cn);
  outline: none;
  transition: border-color var(--transition);
}
.native-date-input:hover {
  border-color: var(--accent-teal);
}
.native-date-input:focus {
  border-color: var(--accent-teal);
  box-shadow: 0 0 0 3px rgba(11, 128, 140, 0.1);
}
</style>
