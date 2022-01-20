console.log('jlsad  ');
console.log('jlsad <  >  ');

var maps: Map<string, number[]> = new Map();

function subscribe(topic: string, subscriber: number): void {
  const currentSubscriptions = maps.get(topic);
  console.log(`masp.get : ${currentSubscriptions}`);

  if (currentSubscriptions) {
    currentSubscriptions.push(subscriber);
    maps.set(topic, currentSubscriptions);
    console.log(`subscription.push : ${currentSubscriptions}`);
    console.log(`masp.get despues del push : ${maps.get(topic)}`);
  } else {
    maps.set(topic, [subscriber]);
    console.log(`masp.get , en via falsa : ${maps.get(topic)}`);
  }
  console.log(`masp.get , despues de la condicion : ${maps.get(topic)}`);
}

subscribe('uno', 2);

console.log('segundda ejecucion');

subscribe('uno', 3);
subscribe('uno', 1);
subscribe('uno', 4);
