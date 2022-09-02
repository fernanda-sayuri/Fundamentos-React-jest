import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Home } from '.';
import userEvent from '@testing-library/user-event';

const handlers = [
    rest.get('*jsonplaceholder.typicode.com*', async (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    userId: 1,
                    id: 1,
                    title: 'title1',
                    body: 'body1',
                    url: 'img1.jpg',
                },
                {
                    userId: 2,
                    id: 2,
                    title: 'title2',
                    body: 'body2',
                    url: 'img1.jpg',
                },
                {
                    userId: 3,
                    id: 3,
                    title: 'title3',
                    body: 'body3',
                    url: 'img3.jpg',
                },
            ]),
        );
    }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
    //inicia server mock api
    beforeAll(() => {
        server.listen();
    });

    //reseta server a cada chamada
    afterEach(() => server.resetHandlers());

    //após todas as chamadas desliga server
    afterAll(() => {
        server.close();
    });

    it('should render search, posts and load more', async () => {
        render(<Home />);
        const noMorePosts = screen.getByText('Não existem posts =(');

        //noMorePosts é removido assim que é populado com as infos da api, por isso é async
        await waitForElementToBeRemoved(noMorePosts);
        screen.debug();

        const search = screen.getByPlaceholderText(/type your search/i);
        expect(search).toBeInTheDocument();

        const images = screen.getAllByRole('img', {name: /title/i});
        expect(images).toHaveLength(2);

        const button = screen.getByRole('button',{name: /load more posts/i});
        expect(button).toBeInTheDocument();
    });

    it('should search for posts', async () => {
        render(<Home />);
        const noMorePosts = screen.getByText('Não existem posts =(');

        //noMorePosts é removido assim que é populado com as infos da api, por isso é async
        await waitForElementToBeRemoved(noMorePosts);

        //input sem nada digitado
        const search = screen.getByPlaceholderText(/type your search/i);
        expect(search).toBeInTheDocument();

        //deve aparecer 2 posts, o terceiro somente se apertasse 'load more posts'
        expect(screen.getByRole('heading', {name: 'title1'})).toBeInTheDocument();
        expect(screen.getByRole('heading', {name: 'title2'})).toBeInTheDocument();
        expect(screen.queryByRole('heading', {name: 'title3'})).not.toBeInTheDocument();

        //pesquisa por 'title1': somente o primeiro post deve aparecer
        userEvent.type(search, 'title1');
        expect(screen.getByRole('heading', {name: 'title1'})).toBeInTheDocument();
        expect(screen.queryByRole('heading', {name: 'title2'})).not.toBeInTheDocument();
        expect(screen.queryByRole('heading', {name: 'title3'})).not.toBeInTheDocument();

        //input limpo, deve voltar ao estado inicial (com os 2 primeiros posts)
        userEvent.clear(search);
        expect(screen.getByRole('heading', {name: 'title1'})).toBeInTheDocument();
        expect(screen.getByRole('heading', {name: 'title2'})).toBeInTheDocument();

        //pesquisa por texto que não exite nos posts
        userEvent.type(search, 'title1jandjsand');
        expect(screen.getByText('Não existem posts =(')).toBeInTheDocument();
    });

    it('should load more posts when button "load more posts" be clicked', async () => {
        render(<Home />);
        const noMorePosts = screen.getByText('Não existem posts =(');

        //noMorePosts é removido assim que é populado com as infos da api, por isso é async
        await waitForElementToBeRemoved(noMorePosts);

        //click para add more posts
        const button = screen.getByRole('button', {name:/load more posts/i});
        userEvent.click(button);

        //button deve estar disabled, pois não há mais posts para add
        expect(screen.getByRole('heading', {name: 'title3'})).toBeInTheDocument();
        expect(button).toBeDisabled();

    });

});

