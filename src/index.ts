import * as algokit from '@algorandfoundation/algokit-utils';

async function main() {
    const algorand = algokit.AlgorandClient.defaultLocalNet();

    // ===== Crear dos cuentas =====
    const alice = algorand.account.random()
    const bob = algorand.account.random();

    console.log("Alice's Address:", alice.addr);
    console.log("bob's Address:", bob.addr);

    // ===== Mostrar información de la cuenta de Alice =====
    console.log("Alice's Account:", await algorand.account.getInformation(alice.addr));

    console.log("bob's Account:", await algorand.account.getInformation(alice.addr));
    
}

main();