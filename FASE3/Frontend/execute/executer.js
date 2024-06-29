const RootExecuter = (root, env, gen, memo) => {
    const instructions = root?.children?? [];
    instructions.forEach(inst => {
        if (inst?.type === 'INSTRUCTION'){
            inst._InsExpr?.execute(env, gen, memo);       
        }
    });
}