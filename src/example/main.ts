///<reference path="../tag.ts"/>
import T = liphte.tag;

T.append('template');

console.log();
console.log(
    T.ul(
        {title: "Ambasador"},
        [[{id: "test"}], [{href:"other"}]],
        [[{data: "data-attr"}, {name:"name"}]],
        [[[T.li('Element 1'), T.li('Element 2')]]],
        [[[T.li('Element 3')], [T.li('Element 4')]]],
        [[[T.li('Element 5')], T.li('Element 6')]],
        [[T.li('Element 7')], [T.li('Element 8')]],
        [T.li('Element 9'), T.li('Element 10')],
        [[T.li('Element 11'), T.li('Element 12')]],
        [T.li('Element 13'), T.li('Element 14')],
        T.li('Element 15'), T.li('Element 16')
    )
);

console.log(
    T.template(
        {id: "ul-id"}
    )
);

console.log(
  T.div(
      T.br({id: 'nextLineBreak'},'test'),
      T.area('test'),
      T.img('test')
  )
);