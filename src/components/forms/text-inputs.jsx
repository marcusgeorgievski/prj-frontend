import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export function FormInput({
  form,
  name,
  label,
  placeholder,
  description,
  className,
}) {
  return (
    <div className={cn(className, "w-full")}>
      <FormField
        className="bg-red-50"
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input placeholder={placeholder} {...field} />
            </FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

import { Textarea } from "../ui/textarea"
import { cn } from "@/lib/utils"

export function FormTextarea({
  form,
  name,
  label,
  placeholder,
  description,
  className,
}) {
  return (
    <div className={cn(className, "w-full")}>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={placeholder}
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
