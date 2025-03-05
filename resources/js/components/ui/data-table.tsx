import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useDebounce } from '@/hooks/use-debounce';
import { Search, Plus } from 'lucide-react';

export interface Column<T> {
  header: string;
  accessorKey: keyof T | string;
  cell?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  title: string;
  data: {
    data: T[];
    links: any[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
    from: number;
    to: number;
  };
  columns: Column<T>[];
  route_name: string;
  searchPlaceholder?: string;
  filters?: {
    key: string;
    label: string;
    options: { value: string; label: string }[];
  }[];
  createButton?: {
    label: string;
    href: string;
  };
  onDelete?: (item: T) => void;
  searchKey?: string;
}

export function DataTable<T>({
  title,
  data,
  columns,
  route_name,
  searchPlaceholder = "Search...",
  filters = [],
  createButton,
  onDelete,
  searchKey = "search"
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    filters.reduce((acc, filter) => ({ ...acc, [filter.key]: '' }), {})
  );
  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    const params = {
      [searchKey]: debouncedSearch,
      ...activeFilters,
    };

      router.get(route_name, params, { preserveState: true});
    
  }, [debouncedSearch, activeFilters, route_name, searchKey]);

  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters(prev => ({ ...prev, [key]: value }));
  };

  const renderPaginationLinks = () => {
    const links = data.links;
    return links.map((link, index) => {
      if (link.url === null) return null;

      if (link.label === '&laquo; Previous') {
        return (
          <PaginationItem key={index}>
            <PaginationPrevious href={link.url} />
          </PaginationItem>
        );
      }

      if (link.label === 'Next &raquo;') {
        return (
          <PaginationItem key={index}>
            <PaginationNext href={link.url} />
          </PaginationItem>
        );
      }

      return (
        <PaginationItem key={index}>
          <PaginationLink
            href={link.url}
            isActive={link.active}
          >
            {link.label}
          </PaginationLink>
        </PaginationItem>
      );
    });
  };

  return (
    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
      <div className="p-6 bg-white border-b border-gray-200">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-medium">
            {title}
          </h3>
          {createButton && (
            <Button onClick={() => router.visit(createButton.href)}>
                <Plus className="w-4 h-4 mr-2" />
                {createButton.label}      
            </Button>
          )}
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          {filters.map((filter) => (
            <Select
              key={filter.key}
              value={activeFilters[filter.key]}
              onValueChange={(value) => handleFilterChange(filter.key, value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={filter.label} />
              </SelectTrigger>
              <SelectContent>
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column, index) => (
                  <TableHead key={index}>{column.header}</TableHead>
                ))}
                {onDelete && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((item, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex}>
                      {column.cell
                        ? column.cell(item)
                        : String(item[column.accessorKey as keyof T])}
                    </TableCell>
                  ))}
                  {onDelete && (
                    <TableCell>
                      <button
                        onClick={() => onDelete(item)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {data.from} to {data.to} of {data.total} results
          </div>
          <Pagination>
            <PaginationContent>
              {renderPaginationLinks()}
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
} 