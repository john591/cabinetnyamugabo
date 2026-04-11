"use client";

import { Button, Grid, Stack, TextField } from "@mui/material";

type CategoryFormValue = {
  name: string;
  description: string;
};

type CategoryFormProps = {
  value: CategoryFormValue;
  onChange: (value: CategoryFormValue) => void;
  onReset: () => void;
  onSubmit: () => void;
  canEdit: boolean;
};

export function CategoryForm({ value, onChange, onReset, onSubmit, canEdit }: CategoryFormProps) {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField label="Category name" value={value.name} onChange={(event) => onChange({ ...value, name: event.target.value })} fullWidth />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField label="Description" value={value.description} onChange={(event) => onChange({ ...value, description: event.target.value })} multiline minRows={4} fullWidth />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Stack direction="row" spacing={1.5}>
          <Button variant="contained" disabled={!canEdit} onClick={onSubmit}>
            Create Category
          </Button>
          <Button variant="outlined" onClick={onReset}>
            Reset
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
