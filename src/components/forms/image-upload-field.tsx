"use client";

import { ChangeEvent } from "react";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Box, Button, Stack, Typography } from "@mui/material";

type ImageUploadFieldProps = {
  label: string;
  previewUrl: string;
  onChange: (file: File | null, previewUrl: string) => void;
};

export function ImageUploadField({ label, previewUrl, onChange }: ImageUploadFieldProps) {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    onChange(file, file ? URL.createObjectURL(file) : "");
    event.target.value = "";
  };

  const handleRemove = () => {
    if (previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    onChange(null, "");
  };

  return (
    <Stack spacing={1.25}>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Button
          component="label"
          variant="outlined"
          startIcon={<AddPhotoAlternateOutlinedIcon />}
        >
          {label}
          <input hidden accept="image/*" type="file" onChange={handleFileChange} />
        </Button>
        {previewUrl ? (
          <Button
            variant="text"
            color="error"
            startIcon={<DeleteOutlineOutlinedIcon />}
            onClick={handleRemove}
          >
            Remove
          </Button>
        ) : null}
      </Stack>
      {previewUrl ? (
        <Box
          component="img"
          src={previewUrl}
          alt=""
          sx={{
            aspectRatio: "16 / 9",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
            objectFit: "cover",
            width: "100%",
          }}
        />
      ) : (
        <Box
          sx={{
            alignItems: "center",
            aspectRatio: "16 / 9",
            border: "1px dashed",
            borderColor: "divider",
            borderRadius: 1,
            display: "flex",
            justifyContent: "center",
            px: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            No image selected
          </Typography>
        </Box>
      )}
    </Stack>
  );
}
