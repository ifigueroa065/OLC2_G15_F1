class Singleton {
    constructor() {
        if (Singleton.instance) {
            return Singleton.instance;
        }
        this.data = {
            registers: this.initializeRegisters(),
            dataMemory: this.initializeMemory(64), // initialize 64 bytes of data memory
            stackMemory: this.initializeMemory(64), // initialize 64 bytes of stack memory
            instructionMemory: this.initializeMemory(64), // initialize 64 bytes of instruction memory
        };
        this.label = {};
        this.existsJump = false;
        // Flags
        this.ZF = false; // Zero Flag
        this.NF = false; // Negative Flag
        this.CF = false; // Carry Flag
        this.VF = false; // Overflow Flag
        Singleton.instance = this;
        this.updateDisplay();
        return this;
    }

    setResetFlags() {
        this.ZF = false;
        this.NF = false;
        this.CF = false;
        this.VF = false;
    }

    setFlags(ZF, NF, CF, VF) {
        this.ZF = ZF;
        this.NF = NF;
        this.CF = CF;
        this.VF = VF;
    }

    getFlags() {
        return {
            ZF: this.ZF,
            NF: this.NF,
            CF: this.CF,
            VF: this.VF,
        };
    }

    resetSingleton() {
        this.data = {
            registers: this.initializeRegisters(),
            dataMemory: this.initializeMemory(64), // initialize 64 bytes of data memory
            stackMemory: this.initializeMemory(64), // initialize 64 bytes of stack memory
            instructionMemory: this.initializeMemory(64), // initialize 64 bytes of instruction memory
        };
        this.label = {};
        this.updateDisplay();
        this.existsJump = false;
    }

    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }

    initializeRegisters() {
        let registers = {};
        for (let i = 0; i < 31; i++) {
            registers[`x${i}`] = 0;
            registers[`w${i}`] = 0;
        }
        registers["sp"] = 24;
        registers["lr"] = 234;
        registers["pc"] = 0;
        return registers;
    }

    initializeMemory(size) {
        let memory = {};
        for (let i = 0; i < size; i += 4) {
            memory[i.toString(16)] = 0;
        }
        return memory;
    }

    setData(section, key, value) {
        if (section in this.data) {
            this.data[section][key] = value;
            this.updateDisplay();
        }
    }

    getData(section, key) {
        return this.data[section][key];
    }

    setLabel(label, Object) {
        if (!this.label.hasOwnProperty(label)) {
            this.label[label] = Object;
            console.log(`Label ${label} set successfully.`);
        } else {
            console.log(`Label ${label} already exists.`);
        }
    }

    setJump(bool) {
        this.existsJump = bool
    }

    getJump() {
        return this.existsJump;
    }

    getLabel(label) {
        return this.label[label];
    }

    updateDisplay() {
        document.getElementById('registers-content').innerText = this.formatData(this.data.registers);
        document.getElementById('data-memory-content').innerText = this.formatData(this.data.dataMemory);
        document.getElementById('stack-memory-content').innerText = this.formatData(this.data.stackMemory);
        document.getElementById('instruction-memory-content').innerText = this.formatData(this.data.instructionMemory);
    }

    formatData(data) {
        return Object.entries(data).map(([key, value]) => `${key}: ${value}`).join('\n');
    }
}