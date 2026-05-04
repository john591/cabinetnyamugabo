"use client";

import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { ImageUploadField } from "@/components/forms/image-upload-field";
import type { Category, TeamMember } from "@/types/api";

type PostFormValue = {
  title: string;
  slug: string;
  summary: string;
  body: string;
  category_id: string;
  author_id: string;
  status: "draft" | "published";
  featuredImageFile: File | null;
  featuredImagePreviewUrl: string;
};

type PostFormProps = {
  authors: TeamMember[];
  categories: Category[];
  value: PostFormValue;
  onChange: (value: PostFormValue) => void;
  onReset: () => void;
  onSubmit: () => void;
  editing: boolean;
  canEdit: boolean;
};

export function PostForm({
  authors,
  categories,
  value,
  onChange,
  onReset,
  onSubmit,
  editing,
  canEdit,
}: PostFormProps) {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField label="Title" value={value.title} onChange={(event) => onChange({ ...value, title: event.target.value })} fullWidth />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField label="Slug" value={value.slug} onChange={(event) => onChange({ ...value, slug: event.target.value })} fullWidth />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth>
          <InputLabel id="post-category-label">Category</InputLabel>
          <Select labelId="post-category-label" label="Category" value={value.category_id} onChange={(event) => onChange({ ...value, category_id: event.target.value })}>
            {categories.map((category) => (
              <MenuItem key={category.id} value={String(category.id)}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth>
          <InputLabel id="post-author-label">Author</InputLabel>
          <Select labelId="post-author-label" label="Author" value={value.author_id} onChange={(event) => onChange({ ...value, author_id: event.target.value })}>
            {authors.map((author) => (
              <MenuItem key={author.id} value={String(author.id)}>
                {author.full_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth>
          <InputLabel id="post-status-label">Status</InputLabel>
          <Select
            labelId="post-status-label"
            label="Status"
            value={value.status}
            onChange={(event) =>
              onChange({ ...value, status: event.target.value as "draft" | "published" })
            }
          >
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="published">Published</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ImageUploadField
          label="Upload featured image"
          previewUrl={value.featuredImagePreviewUrl}
          onChange={(featuredImageFile, featuredImagePreviewUrl) =>
            onChange({ ...value, featuredImageFile, featuredImagePreviewUrl })
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField label="Summary" value={value.summary} onChange={(event) => onChange({ ...value, summary: event.target.value })} multiline minRows={3} fullWidth />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField label="Body" value={value.body} onChange={(event) => onChange({ ...value, body: event.target.value })} multiline minRows={6} fullWidth />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Stack direction="row" spacing={1.5}>
          <Button variant="contained" disabled={!canEdit} onClick={onSubmit}>
            {editing ? "Update Post" : "Create Post"}
          </Button>
          <Button variant="outlined" onClick={onReset}>
            Reset
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
