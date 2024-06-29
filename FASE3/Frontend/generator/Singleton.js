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
        Singleton.instance = this;
        this.updateDisplay();
        return this;
    }

    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }

    initializeRegisters() {
        return {
            x0: 0, x1: 0, x2: 0, x3: 0, x4: 0, x5: 0, x6: 0, x7: 0, x8: 0, x9: 0, x10: 0, x11: 0, x12: 0,
            sp: 24, lr: 234, pc: 0
        };
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
            console.log(`Setting ${section}.${key} to ${value}`);
            this.updateDisplay();
        }
    }

    getData(section, key) {
        return this.data[section][key];
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