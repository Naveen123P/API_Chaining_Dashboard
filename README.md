# API Chaining Dashboard

This project is a responsive web application that demonstrates the ability to handle API interactions, including both GET and POST requests. The application allows users to build a chain of API calls where the response from one API can be used as input for subsequent API calls.

## Setup Instructions

1. **Clone the repository**:
    ```sh
    git clone https://github.com/Naveen123P/API_Chaining_Dashboard.git
    cd API_Chaining_Dashboard
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Start the development server**:
    ```sh
    npm start
    ```

4. **Open the application**:
    Open your browser and navigate to `http://localhost:3000`.

## Brief Explanation of Approach

The application is built using React.js and styled with Tailwind CSS. The main components are:

- **App**: The main component that renders the `ApiChainBuilder` component.
- **ApiChainBuilder**: Manages the state of the API chain, handles adding new API calls, and executes the chain of API calls.
- **ApiCall**: Represents an individual API call in the chain, allowing the user to specify the request type, URL, and parameters.
- **ApiResponse**: Displays the response from each API call.

The `ApiChainBuilder` component maintains the state of the API chain and responses. It uses the `executeApiCall` function to handle both GET and POST requests, passing the response from one API call to the next as needed.

## Assumptions and Decisions Made

- **State Management**: React's `useState` and `useEffect` hooks are used for state management.
- **API Interaction**: Fetch API is used for making HTTP requests.
- **Chaining Logic**: The response from one API call can be used as input for the next API call by modifying the parameters based on the previous response.
- **Error Handling**: Basic error handling is implemented to display error messages in the UI.
- **Responsiveness**: Tailwind CSS is used to ensure the UI is responsive and visually appealing.

## List of Completed Features and Known Issues

### Completed Features

- **API Chaining**: Users can add multiple API calls and chain them together.
- **GET and POST Requests**: Both GET and POST requests are supported.
- **Response Display**: Responses from API calls are displayed in the UI.
- **Error Handling**: Basic error handling is implemented.
- **Responsive Design**: The UI is responsive and styled with Tailwind CSS.

### Known Issues

- **Error Handling**: More comprehensive error handling could be implemented.
- **Data Transformation**: Currently, only basic data transformation is supported. More complex transformations may require additional logic.
- **User Experience**: The user experience could be improved with additional features such as saving and loading API chains.

## Demo

A demo video of the application can be found [here](https://drive.google.com/file/d/1ZGovi3gp35Av0CJRoJbENb_62Szk_mP9/view?usp=drive_link).

