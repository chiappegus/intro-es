import * as algokit from '@algorandfoundation/algokit-utils';
import AlgodClient from 'algosdk/dist/types/client/v2/algod/algod';


async function main() {
  console.log('Hola Mundo!')
  const algorand = algokit.AlgorandClient.defaultLocalNet();
  console.log('hola todo bien: npm install acordate  y del algokit localnet !!!) ')
  console.log('npx tsx ./src/index.ts')
  // ===== Crear dos cuentas =====
  const alice = algorand.account.random()
  const bob = algorand.account.random();



 
 
  console.log("Alice's Address:", alice.addr);
  console.log("bob's Address:", bob.addr);

  // ===== Mostrar información de la cuenta de Alice =====

  // console.log("Alice's Account:", await algorand.account.getInformation(alice.addr));
  // console.log("bob's Account:", await algorand.account.getInformation(bob.addr));


  // ahora vamos a darle algos a Alice 
  // en Algorand por suerte se usa un dispenser de algos.

  const dispenser = await algorand.account.dispenser();

  await algorand.send.payment({

    sender: dispenser.addr,
    receiver: alice.addr,
    amount: algokit.algos(0.201),
  }
  )

  // ===== Mostrar información de la cuenta de Alice =====


  //  console.log("Alice's Account:", await algorand.account.getInformation(alice.addr));


  //  primero vamos a crearle el asset a alice


  /*
   ahora vamos a enviarle un asset a bob 
  */
  const result = await algorand.send.assetCreate({
    sender: alice.addr,
    total: 100n,
    })

  assetId = BigInt(result.confirmation.assetIndex!)
  console.log('Numero del asset creado ', assetId)

  console.log("Balance Alice asset:", await algorand.account.getAssetInformation(alice.addr, assetId));



  // const result = await algorand.send.assetCreate({
  //   sender: alice.addr,
  //   total: 100n,
  //   })

  // assetId = BigInt(result.confirmation.assetIndex!)
  // console.log('Numero del asset creado ', assetId)

  console.log("Balance Alice asset:", await algorand.account.getAssetInformation(alice.addr, assetId));

  //  console.log("Alice asset:", BigInt(result.confirmation.assetIndex!));
  //  console.log("Alice  info del asset:", (result.confirmation));
  //  console.log("Alice's Account:", await algorand.account.getInformation(alice.addr));


  //  amount: 201000,
  //  amountWithoutPendingRewards: 201000,
  //  minBalance: 100000,

  // address: 'AGG4CLFVUCPIQ72F765GEYK5BGKVPW6UNAYXU2AJX5KUZ4ZF2E2GDHH35A',
  // amount: 200000,
  // amountWithoutPendingRewards: 200000,
  // minBalance: 200000,


  // ahora si le enviamos el asset a bob si en realidad no tenemos nada
  // alice no va a poder enviar , ya que cada transcion es de 0.01 algo y a la vez
  // a bob al enviarle los asset va a tener dos porblemas primero tener minBalance: 200000
  // osea le fata 0.2 algos y a la vez tiene que tener dos transacciones , ya tiene que tener
  // un option (osea acepta el assets de alice y luego lo almacena )
  // hay que ver si son dos transacciones optin mas recibir , y alice tambien tiene que 
  // gastar  2 transaccioness ?? lo vamos averiguar


  // trnasf sin optin y sin monto de bob y alice  con el min limite.

  // tiro error del optin :
  // response: {
  //   body: {
  //     message: 'TransactionPool.Remember: transaction : 
  //     receiver error: must optin, asset 1022 missing from '



  // ahora vamos hacer el optin ::





  ///deberia dar error , si o si de bob por el mrb minimo. y no tiene algo para la 
  //transaccion , hay que ver quien la paga , alice esta en 00000.
  // con 0.001 cubre el optin pero no tiene el minimo .

  // con  amount :algokit.algos(0.101),
  //da ext: '{"message":"TransactionPool.Remember: 
  //  transaction : account  balance 100000 below min 200000 (1 assets)"}\n',
  // poner :  amount :algokit.algos(0.201),
  // vamos  a ver que pasa con alice 

  await algorand.send.payment({

    sender: dispenser.addr,
    receiver: bob.addr,
    amount: algokit.algos(0.201),
  }
  )


  console.log("-------HACIENDO assetOptIn---------")

  await algorand.send.assetOptIn({
    sender: bob.addr,
    assetId
  })

  // error  : 

  //exacto falla ya que le falta algo para realizar el optin ::
  //  tried to spend {1000})"}\n', =>> 0.001 algo .


  // alice al no tener fondos falla para hacer la transferencia !!! 
  // del asset bob's ojo
  //veo de agregarle un 0.001  , excelente se hizo todo.


  await algorand.send.payment({

    sender: dispenser.addr,
    receiver: alice.addr,
    amount: algokit.algos(0.002),
  }
  )






  //////////////////


  console.log('inicio de assetTransfer ');
  await algorand.send.assetTransfer({
    sender: alice.addr,
    receiver: bob.addr,
    assetId,
    amount: 1n,

  })
  console.log('fin  de assetTransfer ')



  



  console.log("Balance Alice asset:", await algorand.account.getAssetInformation(alice.addr, assetId));
  console.log("Balance Bob  asset:", await algorand.account.getAssetInformation(bob.addr, assetId));


  // atomic transferencia , ahora alice se arrepiente de pasarle el Asset a Bob
  // se lo pide a cambio de un 0.1 algo . para que se de manera simultanea
  //se tiene  que cumplir el pago de alice y el envio de asset a alice 
  // si algo de eso no se cumple no se hace.
  // tener en cuanta que los algos estan justos.

  // console.log('ahora atomic transf')

  // await algorand.newGroup()
  //   .addPayment({
  //       sender:alice.addr,
  //       receiver:bob.addr,
  //       amount:algokit.algos(1)
  //   })
  //   .addAssetTransfer({
  //     sender:bob.addr,
  //     receiver:alice.addr,
  //     assetId,
  //     amount:1n,
  //   })
  //   .execute()

  //   console.log('OK TRANSF  atomic transf')

  //   console.log("Balance Alice asset:",await algorand.account.getAssetInformation(alice.addr,assetId) );
  //   console.log("Balance Bob  asset:",await algorand.account.getAssetInformation(bob.addr,assetId) );





  //en el anterior no hay plata!!  tried to spend {1000000})"}\n' 
  // alice va a necesita para el paso otros 1_000.000 o  1 algos mas 
  // no solamente es el algo sino el 0.001 de transaccion tanto para alice 
  //como bob pero ojo que a bob primero le llega el algo?? y con eso descuenta el
  // 0,001 de transaccion??


  console.log('ahora atomic transf')


  /// algos 1

  await algorand.send.payment({

    sender: dispenser.addr,
    receiver: alice.addr,
    amount: algokit.algos(8.002),
  }
  )

  algorand.newGroup()
    .addPayment({
      sender: alice.addr,
      receiver: bob.addr,
      amount: algokit.algos(6.001)
    })
    .addAssetTransfer({
      sender: bob.addr,
      receiver: alice.addr,
      assetId,
      amount: 1n,
    })
    .execute()


 


  console.log('OK TRANSF  atomic transf')

  // console.log('--------------ALICE----------------')
  // console.log("Balance Alice amount:", (await algorand.account.getInformation(alice.addr)).amount);
  // console.log("Balance Alice minBalance:", (await algorand.account.getInformation(alice.addr)).minBalance);
  // console.log('--------------BOB----------------')
  // console.log("Balance BOB amount:", (await algorand.account.getInformation(bob.addr)).amount);
  // console.log("Balance BOB minBalance:", (await algorand.account.getInformation(bob.addr)).minBalance);



  // console.log("Balance Alice asset:", await algorand.account.getAssetInformation(alice.addr, assetId));
  // console.log("Balance Bob  asset:", await algorand.account.getAssetInformation(bob.addr, assetId));
  // console.log('--------------ALICE----------------')
  // console.log("Balance Alice asset:",await algorand.account.getInformation(alice.addr,assetId) );
  // console.log('--------------BOB----------------')
  // console.log("Balance BOB asset:",await algorand.account.getInformation(bob.addr,assetId))
  // console.log('--------------ALICE----------------')
  // console.log("Balance Alice asset:",await algorand.account.getInformation(alice.addr,assetId) );
  // console.log('--------------BOB----------------')
  // console.log("Balance BOB asset:",await algorand.account.getInformation(bob.addr,assetId))

// console.log('ahora atomic transf')

// const dispenser1 = await algorand.account.dispenser();
// await algorand.send.payment({

//   sender: dispenser1.addr,
//   receiver: alice.addr,
//   amount: algokit.algos(0.002),
// }
// )

  // await algorand.newGroup()
  //   .addPayment({
  //       sender:bob.addr,
  //       receiver:alice.addr,
  //       amount:algokit.algos(0.8)
  //   })
  //   .addAssetTransfer({
  //     sender:alice.addr,
  //     receiver:bob.addr,
  //     assetId,
  //     amount:1n,
  //   })
  //   .execute()

  //   console.log('OK TRANSF  atomic transf')

  //   console.log('OK TRANSF  atomic transf')

  //   console.log('--------------ALICE----------------')
  //   console.log("Balance Alice amount:", (await algorand.account.getInformation(alice.addr)).amount);
  //   console.log("Balance Alice minBalance:", (await algorand.account.getInformation(alice.addr)).minBalance);
  //   console.log('--------------BOB----------------')
  //   console.log("Balance BOB amount:", (await algorand.account.getInformation(bob.addr)).amount);
  //   console.log("Balance BOB minBalance:", (await algorand.account.getInformation(bob.addr)).minBalance);
  //   console.log("Balance Alice asset:", await algorand.account.getAssetInformation(alice.addr, assetId));
  //   console.log("Balance Bob  asset:", await algorand.account.getAssetInformation(bob.addr, assetId));


console.log('cerrando el min de bod')
    await algorand.send.assetTransfer({
      sender:bob.addr,
      receiver:alice.addr,
      assetId,
      amount :0n,
      closeAssetTo:alice.addr,
    })

    console.log('--------------ALICE----------------')
    console.log("Balance Alice amount:", (await algorand.account.getInformation(alice.addr)).amount);
    console.log("Balance Alice minBalance:", (await algorand.account.getInformation(alice.addr)).minBalance);
    console.log('--------------BOB----------------')
    console.log("Balance BOB amount:", (await algorand.account.getInformation(bob.addr)).amount);
    console.log("Balance BOB minBalance:", (await algorand.account.getInformation(bob.addr)).minBalance);
    // console.log("Balance Alice asset:", await algorand.account.getAssetInformation(alice.addr, assetId));
    // console.log("Balance Bob  asset:", await algorand.account.getAssetInformation(bob.addr, assetId));
   
    await algorand.send.payment({

      sender: dispenser.addr,
      receiver: alice.addr,
      amount: algokit.algos(10.0009),
    }
    )
    console.log('--------------ALICE----------------')
    console.log("Balance Alice amount:", (await algorand.account.getInformation(alice.addr)).amount);
    console.log("Balance Alice minBalance:", (await algorand.account.getInformation(alice.addr)).minBalance);
    
}

main();