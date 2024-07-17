'use client';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Skeleton } from '../ui/skeleton';

const classes = [
  { label: 'CCP555', value: 'g3qg424tf' },
  { label: 'OOP234', value: 'arw4t34gw34' },
];

import { useAuth } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { getClasses } from '@/actions/classes';

export function ComboboxFormItem({ form }) {
  const { userId } = useAuth();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      getClasses(userId)
        .then((data) => {
          setClasses(() => {
            return data.map((c) => ({
              label: c.name,
              value: c.class_id,
            }));
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching classes:', error);
          setLoading(false);
        });
    }
  }, [userId]);

  if (loading) {
    return <Skeleton className="w-[200px] h-[30px]" />;
  }

  return (
    <FormField
      control={form.control}
      name="class_id"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Class</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    'w-[200px] justify-between',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value
                    ? classes.find((cls) => cls.value === field.value)
                        ?.label
                    : 'Select class'}
                  <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search class..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No classes found.</CommandEmpty>
                  <CommandGroup>
                    {classes.map((cls) => (
                      <CommandItem
                        value={cls.label}
                        key={cls.value}
                        onSelect={() => {
                          form.setValue('class_id', cls.value);
                        }}
                      >
                        {cls.label}
                        <CheckIcon
                          className={cn(
                            'ml-auto h-4 w-4',
                            cls.value === field.value
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
