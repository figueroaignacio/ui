import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../components/accordion';

export function Default() {
  return (
    <Accordion type="single" className="w-full" defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>Life Hacks for Coders</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Want to survive 12-hour coding sessions? Always keep snacks nearby and caffeine on
            standby. Bonus points for comfy socks and a chair that doesn't destroy your back.
          </p>
          <p>
            Remember: comments are your friend. Future you will thank past you for writing clear
            notes.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Debugging Secrets</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Debugging is basically detective work, but your suspects are lines of code. Breakpoints
            are your magnifying glass.
          </p>
          <p>
            Pro tip: if it compiles but doesn't work, stare at the screen, whisper "why won't you
            work?," then Google like your life depends on it.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Random Productivity Tips</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Sometimes the best way to get code done is to step away. Take a walk, pet your cat, or
            pretend to meditate.
          </p>
          <p>And remember: Ctrl+S is life. Save often, panic never.</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
