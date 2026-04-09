'use client';

import {
  ArrowDown01Icon,
  ArrowRight01Icon,
  CheckmarkCircle01Icon,
  File01Icon,
  Folder01Icon,
  Home01Icon,
  InformationCircleIcon,
  User02FreeIcons,
  UserIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

const MockBar = ({ className }: { className?: string }) => (
  <div className={`bg-muted-foreground/20 h-1.5 rounded-full ${className}`} />
);

export const COMPONENT_LIST_PREVIEWS: Record<string, React.ComponentType> = {
  banner: () => (
    <div className="flex w-[220px] items-center gap-2.5 border-b px-3 py-2 text-sm">
      <HugeiconsIcon icon={InformationCircleIcon} size={13} className="shrink-0 opacity-80" />
      <div className="flex flex-1 items-center gap-2">
        <div className="flex-1 space-y-1">
          <MockBar className="h-1.5 w-20 bg-current opacity-60" />
          <MockBar className="h-1 w-full bg-current opacity-25" />
        </div>
        <div className="flex h-5 items-center rounded border border-current/20 px-1.5">
          <MockBar className="h-1 w-6 bg-current opacity-40" />
        </div>
      </div>
      <div className="shrink-0 opacity-40">
        <svg
          width="9"
          height="9"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </div>
    </div>
  ),
  button: () => (
    <div className="flex items-center gap-2">
      <div className="bg-primary/80 inline-flex h-9 items-center rounded-xl px-4 shadow-md">
        <MockBar className="w-14 bg-white/40" />
      </div>
      <div className="border-border bg-background inline-flex h-9 items-center rounded-xl border px-4">
        <MockBar className="w-10 opacity-40" />
      </div>
      <div className="hover:bg-muted inline-flex h-9 items-center rounded-xl px-3 opacity-50">
        <MockBar className="w-8 opacity-40" />
      </div>
    </div>
  ),
  accordion: () => (
    <div className="w-full max-w-[200px] space-y-2">
      {[
        { open: true, tw: 'w-24' },
        { open: false, tw: 'w-20' },
        { open: false, tw: 'w-28' },
      ].map((item, i) => (
        <div key={i} className="border-b border-white/5 last:border-0">
          <div className="flex w-full items-center justify-between py-4">
            <MockBar className={`${item.tw} ${item.open ? 'opacity-70' : 'opacity-40'}`} />
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`text-muted-foreground/50 shrink-0 ${item.open ? 'rotate-180' : ''}`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
          {item.open && (
            <div className="space-y-1.5 pb-4">
              <MockBar className="w-full opacity-30" />
              <MockBar className="w-4/5 opacity-20" />
            </div>
          )}
        </div>
      ))}
    </div>
  ),
  avatar: () => (
    <div className="flex items-center -space-x-2">
      {[
        { bg: 'bg-muted', initials: 'JD' },
        { bg: 'bg-secondary', initials: 'AB' },
        { bg: 'bg-muted/70', initials: 'KL' },
        { bg: 'bg-secondary/60', initials: 'MN' },
      ].map((a, i) => (
        <span
          key={i}
          className={`${a.bg} ring-background relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full ring-2`}
          style={{ zIndex: 4 - i }}
        >
          <span className="text-muted-foreground/60 text-xs font-medium">{a.initials}</span>
        </span>
      ))}
    </div>
  ),
  badge: () => (
    <div className="flex flex-wrap items-center gap-2">
      <div className="bg-primary/80 inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-sm">
        Default
      </div>
      <div className="bg-secondary text-secondary-foreground/80 inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-[10px] font-semibold">
        Secondary
      </div>
      <div className="text-foreground/70 border-border inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold">
        Outline
      </div>
    </div>
  ),
  card: () => (
    <div className="bg-card border-border flex w-[190px] flex-col rounded-lg border shadow-sm">
      <div className="flex flex-col space-y-1.5 p-4">
        <MockBar className="bg-muted-foreground/55 h-2 w-24" />
        <MockBar className="h-1 w-32 opacity-30" />
      </div>
      <div className="flex-1 space-y-2 px-4 pb-3">
        <MockBar className="w-full opacity-30" />
        <MockBar className="w-5/6 opacity-25" />
      </div>
      <div className="flex justify-end gap-2 px-4 pb-4">
        <div className="border-border bg-background flex h-8 items-center rounded-xl border px-3">
          <MockBar className="h-1 w-8 opacity-40" />
        </div>
        <div className="bg-primary/80 flex h-8 items-center rounded-xl px-3 shadow-md">
          <MockBar className="h-1 w-10 bg-white/40" />
        </div>
      </div>
    </div>
  ),
  checkbox: () => (
    <div className="space-y-3">
      {[true, false, false].map((checked, i) => (
        <div key={i} className="flex items-center gap-2.5">
          <div
            className={`relative flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border ${checked ? 'bg-primary/80 border-transparent' : 'border-primary/50 bg-background'}`}
          >
            {checked && (
              <svg
                width="9"
                height="9"
                viewBox="0 0 12 12"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="2,6 5,9 10,3" />
              </svg>
            )}
          </div>
          <MockBar className={`${i === 0 ? 'w-28 opacity-65' : 'w-20 opacity-35'}`} />
        </div>
      ))}
    </div>
  ),
  radio: () => (
    <div className="space-y-3">
      {[true, false, false].map((selected, i) => (
        <div key={i} className="flex items-center gap-2.5">
          <div
            className={`relative flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${selected ? 'bg-primary/80 border-primary/80' : 'border-border/60 bg-background'}`}
          >
            {selected && <div className="bg-background h-1.5 w-1.5 rounded-full" />}
          </div>
          <MockBar className={`${i === 0 ? 'w-24 opacity-65' : 'w-16 opacity-35'}`} />
        </div>
      ))}
    </div>
  ),
  collapsible: () => (
    <div className="border-border w-[190px] rounded-lg border">
      <div className="flex items-center justify-between p-4">
        <MockBar className="w-20 opacity-60" />
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-muted-foreground/50 shrink-0 rotate-180"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
      <div className="border-border/30 space-y-2 border-t px-4 pb-4">
        <div className="space-y-2 pt-3">
          <MockBar className="w-full opacity-30" />
          <MockBar className="w-4/5 opacity-25" />
          <MockBar className="w-3/5 opacity-20" />
        </div>
      </div>
    </div>
  ),
  callout: () => (
    <div className="bg-info/10 border-info/20 text-info flex w-[220px] items-start gap-3 rounded-md border p-4 text-sm">
      <HugeiconsIcon icon={InformationCircleIcon} size={16} className="mt-0.5 shrink-0" />
      <div className="flex-1 space-y-1">
        <div className="h-1.5 w-20 rounded-full bg-current font-semibold opacity-70" />
        <div className="mt-2 space-y-1">
          <MockBar className="w-full bg-current opacity-30" />
          <MockBar className="w-3/4 bg-current opacity-20" />
        </div>
      </div>
    </div>
  ),
  breadcrumb: () => (
    <div className="text-muted-foreground/60 flex flex-wrap items-center gap-1.5 text-sm">
      <HugeiconsIcon icon={Home01Icon} size={13} className="shrink-0" />
      <HugeiconsIcon icon={ArrowRight01Icon} size={13} className="shrink-0 opacity-35" />
      <MockBar className="h-1.5 w-10 opacity-45" />
      <HugeiconsIcon icon={ArrowRight01Icon} size={13} className="shrink-0 opacity-35" />
      <MockBar className="h-1.5 w-14 opacity-45" />
      <HugeiconsIcon icon={ArrowRight01Icon} size={13} className="shrink-0 opacity-35" />
      <MockBar className="bg-muted-foreground/65 h-1.5 w-12" />
    </div>
  ),

  dialog: () => (
    <div className="bg-background border-border relative w-52 rounded-xl border p-5 shadow-lg">
      <div className="absolute top-4 right-4 opacity-40">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </div>
      <div className="mb-3 flex flex-col space-y-1.5">
        <MockBar className="bg-muted-foreground/55 h-2 w-28" />
        <MockBar className="mt-0.5 h-1 w-full opacity-30" />
        <MockBar className="h-1 w-4/5 opacity-25" />
      </div>
      <div className="flex justify-end gap-2 pt-1">
        <div className="border-border bg-background flex h-8 items-center rounded-xl border px-3">
          <MockBar className="h-1 w-10 opacity-40" />
        </div>
        <div className="bg-primary/80 flex h-8 items-center rounded-xl px-3 shadow-md">
          <MockBar className="h-1 w-12 bg-white/40" />
        </div>
      </div>
    </div>
  ),

  'dropdown-menu': () => (
    <div className="flex flex-col items-start gap-1.5">
      <div className="border-border bg-background inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm">
        <MockBar className="w-16 opacity-55" />
        <HugeiconsIcon icon={ArrowDown01Icon} size={14} className="text-muted-foreground/50" />
      </div>
      <div className="bg-background border-border w-44 rounded-md border shadow-md">
        <div className="flex flex-col gap-0.5 p-1.5">
          <div className="text-muted-foreground px-3 py-1.5 text-[9px] font-semibold tracking-wider uppercase opacity-60">
            Actions
          </div>
          {[false, true, false].map((active, i) => (
            <div
              key={i}
              className={`flex items-center rounded-md px-3 py-2 text-sm ${active ? 'bg-muted/60' : ''}`}
            >
              <MockBar className={`${active ? 'w-24 opacity-60' : 'w-20 opacity-30'}`} />
            </div>
          ))}
          <div className="bg-border/50 my-1 h-px" />
          <div className="text-destructive/60 flex items-center rounded-md px-3 py-2 text-sm">
            <MockBar className="bg-destructive/40 w-16 opacity-60" />
          </div>
        </div>
      </div>
    </div>
  ),

  files: () => (
    <div className="w-[185px] space-y-0.5">
      <div className="flex items-center rounded px-2 py-1 text-sm font-medium">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-muted-foreground mr-1 shrink-0 rotate-90 opacity-55"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
        <HugeiconsIcon
          icon={Folder01Icon}
          size={14}
          className="text-muted-foreground mr-2 opacity-65"
        />
        <MockBar className="bg-muted-foreground/55 w-20" />
      </div>
      <div className="border-border mt-1 ml-2 space-y-0.5 border-l pl-4">
        <div className="flex items-center space-x-2 rounded px-2 py-1 text-sm">
          <HugeiconsIcon
            icon={File01Icon}
            size={14}
            className="text-muted-foreground shrink-0 opacity-45"
          />
          <MockBar className="w-24 flex-1 opacity-40" />
        </div>
        <div className="flex items-center rounded px-2 py-1 text-sm font-medium">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-muted-foreground mr-1 shrink-0 opacity-40"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
          <HugeiconsIcon
            icon={Folder01Icon}
            size={14}
            className="text-muted-foreground mr-2 opacity-50"
          />
          <MockBar className="w-16 flex-1 opacity-40" />
        </div>
        <div className="flex items-center space-x-2 rounded px-2 py-1 text-sm">
          <HugeiconsIcon icon={File01Icon} size={14} className="shrink-0 text-yellow-500/70" />
          <MockBar className="w-20 flex-1 opacity-35" />
          <span className="ml-auto text-[9px] font-bold text-yellow-500">M</span>
        </div>
        <div className="flex items-center space-x-2 rounded px-2 py-1 text-sm">
          <HugeiconsIcon icon={File01Icon} size={14} className="shrink-0 text-green-500/70" />
          <MockBar className="w-16 flex-1 opacity-30" />
          <span className="ml-auto text-[9px] font-bold text-green-500">A</span>
        </div>
      </div>
    </div>
  ),
  input: () => (
    <div className="flex w-[200px] flex-col gap-1.5">
      <div className="flex flex-col gap-1">
        <MockBar className="bg-muted-foreground/50 h-1.5 w-16" />
        <MockBar className="h-1 w-32 opacity-25" />
      </div>
      <div className="border-input relative flex h-9 w-full items-center gap-2 rounded-sm border bg-transparent px-3 shadow-xs">
        <HugeiconsIcon
          icon={User02FreeIcons}
          size={14}
          className="text-muted-foreground/40 shrink-0"
        />
        <MockBar className="w-24 opacity-20" />
      </div>
      <div className="border-input flex h-9 w-full items-center rounded-md border bg-transparent px-3 opacity-60 shadow-xs">
        <MockBar className="w-28 opacity-20" />
      </div>
    </div>
  ),
  kbd: () => (
    <div className="flex items-center gap-1.5">
      <div className="bg-muted/50 border-border/80 border-b-border text-muted-foreground rounded-md border border-b-2 px-1.5 py-0.5 font-mono text-[11px] font-medium">
        Ctrl
      </div>
      <span className="text-muted-foreground/60 text-[10px]">+</span>
      <div className="bg-muted/50 border-border/80 border-b-border text-muted-foreground rounded-md border border-b-2 px-1.5 py-0.5 font-mono text-[11px] font-medium">
        K
      </div>
    </div>
  ),
  label: () => (
    <div className="w-[185px] space-y-3">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm font-medium">
          <MockBar className="bg-muted-foreground/55 h-1.5 w-20" />
          <span className="text-destructive/70 text-sm leading-none">*</span>
        </div>
        <div className="border-input flex h-9 w-full items-center rounded-md border bg-transparent px-3 shadow-xs">
          <MockBar className="w-24 opacity-20" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm font-medium">
          <MockBar className="bg-muted-foreground/45 h-1.5 w-16" />
          <span className="text-muted-foreground/50 text-[10px]">(optional)</span>
        </div>
        <div className="border-input/60 flex h-9 w-full items-center rounded-md border bg-transparent px-3">
          <MockBar className="w-20 opacity-15" />
        </div>
        <MockBar className="h-1 w-36 opacity-25" />
      </div>
    </div>
  ),

  popover: () => (
    <div className="flex flex-col items-start gap-1.5">
      <div className="border-border bg-background inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm opacity-75">
        <MockBar className="w-16 opacity-55" />
        <HugeiconsIcon icon={ArrowDown01Icon} size={10} className="text-muted-foreground/50" />
      </div>
      <div className="bg-popover border-border w-52 rounded-md border p-4 shadow-md">
        <div className="border-border/40 mb-3 border-b pb-2.5">
          <MockBar className="bg-muted-foreground/50 w-24" />
        </div>
        <div className="space-y-2">
          <MockBar className="w-full opacity-30" />
          <MockBar className="w-3/4 opacity-25" />
        </div>
        <div className="mt-4 flex gap-2">
          <div className="border-border flex h-8 items-center rounded-xl border px-2.5">
            <MockBar className="h-1 w-8 opacity-40" />
          </div>
          <div className="bg-primary/80 flex h-8 items-center rounded-xl px-2.5">
            <MockBar className="h-1 w-10 bg-white/40" />
          </div>
        </div>
      </div>
    </div>
  ),

  progress: () => (
    <div className="w-[200px] space-y-4">
      <div className="space-y-1.5">
        <div className="flex justify-between">
          <MockBar className="h-1 w-20 opacity-45" />
          <MockBar className="bg-muted-foreground/50 h-1 w-8" />
        </div>
        <div className="bg-secondary h-2 w-full overflow-hidden rounded-full">
          <div className="bg-primary/70 h-full w-3/5 rounded-full" />
        </div>
      </div>
      <div className="space-y-1.5">
        <div className="flex justify-between">
          <MockBar className="h-1 w-16 opacity-35" />
          <MockBar className="bg-muted-foreground/35 h-1 w-6" />
        </div>
        <div className="bg-secondary h-2 w-full overflow-hidden rounded-full">
          <div className="bg-primary/50 h-full w-4/5 rounded-full" />
        </div>
      </div>
    </div>
  ),

  select: () => (
    <div className="w-[190px] space-y-1.5">
      <MockBar className="bg-muted-foreground/45 h-1.5 w-14" />
      <div className="border-input relative flex h-10 w-full items-center justify-between rounded-md border bg-transparent px-3 pr-9">
        <MockBar className="w-24 opacity-50" />
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          size={14}
          className="text-muted-foreground/50 absolute right-3"
        />
      </div>
    </div>
  ),

  separator: () => (
    <div className="w-[195px]">
      <div className="space-y-2 py-3">
        <MockBar className="w-32 opacity-55" />
        <MockBar className="w-full opacity-25" />
      </div>
      <div className="flex items-center gap-3">
        <span className="bg-border h-px flex-1 shrink-0" />
        <span className="text-muted-foreground shrink-0 text-[10px] font-medium opacity-50">
          OR
        </span>
        <span className="bg-border h-px flex-1 shrink-0" />
      </div>
      <div className="space-y-2 py-3">
        <MockBar className="w-24 opacity-40" />
        <MockBar className="w-full opacity-20" />
      </div>
    </div>
  ),
  drawer: () => (
    <div className="bg-background border-border relative h-36 w-52 overflow-hidden rounded-md border shadow-2xl">
      <div className="pointer-events-none absolute inset-0 space-y-2 p-4 opacity-10">
        <MockBar className="w-full" />
        <MockBar className="w-5/6" />
        <MockBar className="w-4/6" />
      </div>
      <div className="bg-background border-border absolute inset-y-2 right-2 flex w-28 flex-col rounded-sm border shadow-2xl">
        <div className="flex shrink-0 justify-center py-2.5">
          <div className="bg-muted-foreground/25 h-1 w-10 rounded-full" />
        </div>
        <div className="flex shrink-0 justify-end px-3 pb-1">
          <div className="hover:bg-muted flex h-6 w-6 items-center justify-center rounded-full opacity-40">
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </div>
        </div>
        <div className="flex-1 space-y-2 px-4 pb-4">
          <MockBar className="bg-muted-foreground/55 h-2 w-16" />
          <MockBar className="h-1 w-full opacity-25" />
          <div className="mt-1 space-y-1.5">
            <MockBar className="w-full opacity-20" />
            <MockBar className="w-4/5 opacity-15" />
          </div>
        </div>
      </div>
    </div>
  ),
  skeleton: () => (
    <div className="w-[205px] space-y-3.5">
      <div className="flex items-center gap-3">
        <div className="bg-muted h-10 w-10 shrink-0 animate-pulse rounded-md" />
        <div className="flex-1 space-y-2">
          <div className="bg-muted h-3 w-full animate-pulse rounded-md" />
          <div className="bg-muted h-3 w-2/3 animate-pulse rounded-md" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="bg-muted h-2.5 w-full animate-pulse rounded-md" />
        <div className="bg-muted h-2.5 w-5/6 animate-pulse rounded-md" />
        <div className="bg-muted h-2.5 w-4/6 animate-pulse rounded-md" />
      </div>
    </div>
  ),
  switch: () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full">
          <div className="bg-primary/60 pointer-events-none absolute inset-x-0 h-full w-full rounded-full" />
          <span className="bg-secondary-foreground pointer-events-none z-10 block h-5 w-5 translate-x-5 rounded-full shadow-sm" />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full">
          <div className="bg-input pointer-events-none absolute inset-x-0 h-full w-full rounded-full" />
          <span className="bg-secondary-foreground/60 pointer-events-none z-10 block h-5 w-5 translate-x-0 rounded-full shadow-sm" />
        </div>
      </div>
    </div>
  ),

  tabs: () => (
    <div className="w-[210px]">
      <div className="bg-muted/50 border-border/50 inline-flex h-10 w-full items-center rounded-md border p-1 backdrop-blur-sm">
        {[
          { w: 'w-14', active: true },
          { w: 'w-12', active: false },
          { w: 'w-7', active: false },
        ].map((tab, i) => (
          <div
            key={i}
            className={`relative flex flex-1 items-center justify-center rounded-sm px-3 py-1.5 ${tab.active ? 'bg-secondary border-border/50 border shadow-sm' : 'opacity-45'}`}
          >
            <MockBar className={`${tab.w} ${tab.active ? 'bg-muted-foreground/65' : ''}`} />
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        <MockBar className="w-full opacity-30" />
        <MockBar className="w-5/6 opacity-25" />
        <MockBar className="w-3/5 opacity-20" />
      </div>
    </div>
  ),

  table: () => (
    <div className="border-border relative w-[215px] overflow-auto rounded-sm border">
      <table className="w-full text-xs">
        <thead className="[&_tr]:border-b">
          <tr className="border-b">
            {['w-14', 'w-12', 'w-8'].map((w, i) => (
              <th
                key={i}
                className={`border-border text-muted-foreground h-10 border-r px-3 py-2 text-left font-medium last:border-r-0 ${i === 2 ? 'last:border-r-0' : ''}`}
              >
                <MockBar className={`${w} bg-muted-foreground/45`} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {[
            ['w-16', 'w-10', 'w-6'],
            ['w-20', 'w-8', 'w-8'],
            ['w-14', 'w-12', 'w-5'],
          ].map((cols, i) => (
            <tr key={i} className="border-border/30 border-b last:border-0">
              {cols.map((w, j) => (
                <td key={j} className="border-border border-r px-3 py-2.5 last:border-r-0">
                  <MockBar className={`${w} opacity-${35 - i * 5}`} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),

  toast: () => (
    <div className="bg-background border-success/20 text-success flex w-[215px] items-start gap-3 overflow-hidden rounded-md border p-4 shadow-lg">
      <HugeiconsIcon icon={CheckmarkCircle01Icon} size={16} className="mt-0.5 shrink-0" />
      <div className="flex w-full flex-col gap-1">
        <MockBar className="h-2 w-20 bg-current opacity-70" />
        <MockBar className="h-1 w-full bg-current opacity-30" />
      </div>
      <div className="mt-0.5 shrink-0 opacity-40">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </div>
    </div>
  ),

  tooltip: () => (
    <div className="flex flex-col items-center gap-0">
      <div className="bg-foreground/85 rounded-xl px-3 py-1.5 shadow-md">
        <MockBar className="bg-background/45 h-1.5 w-16" />
      </div>
      <div
        className="bg-foreground/85 h-2 w-2"
        style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
      />
      <div className="border-border bg-muted mt-2 flex h-8 w-8 items-center justify-center rounded-full border">
        <HugeiconsIcon icon={UserIcon} size={14} className="text-muted-foreground/60" />
      </div>
    </div>
  ),
  textarea: () => (
    <div className="flex w-[190px] flex-col gap-1.5">
      <MockBar className="bg-muted-foreground/45 h-1.5 w-14" />
      <div className="border-input relative w-full rounded-md border bg-transparent p-3 shadow-xs">
        <div className="space-y-1.5">
          <MockBar className="w-full opacity-30" />
          <MockBar className="w-full opacity-25" />
          <MockBar className="w-4/5 opacity-20" />
          <MockBar className="w-3/5 opacity-15" />
        </div>
        <div className="absolute right-1.5 bottom-1.5 opacity-20">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
            <path d="M6 2L8 0v2H6zM4 4L8 0v2L6 4H4zM2 6L8 0v2L4 6H2z" opacity=".6" />
          </svg>
        </div>
      </div>
    </div>
  ),
  spinner: () => (
    <div className="flex items-center gap-5">
      <div className="flex flex-col items-center gap-2">
        <div className="text-muted-foreground/50 h-8 w-8 animate-spin">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
        </div>
      </div>
    </div>
  ),
};
