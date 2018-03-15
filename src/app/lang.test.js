import {localize_number, to_en, to_fa} from './lang';

import MockStorage from 'Tests/mock-storage';



describe('Localization Module', ()=>{
   it('should convert english numbers to persian numbers', () =>{
       expect(to_fa('1234567890')).toEqual('۱۲۳۴۵۶۷۸۹۰');
   });


    it('should convert persian numbers to english numbers', () =>{
        expect(to_en('۱۲۳۴۵۶۷۸۹۰')).toEqual('1234567890');
    });

});