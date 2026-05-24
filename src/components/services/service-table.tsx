"use client";

import { useState } from "react";
import { Box, Button, Card, CardContent, Chip, Divider, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import type { Service } from "@/types/api";

type ServiceTableProps = {
  onDelete?: (service: Service) => void;
  onEdit?: (service: Service) => void;
  services: Service[];
};

export function ServiceTable({ onDelete, onEdit, services }: ServiceTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const paginatedServices = services.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Card sx={{ borderRadius: 0 }}>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ px: 3, py: 2.5 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Services
          </Typography>
        </Box>
        <Divider />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Featured</TableCell>
              <TableCell>Order</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedServices.map((service) => (
              <TableRow key={service.id} hover>
                <TableCell sx={{ fontWeight: 600 }}>{service.title}</TableCell>
                <TableCell>{service.slug}</TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    color={service.is_featured ? "primary" : "default"}
                    label={service.is_featured ? "Featured" : "Standard"}
                  />
                </TableCell>
                <TableCell>{service.order}</TableCell>
                <TableCell align="right">
                  <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                    <Button size="small" onClick={() => onEdit?.(service)}>
                      Edit
                    </Button>
                    {onDelete ? (
                      <Button color="error" size="small" onClick={() => onDelete(service)}>
                        Delete
                      </Button>
                    ) : null}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={services.length}
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
  );
}
