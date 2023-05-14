import { useState } from "react";

import clsx from "clsx";

import { Listbox } from "@headlessui/react";
import { Template } from "@kagami/common";

import { ChevronIcon } from "../Icon/ChevronIcon";

const templates: Template[] = [
  { framework: "React", type: "simple", language: "TypeScript" },
  { framework: "React", type: "forwardRef", language: "TypeScript" },
];

export function TemplateInput() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(
    templates[0]
  );

  return (
    <Listbox
      name="template"
      value={selectedTemplate}
      onChange={setSelectedTemplate}
    >
      {({ open }) => {
        return (
          <div className="relative whitespace-nowrap">
            <Listbox.Button
              onClick={(e) => {
                console.log(e);
              }}
              className={clsx(
                open && "bg-fill border-stroke fill-icon",
                "hover:bg-fill hover:border-stroke fill-icon-tertiary hover:fill-icon flex h-7 items-center justify-between rounded-sm border border-transparent bg-transparent px-1.5"
              )}
            >
              <div className="pr-1">{selectedTemplate.type}</div>
              <div>
                <ChevronIcon />
              </div>
            </Listbox.Button>
            <Listbox.Options className="bg-fill-secondary border-stroke absolute right-0 z-10 rounded border py-2 outline-none">
              {templates.map((template) => (
                <Listbox.Option
                  key={JSON.stringify(template)}
                  value={template}
                  className={({ active }) =>
                    clsx(
                      active && "bg-fill-brand-hover",
                      "overflow-hidden text-ellipsis whitespace-nowrap px-2 py-1"
                    )
                  }
                >
                  {template.type}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        );
      }}
    </Listbox>
  );
}
