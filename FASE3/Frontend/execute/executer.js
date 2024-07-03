const RootExecuter = (root, env, gen) => {
    // ejecutar pasada 1 -> se busca data o todo lo que se ejecuta antes del global.
    pasada1(root, env, gen);
    // ejecutar pasada 2 -> se busca global y se ejecuta todo lo que se encuentra después de global.
    pasada2(root, env, gen);
}


function pasada1(root){
    const memoryManager = Singleton.getInstance();
    console.log('memoryManager', memoryManager);
    const instructions = root?.children?? [];
    console.log('pasada1');
    instructions.forEach(inst => {
        console.log('inst', inst);
        if (inst?.type === 'DIRECTIVE'){
            if (inst?.children[0]?.value === 'data'){
                console.log('Executing Data {', inst.children[1]?.value, '}');
                inst._InsExpr?.execute(env, gen);
            }
        }
    });
    console.log('fin pasada1 { memoryManager }', memoryManager.label);
}

function pasada2(root, env, gen){
    const instructions = root?.children?? [];
    instructions.forEach(inst => {
        if (inst?.type === 'GLOBAL'){
            inst._InsExpr?.execute(env, gen);       
        }
    });
}