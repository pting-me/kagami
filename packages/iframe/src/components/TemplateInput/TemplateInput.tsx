import { useState } from "react";

import clsx from "clsx";

import { Listbox } from "@headlessui/react";

import { ChevronIcon } from "../Icon/ChevronIcon";

interface Template {
  framework: string;
  type: string;
  language: string;
}

const templates: Template[] = [
  { framework: "React", type: "simple", language: "TypeScript" },
  { framework: "React", type: "forwardRef", language: "TypeScript" },
];

export function TemplateInput() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(
    templates[0]
  );

  return (
    <Listbox value={selectedTemplate} onChange={setSelectedTemplate}>
      <div className="relative whitespace-nowrap">
        <Listbox.Button className="hover:bg-fill focus:bg-fill hover:border-stroke focus:border-stroke fill-icon-tertiary hover:fill-icon flex h-7 items-center justify-between rounded-sm bg-transparent px-1.5">
          <div className="pr-1">{selectedTemplate.type}</div>
          <div>
            <ChevronIcon />
          </div>
        </Listbox.Button>
        <Listbox.Options className="bg-fill-input absolute right-0 z-10 rounded py-2 outline-none">
          {templates.map((template) => (
            <Listbox.Option
              key={JSON.stringify(template)}
              value={template}
              className={({ active }) =>
                clsx(
                  active && "bg-fill-input-selected",
                  "overflow-hidden text-ellipsis whitespace-nowrap px-2 py-1"
                )
              }
            >
              {template.type}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
