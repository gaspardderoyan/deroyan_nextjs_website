/**
 * Select Component
 * 
 * This file implements a customized select dropdown using Radix UI primitives.
 * The select component allows users to choose an option from a dropdown list.
 */

"use client" // This directive is required for client-side interactivity

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select" // Import Radix UI Select primitives
import { Check, ChevronDown, ChevronUp } from "lucide-react" // Import icons from Lucide

import { cn } from "@/lib/utils" // Import utility for combining class names

// Root component that manages the select state
const Select = SelectPrimitive.Root

// Group component for organizing select items into sections
const SelectGroup = SelectPrimitive.Group

// Component that displays the selected value
const SelectValue = SelectPrimitive.Value

/**
 * SelectTrigger Component
 * 
 * This is the button that users click to open the select dropdown.
 * It displays the currently selected value and a dropdown icon.
 * 
 * @param className - Additional CSS classes to apply
 * @param children - The content to display inside the trigger (usually SelectValue)
 * @param props - Additional props to pass to the underlying Radix UI component
 * @param ref - Forwarded ref to access the DOM element
 */
const SelectTrigger = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      // Base styling for the trigger button
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-none border border-black bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-0 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    {/* Dropdown icon that indicates the select can be opened */}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

/**
 * SelectScrollUpButton Component
 * 
 * Button that appears at the top of the dropdown when there are more items
 * above the visible area. Clicking it scrolls the list upward.
 * 
 * @param className - Additional CSS classes to apply
 * @param props - Additional props to pass to the underlying Radix UI component
 * @param ref - Forwarded ref to access the DOM element
 */
const SelectScrollUpButton = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

/**
 * SelectScrollDownButton Component
 * 
 * Button that appears at the bottom of the dropdown when there are more items
 * below the visible area. Clicking it scrolls the list downward.
 * 
 * @param className - Additional CSS classes to apply
 * @param props - Additional props to pass to the underlying Radix UI component
 * @param ref - Forwarded ref to access the DOM element
 */
const SelectScrollDownButton = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

/**
 * SelectContent Component
 * 
 * This is the dropdown panel that contains the list of options.
 * It appears when the select is opened and contains the viewport with items.
 * 
 * @param className - Additional CSS classes to apply
 * @param children - The content to display inside (usually SelectItems)
 * @param position - Position strategy ('popper' positions relative to trigger)
 * @param props - Additional props to pass to the underlying Radix UI component
 * @param ref - Forwarded ref to access the DOM element
 */
const SelectContent = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        // Base styling for the dropdown content
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-none border border-black bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        // Additional positioning styles when using popper positioning
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      {/* Button to scroll up when content overflows */}
      <SelectScrollUpButton />
      
      {/* Viewport is the visible area of the dropdown */}
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          // Adjust viewport size based on trigger dimensions when using popper
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      
      {/* Button to scroll down when content overflows */}
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

/**
 * SelectLabel Component
 * 
 * Used to create section labels within the select dropdown.
 * Helpful for organizing items into categories.
 * 
 * @param className - Additional CSS classes to apply
 * @param props - Additional props to pass to the underlying Radix UI component
 * @param ref - Forwarded ref to access the DOM element
 */
const SelectLabel = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

/**
 * SelectItem Component
 * 
 * Represents a selectable option in the dropdown.
 * Displays a checkmark when selected.
 * 
 * @param className - Additional CSS classes to apply
 * @param children - The content to display for this option
 * @param props - Additional props to pass to the underlying Radix UI component
 * @param ref - Forwarded ref to access the DOM element
 */
const SelectItem = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      // Base styling for select items
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    {/* Container for the checkmark that appears when item is selected */}
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    
    {/* The actual text content of the item */}
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

/**
 * SelectSeparator Component
 * 
 * A visual divider that can be placed between items in the dropdown.
 * Useful for creating visual separation between groups of items.
 * 
 * @param className - Additional CSS classes to apply
 * @param props - Additional props to pass to the underlying Radix UI component
 * @param ref - Forwarded ref to access the DOM element
 */
const SelectSeparator = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

// Export all components for use in other files
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
