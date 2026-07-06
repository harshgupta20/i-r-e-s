# Component Guide

The design system lives in [`src/components/ui`](src/components/ui) and is exported from a single barrel:

```tsx
import { Button, Card, Dialog, Input, toast } from '@/components/ui'
```

Every component is built on **Radix UI** primitives (for accessibility and behavior) + **Tailwind** (for styling via design tokens) + **class-variance-authority** (for variants). Components reference **semantic tokens only** (`bg-primary`, `text-muted-foreground`) so light/dark theming is automatic.

## Principles

1. **Tokens, not colors.** Never hard-code hex. Use `bg-surface`, `border-border`, `text-muted-foreground`, etc.
2. **Composition over configuration.** Prefer `<Dialog><DialogContent>…</DialogContent></Dialog>` over a monolithic `<Dialog title=… body=… />`.
3. **`cn()` for class merging.** `cn('px-2', isActive && 'bg-accent')` de-duplicates conflicting Tailwind classes.
4. **`asChild` for polymorphism.** Render a `Button` as a router `Link` without losing styles: `<Button asChild><Link to="…" /></Button>`.
5. **Accessible by default.** Focus rings, `aria-*`, labelled controls, and keyboard support are built in.

## Catalog

| Component | Notes |
| --- | --- |
| `Button` | `variant`: primary · secondary · outline · ghost · destructive · link. `size`: sm · md · lg · icon. `loading` shows a spinner. `asChild`. |
| `Input`, `Textarea` | `invalid` for error styling; `Input` supports `startAdornment`/`endAdornment`. |
| `Field` | Label + description + error wrapper; wires `id` / `aria-invalid` / `aria-describedby`. |
| `Select` | Radix Select — `Select`, `SelectTrigger`, `SelectContent`, `SelectItem`. |
| `DatePicker` / `Calendar` | date-fns calendar in a popover. |
| `Dialog` | Modal. `DialogContent hideClose` to omit the close button. |
| `Sheet` | Side drawer — `side`: top · bottom · left · right. |
| `Popover`, `Tooltip`, `DropdownMenu` | Radix overlays; `TooltipTip` is a shorthand. |
| `Tabs` | Radix tabs. |
| `Table` | Styled table primitives (`Table`, `TableHeader`, `TableRow`, `TableCell`…). |
| `Pagination` | Page list with ellipses + `summary`. |
| `Command` / `CommandDialog` | cmdk-powered command menu (see `⌘K`). |
| `Badge`, `StatCard`, `Avatar`, `Separator`, `Kbd` | Display primitives. |
| `Card` | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`. |
| `Skeleton`, `Spinner` | Loading states. |
| `EmptyState`, `ErrorState` | Zero/failure states with optional actions. |
| `Toaster` / `toast` | sonner toasts themed to match; `toast.success/error(...)`. |

## Recipes

### A validated form field

```tsx
<Field label="Your email" error={errors.email?.message} required>
  {(props) => (
    <Input
      type="email"
      invalid={props['aria-invalid']}
      {...register('email')}
      id={props.id}
      aria-describedby={props['aria-describedby']}
    />
  )}
</Field>
```

### A confirm dialog

```tsx
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent className="max-w-sm">
    <DialogHeader>
      <DialogTitle>Sign out?</DialogTitle>
      <DialogDescription>You can sign back in anytime.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="destructive" onClick={confirm}>Sign out</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Feedback

```tsx
toast.success('Document published', { description: 'Pending verification.' })
toast.error(toAppError(error).message)
```

## Adding a component

1. Create `src/components/ui/<name>.tsx` using Radix (if interactive) + `cva` (if it has variants).
2. Use tokens only; support `className` passthrough and `forwardRef` where relevant.
3. Export it from [`src/components/ui/index.ts`](src/components/ui/index.ts).
