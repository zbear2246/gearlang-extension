import { FunctionSymbol, Symbol as GearSymbol, VariableSymbol } from "../types";


class SymbolTable {
    private functions = new Map<string, FunctionSymbol>();
    private variables = new Map<string, VariableSymbol>();


    /**
     * addFunctions
     */
    public addFunction(functionSymbol: FunctionSymbol) {
        this.functions.set(
            functionSymbol.name,
            functionSymbol
        )

    };

    /**
     * addVariables
     */
    public addVariable(variableSymbol: VariableSymbol) {
        this.variables.set(
            variableSymbol.name,
            variableSymbol
        )

    };

    /**
     * lookup
     */
    public lookup(name: string): GearSymbol | undefined {
        if (this.functions.has(name)) {
            return this.functions.get(name)
        } else if (this.variables.has(name)) {
            return this.variables.get(name)
        } else {
            return undefined
        }
    };

    /**
     * clear
     */

    public clear() {
        this.functions.clear()
        this.variables.clear()
    };
}

export { SymbolTable };