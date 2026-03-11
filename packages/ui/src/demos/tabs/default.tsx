'use client';

import { Button } from '../../components/button';
import { Card } from '../../components/card';
import { Tabs } from '../../components/tabs';

export function Default() {
  return (
    <Tabs defaultValue="overview" variant="default" size="sm">
      <Tabs.List>
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="models">Models</Tabs.Trigger>
        <Tabs.Trigger value="research">Research</Tabs.Trigger>
        <Tabs.Trigger value="ethics">Ethics</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="overview">
        <Card className="border-border shadow-sm">
          <Card.Header>
            <Card.Title>AI Overview</Card.Title>
            <Card.Description>
              Understand the current landscape of artificial intelligence, trends, and applications
              across industries.
            </Card.Description>
          </Card.Header>
          <Card.Content className="flex flex-col gap-3">
            <div className="flex gap-3">
              <Button onClick={() => alert('Viewing AI trends')} variant="secondary">
                View Trends
              </Button>
              <Button variant="ghost" onClick={() => alert('Explore applications')}>
                Explore Applications
              </Button>
            </div>
          </Card.Content>
        </Card>
      </Tabs.Content>

      <Tabs.Content value="models">
        <Card className="border-border shadow-sm">
          <Card.Header>
            <Card.Title>AI Models</Card.Title>
            <Card.Description>
              Track the performance of different AI models, from NLP and computer vision to
              reinforcement learning systems.
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <Button onClick={() => alert('Opening model library')} variant="secondary">
              View Models
            </Button>
          </Card.Content>
        </Card>
      </Tabs.Content>

      <Tabs.Content value="research">
        <Card className="border-border shadow-sm">
          <Card.Header>
            <Card.Title>Research & Publications</Card.Title>
            <Card.Description>
              Stay up-to-date with the latest research papers, case studies, and breakthroughs in AI
              technology.
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <Button onClick={() => alert('Browsing research papers')} variant="secondary">
              Browse Research
            </Button>
          </Card.Content>
        </Card>
      </Tabs.Content>

      <Tabs.Content value="ethics">
        <Card className="border-border shadow-sm">
          <Card.Header>
            <Card.Title>Ethics & Governance</Card.Title>
            <Card.Description>
              Understand ethical considerations, regulations, and best practices for responsible AI
              deployment.
            </Card.Description>
          </Card.Header>
          <Card.Content className="flex gap-3">
            <Button onClick={() => alert('View guidelines')} variant="secondary">
              View Guidelines
            </Button>
            <Button variant="ghost" onClick={() => alert('Report concerns')}>
              Report Concerns
            </Button>
          </Card.Content>
        </Card>
      </Tabs.Content>
    </Tabs>
  );
}
