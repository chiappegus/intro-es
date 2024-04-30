import * as algokit from '@algorandfoundation/algokit-utils';

async function main() {
    console.log('Hola Mundo!')
    const algorand =algokit.AlgorandClient.defaultLocalNet();
    console.log('hola todo bien: npm install acordate  y del algokit localnet !!!) ')
    console.log('npx tsx ./src/index.ts')
      // ===== Crear dos cuentas =====
      const alice = algorand.account.random()
      const bob = algorand.account.random();

      console.log("Alice's Address:", alice.addr);
      console.log("bob's Address:", bob.addr);
  
      // ===== Mostrar información de la cuenta de Alice =====
      console.log("Alice's Account:", await algorand.account.getInformation(alice.addr));
  
      console.log("bob's Account:", await algorand.account.getInformation(bob.addr));


      // ahora vamos a darle algos a Alice 
      // en Algorand por suerte se usa un dispenser de algos.

      const dispenser = await algorand.account.dispenser();

      await algorand.send.payment({

         sender:dispenser.addr,
         receiver: alice.addr,
         amount :algokit.algos(10),
      }
      )

     // ===== Mostrar información de la cuenta de Alice =====
     console.log("Alice's Account:", await algorand.account.getInformation(alice.addr));
     /*
      ahora vamos a enviarle un asset a bob , primero vamos a crearle el asset a alice
     */



    
     

      

}

main();