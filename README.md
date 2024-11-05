# ProductCrudRR

## _A Full-Stack Application with Rails API and React Frontend_

ProductCrudRR is a study project to practice building a full-stack application using **Ruby on Rails** as the backend API and **React** for the frontend. The project provides a basic product management CRUD interface, with features to add, view, edit, and delete products. The theme of the application is based on a dark color scheme, using black and pink.

## Features

>- **Backend (Rails)**: Provides RESTful endpoints for product management (`index`, `show`, `create`, `update`, and `destroy`).
>- **Frontend (React)**: Interactive interface to manage products with a stylish, responsive layout.
>- **Styled Components**: The UI is themed with a pink and black color scheme.
>- **Modals**: Custom modal popups for editing and deleting products, enhancing user experience.

## Tech Stack

>- **Backend**: Ruby on Rails (API-only mode)
>- **Frontend**: React
>- **Database**: SQLite3 (development) or PostgreSQL (production)
>- **Styling**: CSS modules

## Prerequisites

Ensure you have the following installed:

>- **Ruby** (v3.0+)
>- **Rails** (v7+)
>- **Node.js** (v14+)
>- **npm** or **yarn**
>- **SQLite3** or **PostgreSQL** (for database)

## Installation Front

### 1. Clone the Repository

```sh
git clone git@github.com:felp1713/ProductCrudRReact.git
cd ProductCrudRR
```

### 2. Setup Backend (Rails API)

Navigate to the backend folder:

```sh
cd backend
```

Install Gems:

```sh
bundle install
```

Setup Database:

```sh
rails db:create
rails db:migrate
rails db:seed
```

Start the Rails Server:

```sh
rails s -p 3001
```

The backend will be running on `http://localhost:3001`.

### 3. Setup Frontend (React)

Navigate to the frontend folder:

```sh
cd ../frontend
```

Install Dependencies:

```sh
npm install
```

Configure CORS (Cross-Origin Resource Sharing):

Ensure that CORS is enabled on the Rails API by editing the `cors.rb` initializer in the backend:

```ruby
# backend/config/initializers/cors.rb

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:3000'
    resource '*', headers: :any, methods: %i[get post put patch delete options head]
  end
end
```

Start the React Development Server:

```sh
npm start
```

The frontend will be running on `http://localhost:3000` and will communicate with the backend API on `http://localhost:3001`.

## Usage

Once both the backend and frontend servers are running, open `http://localhost:3000` in your browser. You will be able to:

- View all products.
- Add a new product.
- Edit existing products using a modal form.
- Delete products with a confirmation modal.

## API Endpoints

- `GET /products` - List all products
- `POST /products` - Create a new product
- `GET /products/:id` - Show a single product
- `PATCH /products/:id` - Update a product
- `DELETE /products/:id` - Delete a product

## Development Notes

- **Rails Server**: Make sure the Rails server is running on port `3001` for the frontend to communicate with the API.
- **CORS Configuration**: CORS should be configured to allow requests from `http://localhost:3000`.