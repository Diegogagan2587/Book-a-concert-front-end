import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../redux/store';
import ItemDataPanel from './ItemDataPanel';
import { act } from 'react-dom/test-utils';

const props = {
  concert: {
    title: 'Luffy Party',
    organizer: 'Mugiwara',
    description: 'Incredible concert with Luffy to celebrate he is pirate king.',
    price: '100',
    date: '2022-12-31',
    city: 'Sky Island',
    organizer_name: 'Mugiwara',
  },
};

describe('ItemDataPanel Component', () => {
  it('renders without crashing', () => {
    // Arrange, Act and assert,test would fail if render throws an error
    render(
      <Provider store={store}>
        <Router>
          <ItemDataPanel concert={props.concert}/>
        </Router>
      </Provider>
    );
  });

  it('renders the concert title', () => {
    // Arrange
    render(
      <Provider store={store}>
        <Router>
          <ItemDataPanel concert={props.concert}/>
        </Router>
      </Provider>
    );
    // Act
    const title = screen.getByText('Luffy Party');
    // Assert
    expect(title).toBeInTheDocument();
  });

  it('renders the concert description', () => {
    // Arrange
    render(
      <Provider store={store}>
        <Router>
          <ItemDataPanel concert={props.concert}/>
        </Router>
      </Provider>
    );
    const description = 'Incredible concert with Luffy to celebrate he is pirate king.';
    // Act
    const descriptionElement = screen.getByText(description);
    // Assert
    expect(descriptionElement).toBeInTheDocument();
  });

  it('renders the concert organizer name', () => {
    // Arrange
    render(
      <Provider store={store}>
        <Router>
          <ItemDataPanel concert={props.concert}/>
        </Router>
      </Provider>
    );
    const organizer = 'Mugiwara';
    // Act
    const organizerElement = screen.getByText(organizer);
    // Assert
    expect(organizerElement).toBeInTheDocument();
  });

  it('renders the concert date', () => {
    // Arrange
    render(
      <Provider store={store}>
        <Router>
          <ItemDataPanel concert={props.concert}/>
        </Router>
      </Provider>
    );
    const date = '2022-12-31';
    // Act
    const dateElement = screen.getByText(date);
    // Assert
    expect(dateElement).toBeInTheDocument();
  });

  it('renders the concert city', () => {
    // Arrange
    render(
      <Provider store={store}>
        <Router>
          <ItemDataPanel concert={props.concert}/>
        </Router>
      </Provider>
    );
    const city = 'Sky Island';
    // Act
    const cityElement = screen.getByText(city);
    // Assert
    expect(cityElement).toBeInTheDocument();
  });

  it('renders the concert price', () => {
    // Arrange
    render(
      <Provider store={store}>
        <Router>
          <ItemDataPanel concert={props.concert}/>
        </Router>
      </Provider>
    );
    const price = '100';
    // Act
    const priceElement = screen.getByText(price);
    // Assert
    expect(priceElement).toBeInTheDocument();
  });

  it('redirects to \'reserve\'  when Reserve button is clicked', async () => {
    // Arrange
    render(
      <Provider store={store}>
        <Router>
          <ItemDataPanel concert={props.concert}/>
        </Router>
      </Provider>
    );
    // Act
    const reserveButton = screen.getByText('Reserve');
    act(()=>{ 
      /*act is used to wrap the click event because reserve button 
      fires event that update state, this is to ensure that we are testing the behavior
      the user would see in the browser
      */
      reserveButton.click();
    }) 
    // Assert
    expect(window.location.pathname).toBe('/reserve');
  });
});
