import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapte from 'enzyme-adapter-react-16';
import NavegationItems from './NavegationItems';
import NavegationItem from '../NavegationItem/NavegationItem';

configure({adapter : new Adapte()});

describe('<NavegationItems />', ()=>{
    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(<NavegationItems />);
    })
    it('should render two <NavegationItem /> elements if not authenticated', ()=>{
        expect(wrapper.find(NavegationItem)).toHaveLength(2);
    });

    it('should render three <NavegationItem /> elements if  authenticated',() =>{
      //  wrapper = shallow (<NavegationItems isAuthenticated/>);
      wrapper.setProps({isAuthenticated: true})
        expect (wrapper.find(NavegationItem)).toHaveLength(3)
    });
    it('should render three <NavegationItem /> elements if  authenticated',() =>{
        wrapper.setProps({isAuthenticated: true})
        expect (wrapper.contains(<NavegationItem link="/logout">Logout</NavegationItem>)).toEqual(true)
      });
});