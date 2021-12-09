// =========Все возможные переменные===========================
let size = document.querySelector('.inp-value');
let select = document.querySelector('.select-main');
let percent = document.querySelector('.percent-value');
let orderedArray = [];
let disArr = [];
let reverseArr = [];
let partOrdArr = [];
let arrForDirectSelectionMethod = [];
let firstRes = document.querySelector('.first-res');

// ===============событие онклик============================

function starttosort() {
    switch (select.options[select.selectedIndex].value) {
        case 'Упорядоченная последовательность':
            arrForDirectSelectionMethod = getSortedArr();
            // console.log(arrForDirectSelectionMethod[0]);
            console.log(selectionSort(arrForDirectSelectionMethod[0]));
            console.log(selectionSortMinMax(arrForDirectSelectionMethod[0]));
            let newList = arrForDirectSelectionMethod[1];
            let res = newList.bubbleSort();
            console.log(arrForDirectSelectionMethod[1]);
            // console.log(selectionSort(arrForDirectSelectionMethod[]));
            break;
        case 'Неупорядоченная последовательность':
            arrForDirectSelectionMethod = get_disordered_arr();
            console.log(arrForDirectSelectionMethod[0]);
            // console.log(arrForDirectSelectionMethod[1]);
            console.log(selectionSort(arrForDirectSelectionMethod[0]));
            console.log(selectionSortMinMax(arrForDirectSelectionMethod[0]));
            console.log(arrForDirectSelectionMethod[1].bubbleSort());
            break;
        case 'Упорядоченная последовательность в обратном порядке':
            arrForDirectSelectionMethod = getSortedReverseArr();
            console.log(selectionSort(arrForDirectSelectionMethod[0]));
            console.log(selectionSortMinMax(arrForDirectSelectionMethod[0]));
            // console.log(arrForDirectSelectionMethod[0]);
            // console.log(arrForDirectSelectionMethod[1]);
            // console.log(selectionSort(arrForDirectSelectionMethod));
            break;
        case 'Частично упорядоченная последовательность':
            arrForDirectSelectionMethod = pushPartUpPosl(
                size.value,
                percent.value
            );
            console.log(selectionSort(arrForDirectSelectionMethod[0]));
            console.log(selectionSortMinMax(arrForDirectSelectionMethod[0]));
            // console.log(arrForDirectSelectionMethod[0]);
            // console.log(arrForDirectSelectionMethod[1]);
            // console.log(selectionSort(arrForDirectSelectionMethod));
            break;
    }
}
// ==============Создание односвязного списка=======================
class newNode {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}
class LinkerdList {
    constructor() {
        this.head = null;
        this.tail = null;
    }
    append(data) {
        const node = new newNode(data);
        if (this.tail) {
            this.tail.next = node;
        }
        if (!this.head) {
            this.head = node;
        }
        this.tail = node;
    }
    bubbleSort() {
        let last = this.tail;
        while (last) {
            let node = this.head;
            while (node != last) {
                let next = node.next;
                if (node.value > next.value) {
                    // swap
                    [node.value, next.value] = [next.value, node.value];
                }
                node = next;
            }
            last = last.prev;
        }
    }
}
const orderedList = new LinkerdList();
const disorderedList = new LinkerdList();
const partOrderedList = new LinkerdList();
const orderedReversedList = new LinkerdList();

// =================Создание массивов и заполнение массивов, односвязных списков================================
function getPartOrdArray() {
    for (let i = 0; i < size.value; i++) {
        partOrdArr.push(Math.floor(1 + Math.random() * size.value));
    }
    console.log('начальное состояние массива' + partOrdArr);
    let part = Math.floor((size.value * percent.value) / 100);
    console.log('кусок для сортировки' + part);

    let arrForSort = partOrdArr.splice(0, part);
    console.log('массив для сортировки' + arrForSort);
    arrForSort.sort((a, b) => a - b);
    console.log('отсортированный массив' + arrForSort);
    let newPartOrdArr = arrForSort.concat(partOrdArr);
    console.log('новый массив' + newPartOrdArr);
    for (let i = 0; i < newPartOrdArr.length; i++) {
        partOrderedList.append(newPartOrdArr[i]);
    }
    return [newPartOrdArr, partOrderedList];
}
let pushPartUpPosl = (size, percent) => {
    let size_up_arr = Math.floor((size * percent) / 100);
    //console.log(size_up_arr);
    let arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(0 + Math.random() * 100));
    }
    //console.log("arr ", arr);
    let part_arr = [];
    while (part_arr.length < size_up_arr) {
        let min = Math.min(...arr);
        console.log(min);
        part_arr.push(min);
        let ind = arr.indexOf(min);
        arr.splice(ind, 1);
    }
    //console.log("arr ", arr);
    partOrdArr = part_arr.concat(arr);
    for (let j = 0; j < size; j++) {
        partOrderedList.append(partOrdArr[j]);
        // d_part_up_list.append(partOrdArr[j]);
    }

    let res = [partOrdArr, partOrderedList];
    return res;
};

function getSortedArr() {
    for (let i = 0; i < size.value; i++) {
        orderedArray.push(Math.floor(i * 2 + Math.random() * 2));
    }
    for (let i = 0; i < orderedArray.length; i++) {
        orderedList.append(orderedArray[i]);
    }
    return [orderedArray, orderedList];
}

function getSortedReverseArr() {
    for (let i = 0; i < size.value; i++) {
        reverseArr.push(Math.floor(i * 2 + Math.random() * 2));
    }
    reverseArr.reverse();
    for (let i = 0; i < reverseArr.length; i++) {
        orderedReversedList.append(reverseArr[i]);
    }
    return [reverseArr, orderedReversedList];
}

function get_disordered_arr() {
    for (let i = 0; i < size.value; i++) {
        disArr.push(Math.floor(1 + Math.random() * size.value));
    }
    for (let i = 0; i < disArr.length; i++) {
        disorderedList.append(disArr[i]);
    }

    return [disArr, disorderedList];
}
// ==================для задания процента упорядоченности===================================
function percentappear() {
    if (
        select.options[select.selectedIndex].value ==
        'Частично упорядоченная последовательность'
    ) {
        percent.classList.add('appear');
    } else {
        percent.classList.remove('appear');
    }
}
// =================сортировка методом прямого выбора=========================================================
const selectionSort = (arr) => {
    //классический метод прямого выбора
    let start = performance.now();
    for (let i = 0, l = arr.length, k = l - 1; i < k; i++) {
        let indexMin = i;
        for (let j = i + 1; j < l; j++) {
            if (arr[indexMin] > arr[j]) {
                indexMin = j;
            }
        }
        if (indexMin !== i) {
            [arr[i], arr[indexMin]] = [arr[indexMin], arr[i]];
        }
    }
    let time = performance.now() - start;
    console.log(time);
    // firstRes.value = time;
    return arr;
};
const selectionSortMinMax = (arr) => {
    //метод прямого выбора с одновременным поиском макс и мин
    let minindex = 0,
        maxindex = 0;
    for (let j = 0; j < arr.Length / 2; j++) {
        var min = let.MaxValue;
        var max = 0;
        var tmp = 0;
        for (let i = j; i < arr.Length - j; i++) {
            if (min > arr[i]) {
                min = arr[i];
                minindex = i;
            }
            if (arr[i] > max) {
                max = arr[i];
                maxindex = i;
            }
        }

        tmp = arr[j];
        if (j == maxindex) {
            maxindex = minindex;
        }

        arr[j] = min;
        arr[minindex] = tmp;

        tmp = arr[arr.Length - j - 1];
        arr[arr.Length - j - 1] = max;
        arr[maxindex] = tmp;
    }
    return arr;
};
// =================== для графического результата =========================================
// let speedCanvas = document.getElementById("speedChart");

// Chart.defaults.global.defaultFontFamily = "Lato";
// Chart.defaults.global.defaultFontSize = 18;

// let speedData = {
//     labels: ["0s", "10s", "20s", "30s", "40s", "50s", "60s"],
//     datasets: [
//         {
//             label: "Car Speed (mph)",
//             data: [0, 59, 75, 20, 20, 55, 40],
//         },
//     ],
// };

// let chartOptions = {
//     legend: {
//         display: true,
//         position: "top",
//         labels: {
//             boxWidth: 80,
//             fontColor: "black",
//         },
//     },
// };

// let lineChart = new Chart(speedCanvas, {
//     type: "line",
//     data: speedData,
//     options: chartOptions,
// });
