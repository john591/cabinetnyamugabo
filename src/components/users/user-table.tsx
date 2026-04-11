"use client";

import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import type { DashboardUser } from "@/types/api";

type UserTableProps = {
  users: DashboardUser[];
};

export function UserTable({ users }: UserTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const paginatedUsers = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Card sx={{ borderRadius: 0 }}>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ px: 3, py: 2.5 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Users Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Components mapped to the Django `User` and `UserProfile` models.
          </Typography>
        </Box>
        <Divider />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Profile Role</TableCell>
              <TableCell>Dashboard Access</TableCell>
              <TableCell>Permissions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => {
              const fullName = `${user.first_name} ${user.last_name}`.trim();
              const permissionLabel = user.is_superuser
                ? "Superuser"
                : user.is_staff
                  ? "Staff"
                  : "Standard";

              return (
                <TableRow key={user.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{user.username}</TableCell>
                  <TableCell>{fullName || "No name"}</TableCell>
                  <TableCell>{user.email || "No email"}</TableCell>
                  <TableCell>{user.profile?.role_title || "No profile role"}</TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      color={user.profile?.is_dashboard_user ? "success" : "default"}
                      label={user.profile?.is_dashboard_user ? "Enabled" : "Disabled"}
                    />
                  </TableCell>
                  <TableCell>{permissionLabel}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={users.length}
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
