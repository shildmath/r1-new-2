
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, FileSpreadsheet } from "lucide-react";
import { exportToCSV } from "@/utils/csvExport";
import * as XLSX from "xlsx";

interface ExportButtonsProps {
  data: any[];
  filename?: string;
  csvHeaders?: string[]; // for CSV header row
}

/**
 * ExportButtons - reusable export utility (CSV, XLSX)
 * Props:
 *  - data: Array of objects to export
 *  - filename: Default name for file (optional, without extension)
 *  - csvHeaders: Optional array of keys to use for CSV export header
 */
const ExportButtons: React.FC<ExportButtonsProps> = ({
  data,
  filename = "export",
  csvHeaders
}) => {
  function handleCSVExport() {
    exportToCSV(data, filename + ".csv", csvHeaders);
  }
  function handleXLSXExport() {
    if (!data?.length) return;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, filename + ".xlsx");
  }
  return (
    <div className="flex gap-2 my-3">
      <Button
        variant="outline"
        size="sm"
        onClick={handleCSVExport}
        disabled={!data?.length}
        className="flex items-center gap-2"
        title="Export as CSV"
      >
        <FileText size={18} /> Export CSV
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleXLSXExport}
        disabled={!data?.length}
        className="flex items-center gap-2"
        title="Export as XLSX"
      >
        <FileSpreadsheet size={18} /> Export XLSX
      </Button>
    </div>
  );
};

export default ExportButtons;
