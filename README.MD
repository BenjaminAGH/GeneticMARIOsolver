

# MARIO SOLVER - Aplicación Algoritmos Genéticos

Implementación en JavaScript que busca solucionar el clásico juego de Mario Bros ocupando algoritmos genéticos.

## 🌟 Funcionalidades principales

### 📋 Criterios de Implementación
El siguiente programa recibe como Input una matriz (en
un archivo de texto llamado world.txt, donde las 2 primeras lı́neas son el largo y el ancho y luego un entero por
cada coordenada de la matriz), llena de enteros entre 0 y 3, donde:

- 0 - representa casilla libre: Mario puede avanzar a esa casilla.
- 1 - representa casilla impenetrable: Mario no puede avanzar a esa casilla.
- 2 - representa enemigo: Mario muere si avanza a esa casilla (excepto por arriba).
- 3 - representa la posición de Mario para comenzar (única, debe estar en coordenada 0 de x).

### 🛠 Funcionamiento del Juego
El juego consiste en otorgar a Mario un set de intrucciones que representan su movimiento en la matriz, siendo estos:
1. **D:** moverse un espacio a la derecha. Representa un movimiento +1 en eje x.
2. **I:** moverse un espacio a la Izquierda. Representa un movimiento -1 en eje x.
3. **S:** Mario realiza un salto alto. Representa una cadena de movimientos:

     **+1 eje y → +1 eje y → +1 eje x → -1 eje y → -1 eje y.**
4. **J:** Mario realiza un salto largo. Representa una cadena de movimientos:

    **+1 eje y → +1 eje x → +1 eje x → +1 eje x → -1 eje y.**


#### `EJEMPLO:`

```javascript
setInstrucciones = D J D D S D D D D D D S D
```
### 🛠 Algoritmo Genético
El algoritmo genético genera poblaciones de soluciones representadas por instrucciones aleatorias. Evalúa su aptitud calculando la distancia desde el punto final tras ejecutar las instrucciones, selecciona las mejores como padres y las combina para iterar hasta minimizar la distancia final o alcanzar un límite.


---

## 📝 Uso del Proyecto

1. Clona este repositorio en tu máquina local.
2. Ejecuta el archivo `main.js` en un entorno de Node.js.
3. Ejecuta el archivo main.js proporcionando los parámetros del algoritmo genético desde la terminal:
    - **Tamaño de la población (`populationSize`):** Define cuántos individuos habrá en cada generación.
    - **Número de generaciones (`generations`):** Establece cuántas iteraciones realizará el algoritmo.
    - **Tasa de mutación (`mutationRate`):** Especifica la probabilidad de mutación en cada individuo.

### Ejecución básica:

```bash
npm start -- <populationSize> <generations> <mutationRate>
```
---

## 📖 Referencias

- [John Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) - Información sobre las reglas y los patrones del juego.
---