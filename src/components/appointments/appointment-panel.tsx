"use client";

import { useState } from "react";
import { Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import type { AppointmentRequest, Service } from "@/types/api";

type AppointmentFormValue = {
  name: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  office: AppointmentRequest["office"];
  service_id: string;
  preferred_date: string;
  preferred_time: string;
  message: string;
};

type AppointmentPanelProps = {
  appointments: AppointmentRequest[];
  canEdit: boolean;
  onChange: (value: AppointmentFormValue) => void;
  onSubmit: () => void;
  onStatusChange: (appointmentId: number, status: AppointmentRequest["status"]) => void;
  services: Service[];
  value: AppointmentFormValue;
};

export function AppointmentPanel({
  appointments,
  canEdit,
  onChange,
  onSubmit,
  onStatusChange,
  services,
  value,
}: AppointmentPanelProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const paginatedAppointments = appointments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, lg: 5 }}>
      <Card sx={{ borderRadius: 0 }}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Demandes de Rendez-vous
            </Typography>
            <Grid container spacing={2} sx={{ mt: 0.5 }}>
              <Grid size={{ xs: 12 }}>
                <TextField label="Nom" value={value.name} onChange={(event) => onChange({ ...value, name: event.target.value })} fullWidth />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField label="Adresse mail" value={value.email} onChange={(event) => onChange({ ...value, email: event.target.value })} fullWidth />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField label="Téléphone" value={value.phone} onChange={(event) => onChange({ ...value, phone: event.target.value })} fullWidth />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField label="Adresse" value={value.address} onChange={(event) => onChange({ ...value, address: event.target.value })} fullWidth />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel id="appointment-country-label">Pays</InputLabel>
                  <Select
                    labelId="appointment-country-label"
                    label="Pays"
                    value={value.country}
                    onChange={(event) => onChange({ ...value, country: event.target.value })}
                  >
                    <MenuItem value="CD">RDC</MenuItem>
                    <MenuItem value="RW">Rwanda</MenuItem>
                    <MenuItem value="BI">Burundi</MenuItem>
                    <MenuItem value="UG">Uganda</MenuItem>
                    <MenuItem value="KE">Kenya</MenuItem>
                    <MenuItem value="TZ">Tanzania</MenuItem>
                    <MenuItem value="CG">Congo</MenuItem>
                    <MenuItem value="ZA">Afrique du Sud</MenuItem>
                    <MenuItem value="BE">Belgique</MenuItem>
                    <MenuItem value="CN">Chine</MenuItem>
                    <MenuItem value="FR">France</MenuItem>
                    <MenuItem value="CA">Canada</MenuItem>
                    <MenuItem value="US">Etats-Unis</MenuItem>
                    <MenuItem value="GB">Royaume-Uni</MenuItem>
                    <MenuItem value="ZZ">Autre</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel id="appointment-office-label">Bureau</InputLabel>
                  <Select
                    labelId="appointment-office-label"
                    label="Bureau"
                    value={value.office}
                    onChange={(event) =>
                      onChange({ ...value, office: event.target.value as AppointmentRequest["office"] })
                    }
                  >
                    <MenuItem value="kinshasa">Kinshasa</MenuItem>
                    <MenuItem value="bukavu">Bukavu</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FormControl fullWidth>
                  <InputLabel id="appointment-service-label">Service</InputLabel>
                  <Select
                    labelId="appointment-service-label"
                    label="Service"
                    value={value.service_id}
                    onChange={(event) => onChange({ ...value, service_id: event.target.value })}
                  >
                    {services.map((service) => (
                      <MenuItem key={service.id} value={String(service.id)}>
                        {service.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Date préférée"
                  type="date"
                  value={value.preferred_date}
                  onChange={(event) => onChange({ ...value, preferred_date: event.target.value })}
                  slotProps={{ inputLabel: { shrink: true } }}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Heure préférée"
                  type="time"
                  value={value.preferred_time}
                  onChange={(event) => onChange({ ...value, preferred_time: event.target.value })}
                  slotProps={{ inputLabel: { shrink: true } }}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField label="Message" value={value.message} onChange={(event) => onChange({ ...value, message: event.target.value })} multiline minRows={4} fullWidth />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Button variant="contained" disabled={!canEdit} onClick={onSubmit}>
                  Créer un rendez-vous
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, lg: 7 }}>
        <Card sx={{ borderRadius: 0 }}>
          <CardContent sx={{ p: 0 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>Service</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Heure</TableCell>
                  <TableCell>Statut</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell sx={{ fontWeight: 600 }}>{appointment.name}</TableCell>
                    <TableCell>{appointment.service?.title ?? "General request"}</TableCell>
                    <TableCell>{appointment.preferred_date}</TableCell>
                    <TableCell>{appointment.preferred_time ?? "Not set"}</TableCell>
                    <TableCell sx={{ minWidth: 160 }}>
                      {canEdit ? (
                        <FormControl fullWidth size="small">
                          <Select
                            value={appointment.status}
                            onChange={(event) =>
                              onStatusChange(
                                appointment.id,
                                event.target.value as AppointmentRequest["status"],
                              )
                            }
                          >
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="confirmed">Confirmed</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                            <MenuItem value="cancelled">Cancelled</MenuItem>
                          </Select>
                        </FormControl>
                      ) : (
                        appointment.status
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={appointments.length}
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
