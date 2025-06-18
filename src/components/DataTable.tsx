import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ArrowUpDown, Search } from 'lucide-react';

interface DataTableProps<T> {
  data: T[];
  columns: {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
    className?: string;
    sortable?: boolean;
  }[];
  className?: string;
  searchable?: boolean;
}

function DataTable<T>({ data, columns, className = '', searchable = false }: DataTableProps<T>): React.ReactElement {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: 'asc' | 'desc';
  }>({
    key: null,
    direction: 'asc'
  });
  
  const [searchTerm, setSearchTerm] = useState<string>('');

  const requestSort = (key: keyof T) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    
    return data.filter(item => {
      // Safely convert item to a record with string keys and unknown values
      const record = item as Record<string, unknown>;
      return Object.keys(record).some(key => {
        const value = record[key];
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
  }, [data, searchTerm]);
  
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T];
      const bValue = b[sortConfig.key as keyof T];
      
      if (aValue === bValue) return 0;
      
      if (sortConfig.direction === 'asc') {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });
  }, [filteredData, sortConfig]);

  return (
    <div className={`table-container ${className}`}>
      {searchable && (
        <div className="mb-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search table..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent transition-all duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
        <table className="data-table w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
              {columns.map((column, index) => (
                <th 
                  key={index}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-150 ${column.className || ''}`}
                  onClick={() => {
                    if ((column.sortable !== false) && (typeof column.accessor === 'string' || typeof column.accessor === 'number')) {
                      requestSort(column.accessor as keyof T);
                    }
                  }}
                  style={{ 
                    cursor: (column.sortable === false || typeof column.accessor === 'function') ? 'default' : 'pointer'
                  }}
                >
                  <div className="flex items-center gap-1 font-semibold">
                    {column.header}
                    {(column.sortable !== false) && typeof column.accessor !== 'function' && (
                      sortConfig.key === column.accessor ? (
                        sortConfig.direction === 'asc' ? 
                          <ChevronUp size={14} className="text-primary-500" /> : 
                          <ChevronDown size={14} className="text-primary-500" />
                      ) : (
                        <ArrowUpDown size={14} className="text-gray-300" />
                      )
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.length > 0 ? (
              sortedData.map((row, rowIndex) => (
                <tr 
                  key={rowIndex}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  {columns.map((column, colIndex) => {
                    let cellContent: React.ReactNode;
                    if (typeof column.accessor === 'function') {
                      cellContent = column.accessor(row);
                    } else {
                      // Ensure the value is converted to a string or another valid ReactNode
                      cellContent = String(row[column.accessor]);
                    }
                    
                    return (
                      <td 
                        key={colIndex}
                        className={`px-6 py-4 whitespace-nowrap text-sm text-gray-700 ${column.className || ''}`}
                      >
                        {cellContent}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500">
                  {searchTerm ? (
                    <div className="flex flex-col items-center">
                      <Search size={24} className="text-gray-400 mb-2" />
                      <p>No results found for "{searchTerm}"</p>
                      <button 
                        className="mt-2 text-primary-500 hover:text-primary-700 text-sm font-medium"
                        onClick={() => setSearchTerm('')}
                      >
                        Clear search
                      </button>
                    </div>
                  ) : (
                    <p>No data available</p>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-2 text-xs text-gray-500 text-right">
        Showing {sortedData.length} of {data.length} entries
      </div>
    </div>
  );
}

export default DataTable;