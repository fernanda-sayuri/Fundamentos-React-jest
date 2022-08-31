import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from ".";

describe('<Button />', () => {
    it('should render the button with the text "Load more"', () => {
        render(<Button text="Load more" />);

        expect.assertions(1);

        const button = screen.getByRole('button', {name: /load more/i });
        expect(button).toBeInTheDocument();
    });

    it('should call function on button click"', () => {
        //fn simula eventos
        const fn = jest.fn();
        render(<Button text="Load more" onClick={fn} />);
        
        //checa se botão possui texto "load more"
        const button = screen.getByRole('button', {name: /load more/i });
        userEvent.click(button);
        
        //checa quantas vezes determinada função foi chamada
        //ex. se clicou uma vez deveria chamar apenas uma vez a função
        expect(fn).toHaveBeenCalledTimes(1);
    });
    
    it('should be disabled when disabled is true', () => {
        render(<Button text="Load more" disabled={true} />);

        //checa se botão está desativado quand estiver com disabled
        const button = screen.getByRole('button', {name: /load more/i });
        
        expect(button).toBeDisabled();
    });

    it('should be disabled when disabled is false', () => {
        render(<Button text="Load more" disabled={false} />);

        //checa se botão está desativado quand estiver com disabled
        const button = screen.getByRole('button', {name: /load more/i });
        
        expect(button).toBeEnabled();
    });

    it('should match snapshot', () => {
        const fn = jest.fn();
        const {container} = render(<Button text="Load more" onClick={fn} disabled={false} />);
        expect(container.firstChild).toMatchSnapshot();
    })
})
  