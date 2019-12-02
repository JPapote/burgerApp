import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapte from 'enzyme-adapter-react-16';
import NavegationItems from './NavegationItems';
import NavegationItem from '../NavegationItem/NavegationItem';

configure({adapter : new Adapte()});

describe('<NavegationItems />', ()=>{
    it('should render two <NavegationItem /> elements is authenticated', ()=>{
       const wrapper = shallow(<NavegationItems/>);
        expect(wrapper.find(NavegationItem)).toHaveLength(2);
    });
});