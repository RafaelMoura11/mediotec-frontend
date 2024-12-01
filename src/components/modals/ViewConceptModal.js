import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ViewConceptModal({ open, handleClose, selectedDiscipline, concepts }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Conceitos - {selectedDiscipline?.courseName}
        </Typography>
        {concepts.length > 0 ? (
          <ul>
            {concepts.map((concept) => (
              <li key={concept.conceitoId}>
                <Typography variant="body1">
                  <strong>Unidade:</strong> {concept.unidade}
                </Typography>
                <Typography variant="body1">
                  <strong>Conceito:</strong> {concept.conceito}
                </Typography>
                <Typography variant="body1">
                  <strong>Resultado:</strong> {concept.result}
                </Typography>
              </li>
            ))}
          </ul>
        ) : (
          <Typography variant="body2">Nenhum conceito disponível.</Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleClose}
          style={{ marginTop: "16px" }}
        >
          Fechar
        </Button>
      </Box>
    </Modal>
  );
}
