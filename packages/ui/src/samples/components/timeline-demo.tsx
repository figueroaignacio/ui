import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineHeader,
  TimelineItem,
  TimelineMeta,
  TimelineTitle,
} from '../../components/timeline';

export function TimelineDemo() {
  return (
    <Timeline>
      <TimelineItem active>
        <TimelineHeader>
          <TimelineTitle>Frontend Developer</TimelineTitle>
          <TimelineDescription>Microsoft · Remote</TimelineDescription>
        </TimelineHeader>
        <TimelineMeta>
          <span>📅 July 2023 – February 2024</span>
          <span>📍 Buenos Aires, Argentina</span>
        </TimelineMeta>
        <TimelineContent>
          <p>
            Developed scalable web interfaces using React, TypeScript, and Vite, enhancing the user
            experience and performance of internal tools.
          </p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineHeader>
          <TimelineTitle>Fullstack Developer</TimelineTitle>
          <TimelineDescription>Vercel · Hybrid</TimelineDescription>
        </TimelineHeader>
        <TimelineMeta>
          <span>📅 February 2024 – Present</span>
          <span>📍 Buenos Aires, Argentina</span>
        </TimelineMeta>
        <TimelineContent>
          <p>
            Built and deployed high-performance web applications with Next.js, Tailwind CSS, and
            Supabase, focusing on scalability and developer experience.
          </p>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
