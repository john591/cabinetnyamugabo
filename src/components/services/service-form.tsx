"use client";

import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";

type ServiceFormValue = {
  title: string;
  short_description: string;
  description: string;
  icon: string;
  is_featured: boolean;
  order: string;
};

type ServiceFormProps = {
  onChange: (value: ServiceFormValue) => void;
  onReset: () => void;
  onSubmit: () => void;
  value: ServiceFormValue;
  editing: boolean;
  canEdit: boolean;
};

export function ServiceForm({ onChange, onReset, onSubmit, value, editing, canEdit }: ServiceFormProps) {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          label="Title"
          value={value.title}
          onChange={(event) => onChange({ ...value, title: event.target.value })}
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          label="Icon"
          value={value.icon}
          onChange={(event) => onChange({ ...value, icon: event.target.value })}
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          label="Short description"
          value={value.short_description}
          onChange={(event) => onChange({ ...value, short_description: event.target.value })}
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <TextField
          label="Order"
          type="number"
          value={value.order}
          onChange={(event) => onChange({ ...value, order: event.target.value })}
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="service-featured-label">Featured</InputLabel>
          <Select
            labelId="service-featured-label"
            label="Featured"
            value={value.is_featured ? "yes" : "no"}
            onChange={(event) => onChange({ ...value, is_featured: event.target.value === "yes" })}
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          label="Description"
          value={value.description}
          onChange={(event) => onChange({ ...value, description: event.target.value })}
          multiline
          minRows={5}
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Stack direction="row" spacing={1.5}>
          <Button variant="contained" disabled={!canEdit} onClick={onSubmit}>
            {editing ? "Update Service" : "Create Service"}
          </Button>
          <Button variant="outlined" onClick={onReset}>
            Reset
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
