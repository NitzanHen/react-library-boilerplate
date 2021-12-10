import './styles.module.scss';

export interface B {
  x: number;
}

export const print = (b: B) => console.log(b);

print({ x: 3 })

//console.log(classes);


export {}