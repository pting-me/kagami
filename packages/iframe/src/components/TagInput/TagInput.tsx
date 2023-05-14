import { useState } from "react";

import clsx from "clsx";

import { Combobox } from "@headlessui/react";
import { Tag } from "@kagami/common";

import { htmlElementTagNameMap, svgElementTagNameMap } from "./tagNameMap";

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
    <Combobox name="tag" value={selectedTag} onChange={setSelectedTag}>
      <div className="relative">
        <Combobox.Input
          className="hover:border-stroke hover:bg-fill active:bg-fill focus:bg-fill h-7 w-16 rounded-sm border border-transparent bg-transparent px-1.5"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(tag: Tag) => tag.label}
        />
        <Combobox.Options className="bg-fill-secondary border-stroke absolute right-0 z-10 rounded border py-2">
          {filteredTags.map((tag) => (
            <Combobox.Option
              key={`${tag.label}-${tag.type}`}
              value={tag}
              className={({ active }) =>
                clsx(
                  active && "bg-fill-brand-hover",
                  "flex justify-between gap-2 overflow-hidden text-ellipsis whitespace-nowrap px-2 py-1"
                )
              }
            >
              <div>{tag.label}</div>
              <div className="text-type-secondary italic">{tag.type}</div>
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  );
}
