Program
  = _ instructions:InstructionList _ { return { type: "Program", body: instructions }; }

InstructionList
  = head:Instruction tail:(_ (EOL / ";") _ Instruction)* {
      return [head, ...tail.map(e => e[3])];
    }

Instruction
  = Directive
  / LoadInstruction
  / StoreInstruction
  / ArithmeticInstruction
  / LogicalInstruction
  / ShiftRotateInstruction
  / BranchInstruction
  / ConditionalBranchInstruction
  / UnconditionalBranchInstruction
  / RelationalOperatorInstruction
  / Label
  / LineComment
  / SemicolonComment

Directive
  = "." name:Identifier _ value:Identifier { return { type: "Directive", name, value }; }

LoadInstruction
  = op:("ldr"i / "ldrb"i / "ldp"i) _ dest:Register "," _ "[" src:Register "]" {
      return { type: "LoadInstruction", op, dest, src };
    }

StoreInstruction
  = op:("str"i / "strb"i / "stp"i) _ src:Register "," _ "[" dest:Register "]" {
      return { type: "StoreInstruction", op, src, dest };
    }

ArithmeticInstruction
  = op:("add"i / "sub"i / "mul"i / "udiv"i / "sdiv"i) _ dest:Register "," _ src1:Register "," _ src2:Register {
      return { type: "ArithmeticInstruction", op, dest, src1, src2 };
    }

LogicalInstruction
  = op:("and"i / "orr"i / "eor"i / "mvn"i) _ dest:Register "," _ src1:Register ("," _ src2:Register)? {
      return { type: "LogicalInstruction", op, dest, src1, src2: src2 || null };
    }

ShiftRotateInstruction
  = op:("lsl"i / "lsr"i / "asr"i / "ror"i) _ dest:Register "," _ src:Register "," _ "#" value:Number {
      return { type: "ShiftRotateInstruction", op, dest, src, value };
    }

BranchInstruction
  = op:("b"i / "bl"i / "ret"i / "beq"i / "bne"i / "bgt"i / "blt"i) _ target:Identifier {
      return { type: "BranchInstruction", op, target };
    }

ConditionalBranchInstruction
  = "b." condition:ConditionCode _ label:Identifier {
      return { type: "ConditionalBranchInstruction", condition, label };
    }

UnconditionalBranchInstruction
  = "b" _ label:Identifier {
      return { type: "UnconditionalBranchInstruction", label };
    }

RelationalOperatorInstruction
  = "cmp" _ reg1:Register "," _ reg2:Register {
      return { type: "RelationalOperatorInstruction", reg1, reg2 };
    }

ConditionCode
  = "eq"i { return "eq"; }
  / "ne"i { return "ne"; }
  / "gt"i { return "gt"; }
  / "lt"i { return "lt"; }

Label
  = name:Identifier ":" { return { type: "Label", name }; }

LineComment
  = "//" comment:$([^"\n"]*) { return { type: "LineComment", text: comment }; }

SemicolonComment
  = ";" comment:$([^"\n"]*) { return { type: "SemicolonComment", text: comment }; }

Register
  = ("x" / "w") [0-9]+ { return { type: "Register", name: text() }; }

Identifier
  = [a-zA-Z_][a-zA-Z0-9_]* { return text(); }

Number
  = [0-9]+ { return parseInt(text(), 10); }

EOL "end of line"
  = "\n" / "\r\n"

_ "whitespace"
  = [ \t\n\r]*
