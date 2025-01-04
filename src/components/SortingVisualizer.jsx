import { useState, useEffect } from 'react';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [arraySize, setArraySize] = useState(50);
  const [speed, setSpeed] = useState(50);

  // Generate random array
  const generateArray = () => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 400) + 5);
    }
    setArray(newArray);
  };

  useEffect(() => {
    generateArray();
  }, [arraySize]);

  // Helper function for delay
  const delay = async () => {
    await new Promise(resolve => setTimeout(resolve, 100 - speed));
  };

  // Bubble Sort
  const bubbleSort = async () => {
    setSorting(true);
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await delay();
        }
      }
    }
    setSorting(false);
  };

  // Selection Sort
  const selectionSort = async () => {
    setSorting(true);
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      setArray([...arr]);
      await delay();
    }
    setSorting(false);
  };

  // Insertion Sort
  const insertionSort = async () => {
    setSorting(true);
    const arr = [...array];
    const n = arr.length;

    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
        setArray([...arr]);
        await delay();
      }
      arr[j + 1] = key;
      setArray([...arr]);
      await delay();
    }
    setSorting(false);
  };

  // Merge Sort
  const merge = async (arr, l, m, r) => {
    const n1 = m - l + 1;
    const n2 = r - m;
    const L = arr.slice(l, m + 1);
    const R = arr.slice(m + 1, r + 1);
    
    let i = 0, j = 0, k = l;
    
    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      setArray([...arr]);
      await delay();
      k++;
    }
    
    while (i < n1) {
      arr[k] = L[i];
      i++;
      k++;
      setArray([...arr]);
      await delay();
    }
    
    while (j < n2) {
      arr[k] = R[j];
      j++;
      k++;
      setArray([...arr]);
      await delay();
    }
  };

  const mergeSortHelper = async (arr, l, r) => {
    if (l < r) {
      const m = Math.floor(l + (r - l) / 2);
      await mergeSortHelper(arr, l, m);
      await mergeSortHelper(arr, m + 1, r);
      await merge(arr, l, m, r);
    }
  };

  const mergeSort = async () => {
    setSorting(true);
    const arr = [...array];
    await mergeSortHelper(arr, 0, arr.length - 1);
    setSorting(false);
  };

  // Quick Sort
  const partition = async (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await delay();
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    await delay();
    return i + 1;
  };

  const quickSortHelper = async (arr, low, high) => {
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSortHelper(arr, low, pi - 1);
      await quickSortHelper(arr, pi + 1, high);
    }
  };

  const quickSort = async () => {
    setSorting(true);
    const arr = [...array];
    await quickSortHelper(arr, 0, arr.length - 1);
    setSorting(false);
  };

  // Heap Sort
  const heapify = async (arr, n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setArray([...arr]);
      await delay();
      await heapify(arr, n, largest);
    }
  };

  const heapSort = async () => {
    setSorting(true);
    const arr = [...array];
    const n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      setArray([...arr]);
      await delay();
      await heapify(arr, i, 0);
    }
    setSorting(false);
  };

  return (
    <div className="container mx-auto p-4 ">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-4">Sorting Visualizer</h1>
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-blue-600"
            onClick={generateArray}
            disabled={sorting}
          >
            Generate New Array
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-green-600"
            onClick={bubbleSort}
            disabled={sorting}
          >
            Bubble Sort
          </button>
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-purple-600"
            onClick={selectionSort}
            disabled={sorting}
          >
            Selection Sort
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-red-600"
            onClick={insertionSort}
            disabled={sorting}
          >
            Insertion Sort
          </button>
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-yellow-600"
            onClick={mergeSort}
            disabled={sorting}
          >
            Merge Sort
          </button>
          <button
            className="bg-pink-500 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-pink-600"
            onClick={quickSort}
            disabled={sorting}
          >
            Quick Sort
          </button>
          <button
            className="bg-indigo-500 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-indigo-600"
            onClick={heapSort}
            disabled={sorting}
          >
            Heap Sort
          </button>
        </div>
        <div className="flex justify-center gap-8">
          <div>
            <label className="block mb-2">Array Size:</label>
            <input
              type="range"
              min="10"
              max="100"
              value={arraySize}
              onChange={(e) => setArraySize(parseInt(e.target.value))}
              disabled={sorting}
              className="w-48"
            />
            <span className="ml-2">{arraySize}</span>
          </div>
          <div>
            <label className="block mb-2">Speed:</label>
            <input
              type="range"
              min="0"
              max="95"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              disabled={sorting}
              className="w-48"
            />
            <span className="ml-2">{speed}</span>
          </div>
        </div>
      </div>
      <div className="flex items-end justify-center gap-1 h-[450px]">
        {array.map((value, idx) => (
          <div
            key={idx}
            className="w-2 bg-blue-500"
            style={{ height: `${value}px` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SortingVisualizer; 