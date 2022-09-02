import { render, screen } from "@testing-library/react";
import { PostCard } from ".";

const mock = {
    title: 'title 1',
    body: 'body 1',
    id: 1,
    cover: 'img/img.png'
}

describe('<PostCard />', () => {

    it('should render PostCard correctly', () => {
        // const {debug} = render(<PostCard {...mock} />);
        // //mostra como está o componente que estamos renderizando no teste
        // //faz um console.log no component
        // debug();

        render(<PostCard {...mock} />);
        //name: /title 1/i} = expressão regular, verifica se essa texto pertence 
        expect(screen.getByRole('img', {name: /title 1/i})).toHaveAttribute('src', 'img/img.png');
        //name: 'title 1'} = verificar se o texto é exatamente esse
        //usamos heading para h1 até h6
        expect(screen.getByRole('heading', {name: 'title 1'})).toBeInTheDocument();
        //como 'body 1' está dentro de um <p> buscamos pelo texto
        expect(screen.getByText('body 1')).toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const {container} = render(<PostCard {...mock} />);
        expect(container.firstChild).toMatchSnapshot();
    })
    
});
  