'use client';

import { useState } from 'react';
import { Poem } from '@prisma/client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, XCircle, Clock, User, Calendar, FileText } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';

interface AdminApprovalClientProps {
  pendingPoems: Poem[];
  approvedPoems: Poem[];
}

export default function AdminApprovalClient({ 
  pendingPoems: initialPending, 
  approvedPoems: initialApproved 
}: AdminApprovalClientProps) {
  const [pendingPoems, setPendingPoems] = useState(initialPending);
  const [approvedPoems, setApprovedPoems] = useState(initialApproved);
  const [isLoading, setIsLoading] = useState<number | null>(null);

  const handleApprove = async (poemId: number) => {
    setIsLoading(poemId);
    try {
      const response = await fetch('/api/admin/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ poemId, approved: true }),
      });

      if (response.ok) {
        const poem = pendingPoems.find(p => p.id === poemId);
        if (poem) {
          setPendingPoems(prev => prev.filter(p => p.id !== poemId));
          setApprovedPoems(prev => [{ ...poem, approved: true }, ...prev]);
        }
      } else {
        alert('Failed to approve poem');
      }
    } catch (error) {
      console.error('Error approving poem:', error);
      alert('Error approving poem');
    } finally {
      setIsLoading(null);
    }
  };

  const handleReject = async (poemId: number) => {
    setIsLoading(poemId);
    try {
      const response = await fetch('/api/admin/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ poemId, approved: false }),
      });

      if (response.ok) {
        setPendingPoems(prev => prev.filter(p => p.id !== poemId));
      } else {
        alert('Failed to reject poem');
      }
    } catch (error) {
      console.error('Error rejecting poem:', error);
      alert('Error rejecting poem');
    } finally {
      setIsLoading(null);
    }
  };

  const renderPoemContent = (poem: Poem) => {
    switch (poem.contentType) {
      case 'image':
        return (
          <div className="mt-4">
            <Image
              src={poem.content}
              alt={poem.title}
              width={300}
              height={200}
              className="rounded-lg object-cover"
            />
          </div>
        );
      case 'audio':
        return (
          <div className="mt-4">
            <audio controls className="w-full">
              <source src={poem.content} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        );
      case 'text':
      default:
        return (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <pre className="whitespace-pre-wrap font-serif text-sm">
              {poem.content}
            </pre>
          </div>
        );
    }
  };

  const PoemCard = ({ poem, showActions = false }: { poem: Poem; showActions?: boolean }) => (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              {poem.title}
              <Badge variant={poem.approved ? "default" : "secondary"}>
                {poem.approved ? (
                  <>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Approved
                  </>
                ) : (
                  <>
                    <Clock className="h-3 w-3 mr-1" />
                    Pending
                  </>
                )}
              </Badge>
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                Author: {poem.author}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                Reader: {poem.reader}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Event: {format(new Date(poem.eventDate), 'PPP')}
              </span>
              <span className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                {poem.contentType}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-2">{poem.description}</p>
        {renderPoemContent(poem)}
        
        {showActions && (
          <div className="flex gap-2 mt-4 pt-4 border-t">
            <Button
              onClick={() => handleApprove(poem.id)}
              disabled={isLoading === poem.id}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              {isLoading === poem.id ? 'Approving...' : 'Approve'}
            </Button>
            <Button
              onClick={() => handleReject(poem.id)}
              disabled={isLoading === poem.id}
              variant="destructive"
            >
              <XCircle className="h-4 w-4 mr-2" />
              {isLoading === poem.id ? 'Rejecting...' : 'Reject'}
            </Button>
          </div>
        )}
        
        <div className="text-xs text-gray-500 mt-4">
          Submitted: {format(new Date(poem.createdAt), 'PPP p')}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Tabs defaultValue="pending" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="pending" className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Pending ({pendingPoems.length})
        </TabsTrigger>
        <TabsTrigger value="approved" className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          Approved ({approvedPoems.length})
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="pending" className="mt-6">
        <div className="space-y-4">
          {pendingPoems.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center py-8">
                <div className="text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold">All caught up!</h3>
                  <p className="text-gray-600">No poems pending approval.</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            pendingPoems.map(poem => (
              <PoemCard key={poem.id} poem={poem} showActions={true} />
            ))
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="approved" className="mt-6">
        <div className="space-y-4">
          {approvedPoems.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center py-8">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold">No approved poems yet</h3>
                  <p className="text-gray-600">Approved poems will appear here.</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            approvedPoems.map(poem => (
              <PoemCard key={poem.id} poem={poem} showActions={false} />
            ))
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
