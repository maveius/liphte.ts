///<reference path="../tag.ts"/>

let T = liphte.tag;

T.append('template');

console.log();
console.log(
    T.ul(
        {title: "Ambasador"},
        [[{id: "test"}], [{href:"other"}]],
        [[{data: "data-attr"}, {name:"name"}]],
        [[['<li>Element 1</li>', '<li>Element 2</li>']]],
        [[['<li>Element 3</li>'], ['<li>Element 4</li>']]],
        [[['<li>Element 5</li>'], '<li>Element 6</li>']],
        [['<li>Element 7</li>'], ['<li>Element 8</li>']],
        ['<li>Element 9</li>', '<li>Element 10</li>'],
        [['<li>Element 11</li>', '<li>Element 12</li>']],
        ['<li>Element 13</li>', '<li>Element 14</li>'],
        '<li>Element 15</li>', '<li>Element 16</li>'
    )
);
