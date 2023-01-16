import Form from "./Form";
import {getByTestId, render, RenderResult, screen} from '@testing-library/react';


let documentBody: RenderResult;


describe('Form Page', () => {
    beforeEach(() => {
        documentBody  = render(<Form/>);
    })



    it('test form input', () => {
        expect(screen.getAllByTestId('PokeApiInput')).toBeInTheDocument();
    });

});