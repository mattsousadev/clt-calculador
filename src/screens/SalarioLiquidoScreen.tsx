import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CalculadorTrabalhista } from "../application/CalculadorTrabalhista";
import { BrlNumberFormatter } from "../application/BrlNumberFormatter";


function SalarioLiquidoScreen() {

    const calculador = new CalculadorTrabalhista();
    const formatter = new BrlNumberFormatter();

    const [salarioLiquidoValue, setSalarioLiquidoValue] = useState(0.0);


    const [salarioBruto, setSalarioBruto] = useState("");
    const [dependentes, setDependentes] = useState("");

    const [inss, setInss] = useState("1");
    const [irrf, setIrrf] = useState("1");

    const handleSalarioBrutoChange = (e: any) => {
        setSalarioBruto(e.target.value)
    }

    const handleDependentesChange = (e: any) => {
        setDependentes(e.target.value)
    }


    useEffect(() => {
        const salarioBrutoNumber = Number(salarioBruto)
        const dependentesNumber = Number(dependentes)

        if (!Number.isNaN(salarioBrutoNumber) && !Number.isNaN(dependentesNumber)) {
            const inss = calculador.calcularInss(salarioBrutoNumber);
            const irrf = calculador.calcularIrrf(salarioBrutoNumber - inss, dependentesNumber);
            const salarioLiquido = calculador.calcularSalarioLiquido(salarioBrutoNumber, dependentesNumber);
            setSalarioLiquidoValue(salarioLiquido);
            setInss(formatter.formatCurrency(inss));
            setIrrf(formatter.formatCurrency(irrf));
        }
    }, [salarioBruto, dependentes])

    return (

        <>
            <Typography sx={{ textAlign: "center", mt: 2 }} variant="h3" gutterBottom>
                {formatter.formatCurrency(salarioLiquidoValue)}
            </Typography>

            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        R$
                                    </InputAdornment>
                                ),
                            },
                        }}
                        type="number"
                        label="Salário Bruto"
                        placeholder="3000,00"
                        value={salarioBruto}
                        onChange={handleSalarioBrutoChange}
                    />
                    <TextField
                        type="number"
                        name="dependentes"
                        label="Nº Dependentes"
                        placeholder="2"
                        value={dependentes}
                        onChange={handleDependentesChange}
                    />
                    <TextField
                        disabled
                        name="inss"
                        label="INSS"
                        value={inss}
                        variant="filled"
                    />
                    <TextField
                        disabled
                        name="IRRF"
                        label="IRRF"
                        value={irrf}
                        variant="filled"
                    />
                </div>
            </Box>

        </>
    )
}

export default SalarioLiquidoScreen