/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import { Checkbox } from "../ui/checkbox";
import {
  serverLanguageFilterAtom,
  serverModeFilterAtom,
  serverNotEmptyFilterAtom,
  serverNotFullFilterAtom,
  serverNotPasswordFilterAtom,
  serverNotPingFilterAtom,
} from "@/atoms/server/filters";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAtom } from "jotai";

export function FilterPopup({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useAtom(serverModeFilterAtom);
  const [language, setLanguage] = useAtom(serverLanguageFilterAtom);
  const [notEmpty, setNotEmpty] = useAtom(serverNotEmptyFilterAtom);
  const [notFull, setNotFull] = useAtom(serverNotFullFilterAtom);
  const [notPassword, setNotPassword] = useAtom(serverNotPasswordFilterAtom);
  const [notPing, setNotPing] = useAtom(serverNotPingFilterAtom);

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Filters</h4>
          </div>
          <div className="grid gap-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width" className="text-xs">
                Mode
              </Label>
              <Input
                className="col-span-2 h-8"
                value={mode}
                onChange={(e) => {
                  setMode(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth" className="text-xs">
                Language
              </Label>
              <Input
                className="col-span-2 h-8"
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={notFull}
                  onCheckedChange={() => {
                    setNotFull(!notFull);
                  }}
                />
                <Label className="col-span-2 text-xs">Not full</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={notEmpty}
                  onCheckedChange={() => {
                    setNotEmpty(!notEmpty);
                  }}
                />
                <Label className="col-span-2 text-xs">Not empty</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={notPassword}
                  onCheckedChange={() => {
                    setNotPassword(!notPassword);
                  }}
                />
                <Label className="col-span-2 text-xs">Not password</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={notPing}
                  onCheckedChange={() => {
                    setNotPing(!notPing);
                  }}
                />
                <Label className="col-span-2 text-xs">Not ping</Label>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
