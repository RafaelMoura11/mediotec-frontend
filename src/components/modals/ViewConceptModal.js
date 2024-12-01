import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem } from "@mui/material";
import usersFunctions from "../../utils/usersFunctions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// Todas as unidades definidas no Enum UnidadeEnum
const ALL_UNITS = ["UNIT1", "UNIT2", "AVG", "FINAL"];

export default function ViewConceptModal({ open, handleClose, selectedDiscipline, concepts, token, fetchConcepts }) {
  const [updatedConcepts, setUpdatedConcepts] = useState({});
  const [allConcepts, setAllConcepts] = useState([]); // Combinação de todas as unidades e conceitos existentes

  // Combinar todas as unidades com os conceitos existentes
  useEffect(() => {
    const mergedConcepts = ALL_UNITS.map((unit) => {
      const existingConcept = concepts.find((concept) => concept.unidade === unit);
      return (
        existingConcept || {
          conceitoId: `${unit}-placeholder`, // ID fictício para unidades sem conceito
          unidade: unit,
          conceito: "N/A", // Valor padrão para unidades não cadastradas
          result: "N/A", // Valor padrão para o resultado
        }
      );
    });
    setAllConcepts(mergedConcepts);
  }, [concepts]);

  const handleConceptChange = (conceitoId, newValue) => {
    setUpdatedConcepts((prev) => ({
      ...prev,
      [conceitoId]: newValue,
    }));
  };

  const handleSave = async () => {
    try {
      const updates = Object.entries(updatedConcepts);
      for (const [conceitoId, conceito] of updates) {
        // Evitar enviar conceitos fictícios para o backend
        if (!conceitoId.includes("placeholder")) {
          await usersFunctions.updateConcept(conceitoId, { conceito }, token);
        }
      }
      await fetchConcepts(selectedDiscipline.courseId); // Atualiza conceitos após salvar
      handleClose();
    } catch (error) {
      console.error("Erro ao atualizar conceitos:", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" gutterBottom>
          Conceitos - {selectedDiscipline?.courseName}
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Unidade</TableCell>
                <TableCell>Conceito</TableCell>
                <TableCell>Atualizar Conceito</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allConcepts.map((concept) => (
                <TableRow key={concept.conceitoId}>
                  <TableCell>{concept.unidade}</TableCell>
                  <TableCell>{concept.conceito}</TableCell>
                  <TableCell>
                    <Select
                      value={updatedConcepts[concept.conceitoId] || concept.conceito}
                      onChange={(e) => handleConceptChange(concept.conceitoId, e.target.value)}
                      fullWidth
                    >
                      <MenuItem value="E">Excelente</MenuItem>
                      <MenuItem value="B">Bom</MenuItem>
                      <MenuItem value="R">Regular</MenuItem>
                      <MenuItem value="I">Insuficiente</MenuItem>
                      <MenuItem value="N/A" disabled>
                        Não Disponível
                      </MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: "16px" }}>
          Salvar
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClose} style={{ marginTop: "16px", marginLeft: "8px" }}>
          Cancelar
        </Button>
      </Box>
    </Modal>
  );
}
