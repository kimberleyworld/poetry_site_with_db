'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, FileText, Image, Music } from 'lucide-react';
import { format } from 'date-fns';

interface AddPoemFormProps {
  onPoemAdded: () => void;
}

export default function AddPoemForm({ onPoemAdded }: AddPoemFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    reader: '',
    description: '',
    contentType: 'text' as 'text' | 'image' | 'audio',
    content: '',
  });
  
  const [eventDate, setEventDate] = useState<Date>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileError, setFileError] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContentTypeChange = (value: string) => {
    setFormData(prev => ({ ...prev, contentType: value as 'text' | 'image' | 'audio', content: '' }));
    setSelectedFile(null);
    setFileError('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 200KB)
    if (file.size > 200 * 1024) {
      setFileError('File size must be less than 200KB');
      setSelectedFile(null);
      return;
    }

    // Validate file type
    if (formData.contentType === 'image') {
      if (!file.type.match(/^image\/(png|jpg|jpeg)$/)) {
        setFileError('Only PNG and JPG images are allowed');
        setSelectedFile(null);
        return;
      }
    } else if (formData.contentType === 'audio') {
      // ADD MAX SIZE CHECK FOR AUDIO
      if (!file.type.match(/^audio\/(mp3|mpeg)$/)) {
        setFileError('Only MP3 files are allowed');
        setSelectedFile(null);
        return;
      }
    }

    setFileError('');
    setSelectedFile(file);
  };

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload file');
    }

    const { url } = await response.json();
    return url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let content = formData.content;

      // Handle file upload if needed
      if ((formData.contentType === 'image' || formData.contentType === 'audio') && selectedFile) {
        content = await uploadFile(selectedFile);
      }

      const requestBody = {
        title: formData.title,
        author: formData.author,
        reader: formData.reader,
        description: formData.description,
        content,
        contentType: formData.contentType,
        eventDate: eventDate?.toISOString(),
      };

      console.log('Sending request body:', requestBody);

      const response = await fetch('/api/poems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        // Reset form
        setFormData({
          title: '',
          author: '',
          reader: '',
          description: '',
          contentType: 'text',
          content: '',
        });
        setEventDate(undefined);
        setSelectedFile(null);
        onPoemAdded();
      } else {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        console.error('Response status:', response.status);
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          errorData = { error: errorText };
        }
        
        throw new Error(errorData.error || 'Failed to create poem');
      }
    } catch (error) {
      console.error('Error adding poem:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Failed to create poem'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Add New Poem
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="author">Author *</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="reader">Reader *</Label>
              <Input
                id="reader"
                value={formData.reader}
                onChange={(e) => handleInputChange('reader', e.target.value)}
              />
            </div>
            <div>
              <Label>Event Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {eventDate ? format(eventDate, 'PPP') : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={eventDate}
                    onSelect={setEventDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={2}
            />
          </div>

          {/* Content Type Selection */}
          <div>
            <Label>Content Type *</Label>
            <RadioGroup
              value={formData.contentType}
              onValueChange={handleContentTypeChange}
              className="flex flex-row space-x-6 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="text" id="text" />
                <Label htmlFor="text" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Text
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="image" id="image" />
                <Label htmlFor="image" className="flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  Image
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="audio" id="audio" />
                <Label htmlFor="audio" className="flex items-center gap-2">
                  <Music className="h-4 w-4" />
                  Audio
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Content Input */}
          {formData.contentType === 'text' && (
            <div>
              <Label htmlFor="content">Poem Content *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                required
                rows={6}
                placeholder="Enter your poem here..."
              />
            </div>
          )}

          {(formData.contentType === 'image' || formData.contentType === 'audio') && (
            <div>
              <Label htmlFor="file">
                {formData.contentType === 'image' ? 'Upload Image (PNG/JPG, max 200KB) *' : 'Upload Audio (MP3, max 200KB) *'}
              </Label>
              <div className="mt-2">
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  accept={formData.contentType === 'image' ? '.png,.jpg,.jpeg' : '.mp3'}
                  required
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {fileError && (
                  <p className="text-red-500 text-sm mt-1">{fileError}</p>
                )}
                {selectedFile && !fileError && (
                  <p className="text-green-600 text-sm mt-1">
                    Selected: {selectedFile.name} ({Math.round(selectedFile.size / 1024)}KB)
                  </p>
                )}
              </div>
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isSubmitting || (formData.contentType !== 'text' && !selectedFile)}
            className="w-full"
          >
            {isSubmitting ? 'Adding...' : 'Add Poem'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
