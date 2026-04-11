"use client";

import { useState } from "react";
import { Box, Button, Card, CardContent, Divider, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import type { Post } from "@/types/api";

function formatDate(value: string | null) {
  if (!value) {
    return "Draft";
  }

  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(value));
}

type PostTableProps = {
  posts: Post[];
  onEdit?: (post: Post) => void;
};

export function PostTable({ posts, onEdit }: PostTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const paginatedPosts = posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Card sx={{ borderRadius: 0 }}>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ px: 3, py: 2.5 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Blog Posts
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Components mapped to the Django `Post` model.
          </Typography>
        </Box>
        <Divider />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Published</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPosts.map((post) => (
              <TableRow key={post.id} hover>
                <TableCell sx={{ fontWeight: 600 }}>{post.title}</TableCell>
                <TableCell>{post.category?.name ?? "General"}</TableCell>
                <TableCell>{post.author?.full_name ?? "Unknown author"}</TableCell>
                <TableCell>{formatDate(post.published_at)}</TableCell>
                <TableCell align="right">
                  <Button size="small" onClick={() => onEdit?.(post)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={posts.length}
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
