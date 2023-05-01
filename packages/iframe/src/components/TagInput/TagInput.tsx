import { useState } from "react";

import clsx from "clsx";

import { Combobox } from "@headlessui/react";

import { htmlElementTagNameMap, svgElementTagNameMap } from "./tagNameMap";

const people = [
  "Durward Reynolds",
  "Kenton Towne",
  "Therese Wunsch",
  "Benedict Kessler",
  "Katelyn Rohan",
];

interface Tag {
  label: string;
  type: "svg" | "html";
}

const tags = [
  ...Object.keys(htmlElementTagNameMap).map((tag) => ({
    label: tag,
    type: "html",
  })),
  ...Object.keys(svgElementTagNameMap).map((tag) => ({
    label: tag,
    type: "svg",
  })),
].sort((a, b) => a.label.localeCompare(b.label));

export function TagInput() {
  const [selectedTag, setSelectedTag] = useState<Tag>({
    label: "div",
    type: "html",
  });

  const [query, setQuery] = useState("");

  const filteredTags =
    query === ""
      ? tags.filter((_, index) => index < 10)
      : tags
          .filter((tag) => {
            return tag.label.toLowerCase().startsWith(query.toLowerCase());
          })
          .filter((_, index) => index < 10);

  return (
    <Combobox value={selectedTag} onChange={setSelectedTag}>
      <div className="relative">
        <Combobox.Input
          className="hover:border-stroke hover:bg-fill active:bg-fill focus:bg-fill w-24 rounded-sm border border-transparent bg-transparent px-2 py-1 outline-transparent"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(tag: Tag) => tag.label}
        />
        <Combobox.Options className="bg-fill-input absolute z-10 w-full rounded py-2">
          {filteredTags.map((tag) => (
            <Combobox.Option
              key={`${tag.label}-${tag.type}`}
              value={tag}
              className={({ active }) =>
                clsx(
                  active && "bg-fill-input-selected",
                  "overflow-hidden text-ellipsis whitespace-nowrap px-2 py-1"
                )
              }
            >
              <span>{tag.label}</span>
              <span className="text-type-secondary ml-4 italic">
                {tag.type}
              </span>
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  );
}
