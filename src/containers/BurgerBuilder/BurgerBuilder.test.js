import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapte from 'enzyme-adapter-react-16';
import {BurgerBuilder} from './BurgerBuilder';
import BuilderControls from '../../components/Burger/BuilderControls/BuilderControls';

configure({adapter : new Adapte()});
let wrapper;

describe('<BurgerBuilder />', ()=> {

    beforeEach(() => {
    wrapper= shallow(<BurgerBuilder onInitIngredient ={ ()=>{}}/>)
    });

    //Ahora viene la prueba que quiero realizar
    it('should render <BuilderControls/> when receiving ingredients', ()=>{
        wrapper.setProps({ing: {salad: 0}});
        expect(wrapper.find(BuilderControls)).toHaveLength(1);
    })
})