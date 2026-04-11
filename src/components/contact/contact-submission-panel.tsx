"use client";

import { useState } from "react";
import { Button, Card, CardContent, Grid, Paper, Stack, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import type { ContactSubmission } from "@/types/api";

type ContactFormValue = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type ContactSubmissionPanelProps = {
  value: ContactFormValue;
  onChange: (value: ContactFormValue) => void;
  onSubmit: () => void;
  canEdit: boolean;
  submissions: ContactSubmission[];
};

export function ContactSubmissionPanel({
  value,
  onChange,
  onSubmit,
  canEdit,
  submissions,
}: ContactSubmissionPanelProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const paginatedSubmissions = submissions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, lg: 5 }}>
      <Card sx={{ borderRadius: 0 }}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Contact submissions
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Components mapped to the Django `ContactSubmission` model.
            </Typography>
            <Stack spacing={2} sx={{ mt: 3 }}>
              <TextField label="Name" value={value.name} onChange={(event) => onChange({ ...value, name: event.target.value })} fullWidth />
              <TextField label="Email" value={value.email} onChange={(event) => onChange({ ...value, email: event.target.value })} fullWidth />
              <TextField label="Phone" value={value.phone} onChange={(event) => onChange({ ...value, phone: event.target.value })} fullWidth />
              <TextField label="Subject" value={value.subject} onChange={(event) => onChange({ ...value, subject: event.target.value })} fullWidth />
              <TextField label="Message" value={value.message} onChange={(event) => onChange({ ...value, message: event.target.value })} multiline minRows={4} fullWidth />
              <Button variant="contained" disabled={!canEdit} onClick={onSubmit}>
                Create Contact Submission
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, lg: 7 }}>
        <Card sx={{ borderRadius: 0 }}>
          <CardContent sx={{ p: 0 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedSubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell sx={{ fontWeight: 600 }}>{submission.name}</TableCell>
                    <TableCell>{submission.subject}</TableCell>
                    <TableCell>{submission.email}</TableCell>
                    <TableCell>{submission.status}</TableCell>
                  </TableRow>
                ))}
                {!submissions.length ? (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Paper variant="outlined" sx={{ p: 2.5 }}>
                        <Typography variant="body2" color="text.secondary">
                          No contact submissions are available yet in the database.
                        </Typography>
                      </Paper>
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={submissions.length}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(Number(event.target.value));
                setPage(0);
              }}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
