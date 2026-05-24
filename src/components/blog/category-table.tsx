"use client";

import { useState } from "react";
import { Box, Button, Card, CardContent, Divider, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import type { Category } from "@/types/api";

type CategoryTableProps = {
  categories: Category[];
  onDelete?: (category: Category) => void;
};

export function CategoryTable({ categories, onDelete }: CategoryTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const paginatedCategories = categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Card sx={{ borderRadius: 0 }}>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ px: 3, py: 2.5 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Categories
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Components mapped to the Django `Category` model.
          </Typography>
        </Box>
        <Divider />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCategories.map((category) => (
              <TableRow key={category.id} hover>
                <TableCell sx={{ fontWeight: 600 }}>{category.name}</TableCell>
                <TableCell>{category.slug}</TableCell>
                <TableCell>{category.description || "No description"}</TableCell>
                <TableCell align="right">
                  {onDelete ? (
                    <Button color="error" size="small" onClick={() => onDelete(category)}>
                      Delete
                    </Button>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={categories.length}
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
