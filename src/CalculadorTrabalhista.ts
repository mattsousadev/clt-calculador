interface ICalculadorTrabalhista {
    calcularSalarioLiquido(salarioBruto: number, dependentes: number): number;
    calcularInss(salarioBruto: number): number;
    calcularIrrf(baseCalculoIrrf: number, dependentes: number): number;
}

class CalculadorTrabalhista implements ICalculadorTrabalhista {
    calcularSalarioLiquido(salarioBruto: number, dependentes: number): number {
        const inss = this.calcularInss(salarioBruto);
        const baseCalculoIrrf = salarioBruto - inss;
        const irrf = this.calcularIrrf(baseCalculoIrrf, dependentes);
        return salarioBruto - inss - irrf;
    }

    calcularInss(salarioBruto: number): number {
        // 2024
        const faixas24 = [
            { faixa: 1412.00, aliquota: 0.075 },
            { faixa: 2666.68, aliquota: 0.09 },
            { faixa: 4000.03, aliquota: 0.12 },
            { faixa: 7786.02, aliquota: 0.14 },
        ];

        const faixas25 = [
            { faixa: 1518.00, aliquota: 0.075 },
            { faixa: 2793.88, aliquota: 0.09 },
            { faixa: 4190.84, aliquota: 0.12 },
            { faixa: 8157.41, aliquota: 0.14 },
        ];

        const faixas = faixas25;

        let totalInss = 0;
        let ultimaFaixa = 0;

        let index = 0;

        while(index < faixas.length){
            const base = Math.min(faixas[index].faixa, salarioBruto) - ultimaFaixa;
            const valor = base * faixas[index].aliquota
            totalInss += valor
            if(faixas[index].faixa >= salarioBruto) {
                break;
            }
            ultimaFaixa = faixas[index].faixa
            index++;
        }


        return totalInss;
    }
    

    calcularIrrf(baseCalculoIrrf: number, dependentes: number): number {
        const deducaoPorDependente = 189.59;
        const baseCalculoComDeducao = baseCalculoIrrf - (dependentes * deducaoPorDependente);

        const faixas24 = [
            { faixa: 4664.68, aliquota: 0.275, desconto:896.0 },
            { faixa: 3751.06, aliquota: 0.225, desconto:662.77 },
            { faixa: 2826.66, aliquota: 0.15, desconto:381.44 },
            { faixa: 2259.21, aliquota: 0.075, desconto:169.44 },
        ];

        const faixas = faixas24;

        for(var faixa of faixas) {
            if(baseCalculoComDeducao >= faixa.faixa) {
                return (baseCalculoComDeducao * faixa.aliquota) - faixa.desconto
            }
        }

        return 0;
        
    }
}

export { CalculadorTrabalhista };
