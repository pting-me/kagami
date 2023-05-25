import { writeFile } from "node:fs/promises";
import { basename, dirname, extname, join } from "node:path";

import recursiveReadDir from "recursive-readdir";

const CWD = join(new URL(import.meta.url).pathname, "..");
const COMPONENTS_DIR = join(CWD, "../src/components");

const createStoryContent = (displayName) => `
import type { Meta, StoryObj } from "@storybook/react";

import { ${displayName} } from "./${displayName}";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  component: ${displayName},
} satisfies Meta<typeof ${displayName}>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const DefaultStory: Story = {
  args: {
    label: "${displayName}",
  },
};
`;

const componentFiles = await recursiveReadDir(COMPONENTS_DIR);

const storySet = new Set();
const componentSet = new Set();

componentFiles.forEach((file) => {
  const ext = extname(file);

  if (ext !== ".ts" && ext !== ".tsx") {
    return;
  }
  const base = basename(file, ext);
  const dir = dirname(file);

  // .stories or .story
  const i = base.indexOf(`.stor`);

  if (i > -1) {
    storySet.add(join(dir, base.substring(0, i)));
  } else {
    componentSet.add(join(dir, base));
  }
});

[...componentSet].map(async (componentPath) => {
  if (storySet.has(componentPath)) {
    console.log(`"${basename(componentPath)}" already has a story. Skipping.`);
    return;
  }

  const displayName = basename(componentPath);
  console.log(`Creating story for "${basename(componentPath)}"`);
  await writeFile(
    `${componentPath}.stories.ts`,
    createStoryContent(displayName)
  );
});
