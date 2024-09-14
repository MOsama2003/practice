import * as React from "react";
import { CalendarDays } from "lucide-react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Button } from "./components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "h-12 justify-between text-left font-normal",
              !date && ""
            )}
          >
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarDays />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[500px] p-0" align="start">
          <Tabs defaultValue="posted" className="">
           <div className="flex items-center justify-between gap-2 p-4">
           <p className="text-lg text-gray-500 font-medium">
              Filter by:
            </p>
            <TabsList className="border-2 bg-white py-5">
              <TabsTrigger value="posted" className="flex-">
                RFP Posted Date
              </TabsTrigger>
              <TabsTrigger value="expiry" className="flex-1">
                RFP Expiry Date
              </TabsTrigger>
            </TabsList>
            
           </div>
           <hr className="w-[90%] mx-auto"/>
            <div className="flex items-center justify-between gap-2 p-4">
              <div className="text-lg text-gray-500 font-medium">Quick Select:</div>
              <div className="flex space-x-2">
                <Button variant="outline">Last Month</Button>
                <Button variant="outline">Last Week</Button>
                <Button variant="outline">This Month</Button>
              </div>
            </div>
            <hr className="w-[90%] mx-auto"/>
           
            <TabsContent value="posted">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                className="h-full w-full flex"
                classNames={{
                  months:
                    "flex w-full flex-col  sm: flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                  month: "space-y-4 w-full flex flex-col",
                  table: "w-full h-full border-collapse space-y-1",
                  head_row: "",
                  row: "w-full mt-2",
                }}
                numberOfMonths={1}
              />
            </TabsContent>
            <TabsContent value="expiry">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                classNames={{
                  months:
                    "flex w-full flex-col  sm: flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                  month: "space-y-4 w-full flex flex-col",
                  table: "w-full h-full border-collapse space-y-1",
                  head_row: "",
                  row: "w-full mt-2",
                }}
                numberOfMonths={1}
              />
            </TabsContent>

            <div className="flex justify-evenly p-4">
              <Button variant="ghost" className="text-[#1F5BD6] text-base">Clear Filter</Button>
              <Button variant="solid" className="text-white text-base px-[50px] bg-[#1F5BD6]">Apply</Button>
            </div>
          </Tabs>
        </PopoverContent>
      </Popover>
    </div>
  );
}
