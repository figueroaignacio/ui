'use client';

import { Button } from '../../components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/tabs';

export function TabsDemo() {
  return (
    <Tabs defaultValue="overview" variant="default">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="models">Models</TabsTrigger>
        <TabsTrigger value="research">Research</TabsTrigger>
        <TabsTrigger value="ethics">Ethics</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>AI Overview</CardTitle>
            <CardDescription>
              Understand the current landscape of artificial intelligence, trends, and applications
              across industries.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex gap-3">
              <Button onClick={() => alert('Viewing AI trends')}>View Trends</Button>
              <Button variant="outline" onClick={() => alert('Explore applications')}>
                Explore Applications
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="models">
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>AI Models</CardTitle>
            <CardDescription>
              Track the performance of different AI models, from NLP and computer vision to
              reinforcement learning systems.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => alert('Opening model library')}>View Models</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="research">
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Research & Publications</CardTitle>
            <CardDescription>
              Stay up-to-date with the latest research papers, case studies, and breakthroughs in AI
              technology.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => alert('Browsing research papers')}>Browse Research</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="ethics">
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Ethics & Governance</CardTitle>
            <CardDescription>
              Understand ethical considerations, regulations, and best practices for responsible AI
              deployment.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-3">
            <Button onClick={() => alert('View guidelines')}>View Guidelines</Button>
            <Button variant="outline" onClick={() => alert('Report concerns')}>
              Report Concerns
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
