'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Poem } from '../generated/prisma/client';
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
      <div className="flex flex-col md:flex-row gap-4">
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
            <SelectTrigger>
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
