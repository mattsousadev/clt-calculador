interface ICalculadorTrabalhista {
    calcularSalarioLiquido(salarioBruto: number, dependentes: number): number;
    calcularInss(salarioBruto: number): number;
    calcularIrrf(baseCalculoIrrf: number, dependentes: number): number;
}

export type {ICalculadorTrabalhista}