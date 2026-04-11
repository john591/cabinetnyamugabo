"use client";

import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";

type TeamFormValue = {
  first_name: string;
  last_name: string;
  role: string;
  bio: string;
  email: string;
  phone: string;
  linkedin_url: string;
  photo_url: string;
  is_active: boolean;
  order: string;
};

type TeamFormProps = {
  value: TeamFormValue;
  onChange: (value: TeamFormValue) => void;
  onReset: () => void;
  onSubmit: () => void;
  editing: boolean;
  canEdit: boolean;
};

export function TeamForm({ value, onChange, onReset, onSubmit, editing, canEdit }: TeamFormProps) {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField label="First name" value={value.first_name} onChange={(event) => onChange({ ...value, first_name: event.target.value })} fullWidth />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField label="Last name" value={value.last_name} onChange={(event) => onChange({ ...value, last_name: event.target.value })} fullWidth />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField label="Role" value={value.role} onChange={(event) => onChange({ ...value, role: event.target.value })} fullWidth />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField label="Email" value={value.email} onChange={(event) => onChange({ ...value, email: event.target.value })} fullWidth />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField label="Phone" value={value.phone} onChange={(event) => onChange({ ...value, phone: event.target.value })} fullWidth />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField label="Order" type="number" value={value.order} onChange={(event) => onChange({ ...value, order: event.target.value })} fullWidth />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField label="LinkedIn URL" value={value.linkedin_url} onChange={(event) => onChange({ ...value, linkedin_url: event.target.value })} fullWidth />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField label="Photo URL" value={value.photo_url} onChange={(event) => onChange({ ...value, photo_url: event.target.value })} fullWidth />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <FormControl fullWidth>
          <InputLabel id="team-active-label">Active</InputLabel>
          <Select
            labelId="team-active-label"
            label="Active"
            value={value.is_active ? "yes" : "no"}
            onChange={(event) => onChange({ ...value, is_active: event.target.value === "yes" })}
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField label="Bio" value={value.bio} onChange={(event) => onChange({ ...value, bio: event.target.value })} multiline minRows={4} fullWidth />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Stack direction="row" spacing={1.5}>
          <Button variant="contained" disabled={!canEdit} onClick={onSubmit}>
            {editing ? "Update Team Member" : "Create Team Member"}
          </Button>
          <Button variant="outlined" onClick={onReset}>
            Reset
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
