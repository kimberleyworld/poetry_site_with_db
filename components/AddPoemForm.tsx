'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, FileText, Image as ImageIcon, Music } from 'lucide-react';
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
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    if (showThankYou) {
      const timer = setTimeout(() => setShowThankYou(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showThankYou]);

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

    // Validate file size based on type
    const maxImageSize = 2 * 1024 * 1024; // 2MB for images
    const maxAudioSize = 5 * 1024 * 1024; // 5MB for audio
    
    let maxSize;
    if (formData.contentType === 'image') {
      maxSize = maxImageSize;
    } else if (formData.contentType === 'audio') {
      maxSize = maxAudioSize;
    }

    if (file.size > maxSize!) {
      const maxSizeMB = Math.round(maxSize! / (1024 * 1024));
      setFileError(`File size must be less than ${maxSizeMB}MB`);
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
        setShowThankYou(true);
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
    <Card className="w-full max-w-2xl mx-auto backdrop-blur-lg bg-white/30 border border-white/20 shadow-xl">
      <CardContent>
        {showThankYou ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold mb-4 text-neutral-800">Thank you for submitting your piece to the archive!</h3>
            <p className="text-neutral-700 max-w-md mx-auto">You&apos;ll see it appear in the archive in a few days after it has been approved.</p>
          </div>
        ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title" className="mb-2 block font-[family-name:var(--font-ibm-plex-mono)] font-normal">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
                className="font-[family-name:var(--font-ibm-plex-mono)] font-normal"
              />
            </div>
            <div>
              <Label htmlFor="author" className="mb-2 block font-[family-name:var(--font-ibm-plex-mono)] font-normal">Author *</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                required
                className="font-[family-name:var(--font-ibm-plex-mono)] font-normal"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="reader" className="mb-2 block font-[family-name:var(--font-ibm-plex-mono)] font-normal">Sharer *</Label>
              <Input
                id="reader"
                value={formData.reader}
                onChange={(e) => handleInputChange('reader', e.target.value)}
                required
                className="font-[family-name:var(--font-ibm-plex-mono)] font-normal"
              />
            </div>
            <div>
              <Label className="mb-2 block font-[family-name:var(--font-ibm-plex-mono)] font-normal">Event Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal border-neutral-700 rounded-none h-9 px-3 py-1 bg-transparent shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-[color,box-shadow] outline-none"
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
            <Label htmlFor="description" className="mb-2 block font-[family-name:var(--font-ibm-plex-mono)] font-normal">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={2}
              required
              className="font-[family-name:var(--font-ibm-plex-mono)] font-normal"
            />
          </div>

          {/* Content Type Selection */}
          <div>
            <Label className="mb-2 block font-[family-name:var(--font-ibm-plex-mono)] font-normal">Content Type *</Label>
            <RadioGroup
              value={formData.contentType}
              onValueChange={handleContentTypeChange}
              className="flex flex-row space-x-6 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="text" id="text" />
                <Label htmlFor="text" className="flex items-center gap-2 font-[family-name:var(--font-ibm-plex-mono)] font-normal">
                  <FileText className="h-4 w-4" />
                  Text
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="image" id="image" />
                <Label htmlFor="image" className="flex items-center gap-2 font-[family-name:var(--font-ibm-plex-mono)] font-normal">
                  <ImageIcon className="h-4 w-4" />
                  Image
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="audio" id="audio" />
                <Label htmlFor="audio" className="flex items-center gap-2 font-[family-name:var(--font-ibm-plex-mono)] font-normal">
                  <Music className="h-4 w-4" />
                  Audio
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Content Input */}
          {formData.contentType === 'text' && (
            <div>
              <Label htmlFor="content" className="mb-2 block font-[family-name:var(--font-ibm-plex-mono)] font-normal">Words *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                required
                rows={6}
                placeholder="Enter your words here..."
                className="font-[family-name:var(--font-ibm-plex-mono)] font-normal"
              />
            </div>
          )}

          {(formData.contentType === 'image' || formData.contentType === 'audio') && (
            <div>
              <Label htmlFor="file" className="mb-2 block font-[family-name:var(--font-ibm-plex-mono)] font-normal">
                {formData.contentType === 'image' ? 'Upload Image (PNG/JPG, max 2MB) *' : 'Upload Audio (MP3, max 5MB) *'}
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
            className="w-full font-[family-name:var(--font-ibm-plex-mono)] font-normal"
          >
            {isSubmitting ? 'Adding...' : 'Submit'}
          </Button>
        </form>
        )}
      </CardContent>
    </Card>
  );
}
