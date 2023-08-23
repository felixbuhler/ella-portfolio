import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: null, // Get this from tina.io
  token: null, // Get this from tina.io

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "project",
        label: "Projects",
        path: "content/projects",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: 'image',
            label: 'Hero image',
            name: 'heroImage',
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body"
          },
          {
            type: 'string',
            name: 'project_color',
            label: 'Project Color',
            description: 'Edit the page background color here',
            ui: {
              component: 'color',
              colorFormat: 'hex',
              colors: ['#EC4815', '#241748', '#B4F4E0', '#E6FAF8'],
              widget: 'sketch',
            }
          },
          {
            label: 'Tags',
            name: 'tags',
            type: 'string',
            list: true,
          },
          {
            label: "Image Gallery",
            name: "gallery",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => {
                // Field values are accessed by item?.<Field name>
                return { label: item?.title };
              },
            },
            fields: [
              {
                label: "Description",
                name: "description",
                type: "string",
              },
              { label: "Image", name: "image", type: "image" },
            ],
          }
        ],
      },
    ],
  },
});
