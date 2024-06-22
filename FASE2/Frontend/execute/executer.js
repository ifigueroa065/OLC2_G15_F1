const RootExecuter = (root, env, gen) => {
    const instructions = root?.children?? [];
    instructions.forEach(inst => {
        if (inst?.type === 'INSTRUCTION'){
            inst._InsExpr?.execute(env, gen);       
        }
    });
}