import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, RefreshCw } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function AIAssistantBanner({ user }) {
  const lastUpdated = user.ai_profile_updated 
    ? formatDistanceToNow(new Date(user.ai_profile_updated), { addSuffix: true })
    : 'never';

  return (
    <Card className="bridgeit-card bg-gradient-to-r from-green-50 via-white to-yellow-50">
      <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-inner">
            <Sparkles className="w-6 h-6 bridgeit-accent" />
          </div>
          <div>
            <h3 className="text-lg font-bold bridgeit-text-primary">AI Analyst Recommendations</h3>
            <p className="text-sm text-gray-600">
              Your job and course matches are based on our AI analysis.
              Last updated: <span className="font-semibold">{lastUpdated}</span>.
            </p>
          </div>
        </div>
        <Button variant="outline" className="rounded-xl border-2 border-green-600 text-green-700 hover:bg-green-50 hover:text-green-800">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Suggestions
        </Button>
      </CardContent>
    </Card>
  );
}