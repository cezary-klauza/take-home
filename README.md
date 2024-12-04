## Changes Made

### General CSS Change

I changed the width values in the `Entrypoint` component to ensure that the card
with a description has the same width as the card without a description.

### Zustand Store

I decided that the Zustand store should store both visible and deleted items. This allows
for easy integration of these two states and simplifies the introduction of a "revert" functionality.

It also stores all items, not just the visible ones. This means that the `DeletedListItem`
type doesn't need a `description` field, and the description can be easily displayed.

The `isRevealed` state allows displaying the description of each item in the list,
even if it was added to the list after the state change.

### Created ToggleButton Component

The component is designed to maintain the same style despite different mechanics.
This makes the component easily reusable.

### Changed Spinner Component

I added `stroke` and `size` props to it. This makes the component easy to reuse, e.g.,
in a button. Also, each prop has a default value, so it’s not necessary to specify it in general use.

### Refresh Button

The Refresh button uses the `refreshHandler` function, which calls `listQuery.refetch()`
to easily fetch new results for the list. This ensures that the state of `deletedCards`
doesn't change. Also, if an item in the new list has its `isVisible` property set to true,
its description remains visible.

### Change in `icons.tsx`

The `ChevronUpIcon` component had a `fill-rule` attribute that displayed a warning in the console.
I changed the attribute name to `fillRule`.

### Created DeletedCards Component

Since VisibleCards and DeletedCards have different mechanics, I thought it would be better to create
a separate component rather than adding multiple `if` conditions to adjust the logic to the needs.
