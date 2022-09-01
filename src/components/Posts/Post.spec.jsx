import { render, screen } from "@testing-library/react";
import { Posts } from ".";

//mock
const props = {
    posts: [
        {
            title: 'title 1',
            body: 'body 1',
            id: 1,
            cover: 'img/img1.png'
        },
        {
            title: 'title 2',
            body: 'body 2',
            id: 2,
            cover: 'img/img2.png'
        },
        {
            title: 'title 3',
            body: 'body 3',
            id: 3,
            cover: 'img/img3.png'
        }
    ]
}

describe('<Posts />', () => {
    it('should render all posts', () => {
        render(<Posts {...props} /> );
        expect(screen.getAllByRole('heading', {name: /title/i})).toHaveLength(3);
        expect(screen.getAllByRole('img', {name: /title/i})).toHaveLength(3);
        expect(screen.getByRole('img', {name: /title 3/i})).toHaveAttribute('src', 'img/img3.png');
        expect(screen.getAllByText(/body/i)).toHaveLength(3);
    })

    it('should match snapshot', () => {
        render(<Posts {...props} /> );
        const {container} = render(<Posts {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    })
})
  