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
    constructor(data, index, next__ = null) {
        this.data = data;
        this.next_ = next__;
        this.index = index
    }
}

class LinkerdList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.append(-Infinity)
        this.len = 0
    }

    append(data) {
        const node = new newNode(data, this.len);
        if (this.tail) {
            this.tail.next_ = node;
        }
        if (!this.head) {
            this.head = node;
        }
        this.tail = node;
        this.len++;
    }

    * for_(current_item = null) {
        // check it for more details: https://learn.javascript.ru/generators
        if (!current_item) {
            if (this.head.data === -Infinity) {
                current_item = this.head.next_;
            } else {
                current_item = this.head
            }

        }
        // let next_item = current_item.next_
        // let deep = 0
        while (current_item !== null) {
            yield current_item
            current_item = current_item.next_

        }
    }

    * for_before_len(max_iterations, current_item = null) {
        // check it for more details: https://learn.javascript.ru/generators
        if (!current_item) {
            if (this.head.data === -Infinity) {
                current_item = this.head.next_;
            } else {
                current_item = this.head
            }

        }
        let len_ = 1
        while (len_ <= max_iterations && current_item !== null) {
            yield current_item
            current_item = current_item.next_
            len_ += 1

        }
    }

    // static move_items(one, two, before_one = {}, before_two = {}){
    //     // check it for more details: https://learn.javascript.ru/static-properties-methods
    //     console.log(before_one.data, one.data, one.next_.data, "|", before_two.data,  two.data, two.next_.data, );
    //
    //     let last_one_tail = one.next_;
    //     let last_two_tail = two.next_;
    //
    //
    //
    //     one.next_ = last_two_tail;
    //     two.next_ = last_one_tail;
    //
    //     before_one.next_ = two;
    //     before_two.next_ = one
    //     console.log(before_one.data, before_one.next_.data, before_one.next_.next_.data, "|", before_two.data,  before_two.next_.data, before_two.next_.next_.data, );
    //     return [one, two];
    // }
    static move_items(one, two) {
        if (one && two) {
            [one.data, two.data] = [two.data, one.data];
        }
        return [one, two];

    }

    copy() {
        const new_list = new LinkerdList()
        for (let item of this.for_()) {
            new_list.append(item.data)
        }
        return new_list
    }

    bubbleSort() {
        let last = this.tail;
        while (last) {
            let node = this.head;
            while (node != last) {
                let next_ = node.next_;
                if (node.value > next_.value) {
                    // swap
                    [node.value, next_.value] = [next_.value, node.value];
                }
                node = next_;
            }
            last = last.prev;
        }
    }
}

const selectionSort2 = (list_) => {
    let last_start_item = list_.head
    for (let start_item of list_.for_()) {
        let min_ = {data: Infinity};
        let before_min = {}
        // console.log(start_item.data)
        let last_item = last_start_item;
        for (let item of list_.for_(start_item)) {
            if (min_.data > item.data) {
                min_ = item
                before_min = last_item
            }
            last_item = item
        }
        // LinkerdList.move_items(start_item, min_, last_start_item, before_min)
        LinkerdList.move_items(start_item, min_)
        // console.log([...list_.for_()].map(i => i.data), "|", min_.data)
        last_start_item = min_;

    }
    return list_
}

const minMaxSelectSort2 = (list_) => {
    // let last_start_item = list_.head
    let count = list_.len
    for (let start_item of list_.for_before_len(list_.len / 2)) {
        let min_ = {data: Infinity};
        let max_ = {data: -Infinity};
        // console.log(start_item.data)
        let old_item = null
        for (let item of list_.for_before_len(count, start_item)) {
            // console.log(item)
            if (min_.data > item.data) {
                min_ = item
            }
            if (item.data >= max_.data) {
                max_ = item
            }
            old_item = item
        }
        let finish_item = old_item

        count -= 2

        // LinkerdList.move_items(start_item, min_, last_start_item, before_min)
        if (finish_item && min_ && start_item && max_ && (
            min_.index === finish_item.index) && (
                start_item.index === max_.index)) {
            LinkerdList.move_items(max_, min_);
            // console.log([...list_.for_()].map(i => i.data), "|", "min is -", min_.data, 'max is -', max_.data)
            continue
        }else if (finish_item && min_ && min_.index === finish_item.index) {
            finish_item = min_;
            // console.log('--*1')
        } else if (start_item && max_ && start_item.index === max_.index) {
            max_ = min_;
            // console.log('--*2')
        }
        // console.log(start_item, min_)
        // console.log([...list_.for_()].map(i => i.data), "|", min_.data, max_.data)

        LinkerdList.move_items(start_item, min_)
        LinkerdList.move_items(finish_item, max_)
        // console.log([...list_.for_()].map(i => i.data), "|", "min is -", min_.data, 'max is -', max_.data)
        // last_start_item = min_;
    }
    return list_
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



const test_function = (arr) => {
    let obj_ = new LinkerdList()
    arr.map(i => obj_.append(i));
    const my_sorted_arr_1 = [...selectionSort2(obj_.copy()).for_()].map(i => i.data)
    const my_sorted_arr_2 = [...minMaxSelectSort2(obj_.copy()).for_()].map(i => i.data)
    let sorted_arr = arr.map(i => i);
    sorted_arr.sort((a, b) => a - b)
    if (!sorted_arr.every ((el, ind) => (el === my_sorted_arr_1[ind]) && (el === my_sorted_arr_2[ind]))){
        console.log(arr)
        console.log(sorted_arr)
        console.log(my_sorted_arr_1)
        console.log(my_sorted_arr_2)
        throw 'неправильно отсортировал'
    }
}
const testing = () => {

    let min_len = 0
    let max_len = 100
    let min_item = -2000
    let max_item = 1000
    let index_;
    for (index_ = 0; index_ < 100; ++index_) {
        let arr = []
        let len_ = Math.round(Math.random() * (max_len - min_len)) + min_len
        for (i = 0; i < len_; ++i) {
            arr.push(Math.round(Math.random() * (max_item - min_item)) + min_item)
        }
        test_function(arr)
        console.log('тест', index_ + 1)
    }
    console.log('тестирование прошло успешно')

}

testing()

// arr = [5, -5, -6];
// let obj_ = new LinkerdList()
// arr.map(i => obj_.append(i));
// // const my_sorted_arr_1 = [...selectionSort2(obj_.copy()).for_()].map(i => i.data)
// const my_sorted_arr_2 = [...minMaxSelectSort2(obj_.copy()).for_()].map(i => i.data)
// console.log(my_sorted_arr_2)
