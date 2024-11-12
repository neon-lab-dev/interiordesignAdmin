/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import * as XLSX from 'xlsx';
import { ICONS } from '../../../assets';

interface DownloadButtonProps {
  data: Array<Record<string, any>>;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ data }) => {
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Table Data");
    XLSX.writeFile(workbook, "table_data.xlsx");
    console.log("clicked")
  };

  return (
    
      <span className="items-center bg-primary-30 h-[38px] w-[38px] flex justify-center rounded-[10px]"  onClick={downloadExcel}>
              <img src={ICONS.download} alt="" className="w-6 h-6" />
            </span>
  );
};

export default DownloadButton;
