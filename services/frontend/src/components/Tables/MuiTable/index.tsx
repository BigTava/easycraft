// Core
import { MouseEventHandler, ReactNode } from "react";

// Components
import MUIDataTable from "mui-datatables";

// Styles
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles.js";

type TableType = {
  rows: Record<string, unknown>[];
  columns: Record<string, unknown>[];
};

type SortOrderType = {
  name: string;
  direction: string;
};

export type MuiTableProps = {
  table: TableType;
  canSearch?: boolean;
  canFilter?: boolean;
  canDownload?: boolean;
  canViewColumns?: boolean;
  canJumpToPage?: boolean;
  canPaginate?: boolean;
  footerComponent?: ReactNode;
  isRemote?: boolean;
  rowsPerPage?: number;
  totalCount?: number;
  rowsOptions?: number[];
  onTableChange?: () => void;
  onFilterChange?: () => void;
  onDownload?: () => void;
  onChangePage?: () => void;
  onChangeRowsPerPage?: () => void;
  onRowClick?: MouseEventHandler;
  sortOrder?: SortOrderType;
};

export default function MuiTable({
  table,
  canSearch = true,
  canFilter = true,
  canDownload = false,
  canViewColumns = true,
  canJumpToPage = false,
  canPaginate = true,
  rowsOptions = [5, 10, 15, 20, 25],
  rowsPerPage = 10,
  footerComponent = null,
  isRemote = false,
  ...props
}: MuiTableProps) {
  const { rows, columns } = table;

  const options = {
    serverSide: isRemote,
    search: canSearch,
    download: canDownload,
    print: false,
    viewColumns: canViewColumns,
    filter: canFilter,
    rowsPerPage,
    rowsPerPageOptions: rowsOptions,
    pagination: canPaginate,
    filterType: "dropdown",
    responsive: "standard",
    tableBodyHeight: "80%",
    selectableRowsHideCheckboxes: true,
    selectToolbarPlacement: "replace",
    selectableRowsOnClick: false,
    jumpToPage: canJumpToPage,
    customFooter: footerComponent,

    ...props,
  };

  return (
    <ThemeProvider theme={theme()}>
      <MUIDataTable data={rows} columns={columns} options={options} />
    </ThemeProvider>
  );
}
