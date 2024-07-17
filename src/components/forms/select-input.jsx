import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';

export function FormSelect({
  form,
  name,
  label,
  placeholder,
  description,
  className,
  options,
}) {
  return (
    <div className={cn(className, 'w-full')}>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => {
          // console.log('Field:', field); // Log the field object

          return (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <select
                  placeholder={placeholder}
                  className="w-full p-2 border rounded"
                  {...field}
                >
                  {options.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormDescription>{description}</FormDescription>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
}
