'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import MobileFilterMenu from '@/components/MobileFilterMenu';
import { Poem } from '@prisma/client';
import PoemCard from '@/components/PoemCard';

interface PoemsClientProps {
  initialPoems: Poem[];
}

export default function PoemsClient({ initialPoems }: PoemsClientProps) {
  const [filteredPoems, setFilteredPoems] = useState(initialPoems);
  const [filters, setFilters] = useState({ title: '', author: '', date: '' });

  // Extract unique dates in a readable format
  const dates = Array.from(new Set(initialPoems.map(p => new Date(p.createdAt).toDateString())));

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    const filtered = initialPoems.filter(poem => {
      const matchesTitle = !newFilters.title || poem.title.toLowerCase().includes(newFilters.title.toLowerCase());
      const matchesAuthor = !newFilters.author || poem.author.toLowerCase().includes(newFilters.author.toLowerCase());
      const matchesDate = !newFilters.date || new Date(poem.createdAt).toDateString() === newFilters.date;
      return matchesTitle && matchesAuthor && matchesDate;
    });

    setFilteredPoems(filtered);
  };

  return (
    <div className="space-y-4">
      {/* Mobile: Filters in burger menu */}
      <MobileFilterMenu filters={filters} dates={dates} onFilterChange={handleFilterChange} />
      {/* Desktop: Filters inline */}
      <div className="hidden md:flex flex-row gap-4">
        <Input
          placeholder="Filter by Title"
          value={filters.title}
          onChange={e => handleFilterChange('title', e.target.value)}
          className="flex-1"
        />
        <Input
          placeholder="Filter by Author"
          value={filters.author}
          onChange={e => handleFilterChange('author', e.target.value)}
          className="flex-1"
        />
        <div className="w-[200px]">
          <Select value={filters.date} onValueChange={value => handleFilterChange('date', value)}>
            <SelectTrigger className="border-neutral-700 rounded-none h-9 px-3 py-1 bg-transparent shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-[color,box-shadow] outline-none">
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
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPoems.map(poem => (
          <PoemCard key={poem.id} poem={poem} />
        ))}
      </div>
    </div>
  );
}
