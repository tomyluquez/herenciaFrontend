export const generateNewOrderNumber = (): number => {
    const timestamp = Date.now(); // Milisegundos desde 1970
    const random = Math.floor(Math.random() * 1000); // Número aleatorio de 3 cifras

    // Concatenamos timestamp con random, por ejemplo: 1718123456789123
    return parseInt(`${timestamp}${random}`);
};