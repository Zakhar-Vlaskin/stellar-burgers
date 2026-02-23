import { TConstructorIngredient, TIngredient } from '@utils-types';

import {
  addIngredient,
  constructorReducer,
  moveIngredientDown,
  moveIngredientUp,
  removeIngredient,
  setBun
} from './constructorSlice';

const bun: TIngredient = {
  _id: 'bun-1',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
};

const mainIngredient: TConstructorIngredient = {
  _id: 'main-1',
  id: 'main-item-1',
  name: 'Котлета из метеорита',
  type: 'main',
  proteins: 800,
  fat: 400,
  carbohydrates: 120,
  calories: 4200,
  price: 3000,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

const sauceIngredient: TConstructorIngredient = {
  _id: 'sauce-1',
  id: 'sauce-item-1',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
};

describe('constructorSlice reducer', () => {
  it('должен добавлять ингредиент в начинку', () => {
    const stateWithBun = constructorReducer(undefined, setBun(bun));
    const state = constructorReducer(stateWithBun, addIngredient(mainIngredient));

    expect(state.bun).toEqual(bun);
    expect(state.ingredients).toEqual([mainIngredient]);
  });

  it('должен удалять ингредиент из начинки', () => {
    const stateWithIngredients = constructorReducer(
      constructorReducer(undefined, addIngredient(mainIngredient)),
      addIngredient(sauceIngredient)
    );

    const state = constructorReducer(
      stateWithIngredients,
      removeIngredient(mainIngredient.id)
    );

    expect(state.ingredients).toEqual([sauceIngredient]);
  });

  it('должен менять порядок ингредиентов в начинке', () => {
    const stateWithIngredients = constructorReducer(
      constructorReducer(undefined, addIngredient(mainIngredient)),
      addIngredient(sauceIngredient)
    );

    const movedUpState = constructorReducer(stateWithIngredients, moveIngredientUp(1));
    expect(movedUpState.ingredients).toEqual([sauceIngredient, mainIngredient]);

    const movedDownState = constructorReducer(movedUpState, moveIngredientDown(0));
    expect(movedDownState.ingredients).toEqual([mainIngredient, sauceIngredient]);
  });
});
