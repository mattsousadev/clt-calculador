import { AppBar, Box, Container, FormControl, MenuItem, Select, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import SalarioLiquidoScreen from "./screens/SalarioLiquidoScreen";


function App() {

  const [calculationType, setCalculationType] = useState(1);

  const handleCalculationSelection = (e: any) => {
    setCalculationType(e.target.value)
  }

  const renderCalculationScreenByType = () => {

    if (calculationType === 1)
      return (<SalarioLiquidoScreen />)
    
    return (<></>)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CLT Calculador
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ maxWidth: "sm", mt: 2 }}>

        <FormControl fullWidth>
          <Select
            value={calculationType}
            onChange={handleCalculationSelection}
          >
            <MenuItem value={1}>Salário Líquido</MenuItem>
          </Select>
        </FormControl>

        {renderCalculationScreenByType()}

      </Container>

    </Box>
  )
}

export default App
