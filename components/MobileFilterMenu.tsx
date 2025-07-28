import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface MobileFilterMenuProps {
  filters: { title: string; author: string; date: string };
  dates: string[];
  onFilterChange: (key: 'title' | 'author' | 'date', value: string) => void;
}

export default function MobileFilterMenu({ filters, dates, onFilterChange }: MobileFilterMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button
        variant="outline"
        className="w-full border-neutral-700 rounded-none h-9 px-3 py-1 bg-transparent shadow-xs flex items-center justify-between"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close filters' : 'Open filters'}
      >
        <span>Filters</span>
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
      {open && (
        <div className="mt-2 p-4 border border-neutral-700 rounded-none bg-white/90 shadow-md space-y-4 animate-fade-in">
          <Input
            placeholder="Filter by Title"
            value={filters.title}
            onChange={e => onFilterChange('title', e.target.value)}
          />
          <Input
            placeholder="Filter by Author"
            value={filters.author}
            onChange={e => onFilterChange('author', e.target.value)}
          />
          <Select value={filters.date} onValueChange={value => onFilterChange('date', value)}>
            <SelectTrigger className="border-neutral-700 rounded-none h-9 px-3 py-1 bg-transparent shadow-xs">
              <SelectValue placeholder="Filter by Date" />
            </SelectTrigger>
            <SelectContent>
              {dates.map(date => (
                <SelectItem key={date} value={date}>
                  {date}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
