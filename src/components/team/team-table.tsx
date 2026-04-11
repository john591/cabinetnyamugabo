"use client";

import { useState } from "react";
import { Box, Button, Card, CardContent, Chip, Divider, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import type { TeamMember } from "@/types/api";

type TeamTableProps = {
  members: TeamMember[];
  onEdit?: (member: TeamMember) => void;
};

export function TeamTable({ members, onEdit }: TeamTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const paginatedMembers = members.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Card sx={{ borderRadius: 0 }}>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ px: 3, py: 2.5 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Team Members
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Components mapped to the Django `TeamMember` model.
          </Typography>
        </Box>
        <Divider />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedMembers.map((member) => (
              <TableRow key={member.id} hover>
                <TableCell sx={{ fontWeight: 600 }}>{member.full_name}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>{member.email || "No email"}</TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    color={member.is_active ? "success" : "default"}
                    label={member.is_active ? "Active" : "Inactive"}
                  />
                </TableCell>
                <TableCell align="right">
                  <Button size="small" onClick={() => onEdit?.(member)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={members.length}
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
