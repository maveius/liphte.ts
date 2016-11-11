///<reference path="../tag.ts"/>

let T = liphte.tag;

T.append('template');

console.log();
console.log(
    T.ul(
        T.li( {id: 'element-item'},
            T.i(
                T.img(
                    {id: 'test', '*Ng-For': 'cls', class: 'btn btn-default', src: 'http://maveius.pl/'}
                ),
                T.template('X')
            )
        )
    )
);