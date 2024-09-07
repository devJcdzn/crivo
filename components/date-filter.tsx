"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import qs from "query-string";

import { DateRange } from "react-day-picker";
import { subDays, format } from "date-fns";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Button } from "./ui/button";
import { formatDateRange } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { useGetSummary } from "@/features/summary/api/use-get-summary";

export function DateFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const from = params.get("from") || "";
  const to = params.get("to") || "";

  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  const paramState = {
    from: from ? new Date(from) : defaultFrom,
    to: to ? new Date(to) : defaultTo,
  };

  const { isLoading: isLoadingSummary } = useGetSummary();

  const [date, setDate] = useState<DateRange | undefined>(paramState);

  const pushToUrl = (dateRange: DateRange | undefined) => {
    const query = {
      from: format(dateRange?.from || defaultFrom, "yyy-MM-dd"),
      to: format(dateRange?.to || defaultTo, "yyy-MM-dd"),
    };

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  const onReset = () => {
    setDate(undefined);
    pushToUrl(undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={false}
          size="sm"
          variant="outline"
          className="lg:w-auto w-full h-9 rounded-md px-3 font-normal 
          bg-muted-foreground/20 hover:bg-muted-foreground/40 hover:text-white 
          border-none focus:ring-offset-0 focus:ring-transparent outline-none 
          transition"
        >
          {formatDateRange(paramState)}
          <ChevronDown className="size-4 ml-2 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="lg:w-auto w-full p-0" align="start">
        <>
          <Calendar
            disabled={false}
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
          <div className="p-4 flex items-center gap-x-2">
            <PopoverClose asChild>
              <>
                <Button
                  onClick={onReset}
                  disabled={!date?.from || !date?.to}
                  className="w-full"
                  variant="outline"
                >
                  Limpar
                </Button>
                <Button
                  onClick={() => pushToUrl(date)}
                  disabled={!date?.from || !date?.to}
                  className="w-full"
                >
                  Filtrar
                </Button>
              </>
            </PopoverClose>
          </div>
        </>
      </PopoverContent>
    </Popover>
  );
}
